import { type FormEvent, useState } from 'react';
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiHeadphones,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUsers,
} from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import styles from './Contact.module.css';

const benefits = [
  { icon: <FiUsers />, title: 'Free Consultation', text: 'Talk to our experts, absolutely free.' },
  { icon: <FiShield />, title: 'No Obligation Quote', text: 'Transparent pricing, no hidden fees.' },
  { icon: <FiHeadphones />, title: 'Dedicated Project Manager', text: 'One point of contact from start to finish.' },
];

const contactLinks = [
  { icon: <FiMail />, text: 'hello@salmoninnovations.com' },
  { icon: <FiPhone />, text: '+63 000 000 0000' },
  { icon: <FiMapPin />, text: 'Philippines - Remote Worldwide' },
];

const trustItems = [
  { icon: <FiShield />, title: 'Your information is safe', text: 'We respect your privacy' },
  { icon: <FiClock />, title: 'Quick Response', text: 'Within 1 business day' },
  { icon: <FiCheckCircle />, title: 'No Spam Promise', text: 'Only relevant updates' },
];

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    setSubmitState('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || 'Please check the form and try again.');
      }

      form.reset();
      setSubmitState('success');
      setFeedback('Message sent. We saved your inquiry and will get back to you soon.');
    } catch (error) {
      setSubmitState('error');
      setFeedback(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const isSending = submitState === 'sending';

  return (
    <section className={styles.contact}>
      <Container>
        <div className={styles.panel}>
          <div className={styles.info}>
            <p className={styles.eyebrow}>Get in touch</p>
            <h2>
              Let's Build Something
              <strong>Great Together</strong>
            </h2>
            <p className={styles.lead}>
              Have an idea worth building? Share your vision with us and let's discuss how we can
              bring it to life.
            </p>
            <span className={styles.rule} />
            <div className={styles.benefits}>
              {benefits.map((item) => (
                <article key={item.title}>
                  <span>{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.links}>
              {contactLinks.map((item) => (
                <div key={item.text}>
                  <span>{item.icon}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className={styles.illustration} aria-hidden="true">
              <div className={styles.plane} />
              <div className={styles.path} />
              <div className={styles.laptop}>
                <div className={styles.screen}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.messageBubble}>...</div>
                <div className={styles.envelope}>
                  <FiMail />
                </div>
              </div>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <label>
                Full Name *
                <input name="name" placeholder="Enter your full name" required type="text" />
              </label>
              <label>
                Email Address *
                <input name="email" placeholder="Enter your email" required type="email" />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                Phone Number
                <input name="phone" placeholder="Enter your phone number" type="tel" />
              </label>
            </div>
            <label>
              Project Details *
              <textarea
                name="message"
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                required
                rows={5}
              />
            </label>
            <div className={styles.trust}>
              {trustItems.map((item) => (
                <div key={item.title}>
                  <span>{item.icon}</span>
                  <p>
                    <strong>{item.title}</strong>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            {feedback ? (
              <p className={`${styles.feedback} ${styles[submitState]}`} role="status">
                {feedback}
              </p>
            ) : null}
            <button disabled={isSending} type="submit">
              <FiBriefcase aria-hidden="true" />
              {isSending ? 'Sending...' : 'Send Message'}
              <FiArrowRight aria-hidden="true" />
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
