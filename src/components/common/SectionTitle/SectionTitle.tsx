import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
}

export function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div className={styles.sectionTitle}>
      {eyebrow && <p>{eyebrow}</p>}
      <h2>{title}</h2>
    </div>
  );
}
