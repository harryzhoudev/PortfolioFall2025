import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faServer,
  faDatabase,
  faNetworkWired,
  faProjectDiagram,
  faPalette,
  faMobileAlt,
  faObjectGroup,
  faLayerGroup,
  faBoxOpen,
  faAdjust,
  faVideo,
  faFilm,
  faTint,
  faClapperboard,
  faCameraRetro,
  faPaperPlane,
  faUser,
  faMountain,
  faCamera,
  faCoffee,
  faFire,
  faImage,
  faWandMagicSparkles,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faNodeJs,
  faGitAlt,
  faBootstrap,
  faAndroid,
} from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  icon: any;
  color?: string;
}

interface SkillCategory {
  id: number;
  category: string;
  color: string;
  skills: Skill[];
}

function Education() {
  const educationSkills: SkillCategory[] = [
    {
      id: 1,
      category: 'Web Development',
      color: 'hsl(187, 80%, 40%)',
      skills: [
        { name: 'HTML5', icon: faHtml5 },
        { name: 'CSS3', icon: faCss3Alt },
        { name: 'JavaScript ES6+', icon: faJs },
        { name: 'TypeScript', icon: faCode },
        { name: 'React.js', icon: faReact },
        { name: 'Next.js', icon: faLayerGroup },
        { name: 'Node.js', icon: faNodeJs },
        { name: 'Express.js', icon: faServer },
        { name: 'MongoDB', icon: faDatabase },
        { name: 'RESTful APIs', icon: faNetworkWired },
        { name: 'GraphQL', icon: faProjectDiagram },
        { name: 'Git & GitHub', icon: faGitAlt },
        { name: 'Tailwind CSS', icon: faPalette },
        { name: 'Bootstrap', icon: faBootstrap },
        { name: 'Responsive Design', icon: faMobileAlt },
        { name: 'UI/UX Design Principles', icon: faObjectGroup },
      ],
    },
    {
      id: 2,
      category: 'Mobile Development',
      color: 'hsl(28, 96%, 57%)',
      skills: [
        { name: 'Android Studio', icon: faAndroid },
        { name: 'Kotlin', icon: faCode },
        { name: 'Java', icon: faCoffee },
        { name: 'React Native', icon: faReact },
        { name: 'Firebase', icon: faFire },
        { name: 'REST APIs', icon: faNetworkWired },
        { name: 'UI/UX for Mobile', icon: faPalette },
      ],
    },
    {
      id: 3,
      category: 'Photography',
      color: 'hsl(48, 97%, 54%)',
      skills: [
        { name: 'Portrait Photography', icon: faUser },
        { name: 'Landscape Photography', icon: faMountain },
        { name: 'Event Photography', icon: faCamera },
        { name: 'Product Photography', icon: faBoxOpen },
        { name: 'Adobe Lightroom', icon: faImage },
        { name: 'Adobe Photoshop', icon: faWandMagicSparkles },
        { name: 'Color Grading', icon: faAdjust },
      ],
    },
    {
      id: 4,
      category: 'Videography',
      color: 'hsl(234, 87%, 57%)',
      skills: [
        { name: 'Cinematography', icon: faVideo },
        { name: 'Video Editing', icon: faFilm },
        { name: 'Color Correction', icon: faTint },
        { name: 'Adobe Premiere Pro', icon: faVideo },
        { name: 'DaVinci Resolve', icon: faClapperboard },
        { name: 'Camera Operation', icon: faCameraRetro },
        { name: 'Drone Operation', icon: faPaperPlane },
      ],
    },
    {
      id: 5,
      category: 'Education',
      color: 'hsl(0, 77%, 61%)',
      skills: [
        { name: 'Centennial College', icon: faSchool },
        { name: 'Seneca College', icon: faSchool },
        { name: 'University of Toronto', icon: faSchool },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const allSkills: Skill[] = educationSkills.flatMap((category) =>
    category.skills.map((skill) => ({ ...skill, color: category.color }))
  );

  const activeSkills: Skill[] = (() => {
    if (activeCategory === null) {
      return allSkills;
    }
    const selectedCategory = educationSkills.find(
      (category) => category.id === activeCategory
    );
    if (!selectedCategory) return [];
    return selectedCategory.skills.map((skill) => ({
      ...skill,
      color: selectedCategory.color,
    }));
  })();

  return (
    <div className='flex flex-col justify-center items-center h-full mt-5 gap-12 mb-20'>
      <h1 className='text-[#71C9CE] text-4xl font-bold font-dm p-6 w-[calc(100%-5rem)] max-w-6xl'>
        Education and Skills
      </h1>

      {/* Category Buttons */}
      <div className='flex flex-wrap gap-3 justify-center items-center flex-col md:flex-row w-[calc(100%-5rem)] max-w-6xl'>
        {educationSkills.map((cat) => {
          const isActive = activeCategory === cat.id;
          const [h, s, l] = cat.color.match(/\d+/g)!.map(Number);

          const activeColor = `hsl(${h}, ${s}%, ${l + 5}%)`;
          const inactiveColor = `hsl(${h}, ${s}%, ${l + 25}%)`;

          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
              whileHover={{
                scale: 1.05,
                backgroundColor: cat.color,
                color: 'hsl(0, 0%, 100%)',
                cursor: 'pointer',
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: isActive ? activeColor : inactiveColor,
                color: isActive ? 'hsl(0, 0%, 100%)' : `hsl(${h}, 40%, 60%)`,
                boxShadow: isActive
                  ? `0px 0px 15px 0px hsl(${h}, ${s}%, ${l - 5}%)`
                  : 'none',
              }}
              transition={{ duration: 0.3 }}
              className='px-5 py-2 rounded-full text-md font-bold font-dm shadow-sm'
            >
              {cat.category}
            </motion.button>
          );
        })}

        {/* All Button */}
        <motion.button
          onClick={() => setActiveCategory(null)}
          whileHover={{
            backgroundColor: 'hsl(250, 60%, 58%)',
            color: 'hsl(0, 0%, 100%)',
            cursor: 'pointer',
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundColor:
              activeCategory === null
                ? 'hsl(250, 60%, 63%)'
                : 'hsl(250, 60%, 83%)',
            color:
              activeCategory === null
                ? 'hsl(0, 0%, 100%)'
                : 'hsl(250, 40%, 60%)',
            boxShadow:
              activeCategory === null
                ? '0px 0px 15px 0px hsl(250, 60%, 53%)'
                : 'none',
          }}
          transition={{ duration: 0.3 }}
          className='px-5 py-2 rounded-full text-md font-bold font-dm shadow-sm'
        >
          All
        </motion.button>
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className='flex flex-wrap gap-5 justify-center items-center max-w-6xl px-6 transition-all duration-700'
      >
        <AnimatePresence mode='sync'>
          {activeSkills.map((skill) => {
            const [h, s, l] = (skill.color || 'hsl(0, 0%, 0%)')
              .match(/\d+/g)!
              .map(Number);

            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  layout: { duration: 0.5, ease: 'easeInOut' },
                  opacity: { duration: 0.3 },
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0px 0px 12px 0px hsl(${h}, ${s}%, ${l + 20}%)`,
                }}
                className='flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm font-medium text-gray-800'
              >
                <FontAwesomeIcon
                  icon={skill.icon}
                  className='text-lg'
                  style={{ color: skill.color }}
                />
                {skill.name}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Education;
