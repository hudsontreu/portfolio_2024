import { ProjectCard } from '../project-card';
import styles from './styles.module.css';
import { projects } from '../../work/projectData';

interface ProjectGridProps {
  filter: 'all' | 'project' | 'experiment';
}

export function ProjectGrid({ filter }: ProjectGridProps) {
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.group === filter);

  return (
    <div className={styles.grid}>
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          date={project.date}
          imageUrl={project.thumbnail}
          href={`/work/${project.id}`}
        />
      ))}
    </div>
  );
}
