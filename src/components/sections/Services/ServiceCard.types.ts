import type { ReactNode } from 'react';
import type { Service } from '../../../types/service';

export interface ServiceCardProps {
  icon: ReactNode;
  service: Service;
}
