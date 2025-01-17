import { ProjectCard } from './project-card';

const projects = [
  {
    title: 'Generative Contemplation',
    date: 'Feb 2024',
    imageUrl: '/reflection.png',
    href: '/work/project1',
  },
  // Duplicate the same project 11 more times for the grid
  ...Array(11).fill({
    title: 'Generative Contemplation',
    date: 'Feb 2024',
    imageUrl: '/reflection.png',
    href: '/work/project1',
  }),
];

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
}
