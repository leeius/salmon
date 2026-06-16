import type { ComponentPropsWithoutRef } from 'react';
import styles from './Card.module.css';

type CardProps = ComponentPropsWithoutRef<'article'>;

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <article className={`${styles.card} ${className}`} {...props}>
      {children}
    </article>
  );
}
