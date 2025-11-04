interface Project {
  id: number;
  name: string;
  description: string;
  projectScreenshots: { projectScreenshot: string }[];
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className='relative p-6 rounded-lg shadow-md w-[calc(100%-5rem)] max-w-6xl bg-gray-50 hover:shadow-xl transition-shadow duration-300'>
      <h2
        className={`absolute -top-1/20 font-dm ${
          project.id % 2 === 0 ? 'left-1/20' : 'right-1/20'
        } bg-[#A6E3E9] w-fit px-4 py-2 rounded-lg text-2xl font-semibold mb-2 text-gray-600 shadow-md`}
      >
        {project.name}
      </h2>

      <div className='flex gap-2 mt-5'>
        {project.projectScreenshots.map((screenshot, index) => (
          <img
            key={index}
            src={screenshot.projectScreenshot}
            alt={`${project.name} screenshot ${index + 1}`}
            className='w-1/3 h-60 object-cover rounded-md'
          />
        ))}
      </div>
      <p className='text-gray-600 font-dm mt-5'>{project.description}</p>
    </div>
  );
}

export default ProjectCard;
