import { FiEye } from 'react-icons/fi';
import { Card } from '../../common/Card/Card';
import type { Project } from '../../../types/project';
import styles from './Projects.module.css';

interface ProjectCardProps {
  ariaHidden?: boolean;
  project: Project;
}

export function ProjectCard({ ariaHidden = false, project }: ProjectCardProps) {
  return (
    <Card aria-hidden={ariaHidden}>
      <div className={styles.preview} data-project={project.title}>
        <img src={project.image} alt={`${project.title} preview`} />
      </div>
      <div className={styles.projectMeta}>
        <h3>{project.title}</h3>
        <a href={project.url} rel="noreferrer" target="_blank">
          Live Preview
          <FiEye aria-hidden="true" />
        </a>
      </div>
    </Card>
  );
}
