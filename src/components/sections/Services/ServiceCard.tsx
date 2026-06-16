import { Card } from '../../common/Card/Card';
import type { ServiceCardProps } from './ServiceCard.types';
import styles from './Services.module.css';

export function ServiceCard({ icon, service }: ServiceCardProps) {
  return (
    <Card>
      <div className={styles.icon}>{icon}</div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className={styles.mark} />
    </Card>
  );
}
