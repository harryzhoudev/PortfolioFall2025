import ProjectCard from '../components/ProjectCard';

interface Project {
  id: number;
  name: string;
  description: string;
  projectScreenshots: { projectScreenshot: string }[];
}

function Project() {
  const projects: Project[] = [
    {
      id: 1,
      name: 'Pacted Workshop',
      description:
        'A Canadian E-commerce platform to sell custom 3D printed products.',
      projectScreenshots: [
        { projectScreenshot: '/p1screenshot1.jpg' },
        { projectScreenshot: '/p1screenshot2.jpg' },
        { projectScreenshot: '/p1screenshot3.jpg' },
      ],
    },
    {
      id: 2,
      name: 'Chattr',
      description:
        'Private group chats for friends and family. Communicate. Share. Bond.',
      projectScreenshots: [
        { projectScreenshot: '/p2screenshot1.jpg' },
        { projectScreenshot: '/p2screenshot2.jpg' },
        { projectScreenshot: '/p2screenshot3.jpg' },
      ],
    },
    {
      id: 3,
      name: 'Istaroth',
      description: 'Timeline diary web application to capture life moments.',
      projectScreenshots: [
        { projectScreenshot: '/p3screenshot1.jpg' },
        { projectScreenshot: '/p3screenshot2.jpg' },
        { projectScreenshot: '/p3screenshot3.jpg' },
      ],
    },
    {
      id: 4,
      name: 'AutoKaraoke',
      description:
        'Karaoke web application with automated lyrics generation using AI.',
      projectScreenshots: [
        { projectScreenshot: '/p4screenshot1.jpg' },
        { projectScreenshot: '/p4screenshot2.jpg' },
        { projectScreenshot: '/p4screenshot3.jpg' },
      ],
    },
  ];

  return (
    <div className='flex flex-col justify-center items-center h-full mt-5 gap-12 mb-20'>
      <h1 className='text-[#71C9CE] text-4xl font-bold font-dm p-6 w-[calc(100%-5rem)] max-w-6xl'>
        Projects
      </h1>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default Project;
