import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-regular-svg-icons';
import {
  faCode,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';

function Service() {
  const [active, setActive] = useState<number | null>(null);

  const serviceSections = [
    {
      id: 0,
      color: 'bg-[#CBF1F5]',
      title: 'Full-Stack Web Development',
      description:
        'I build dynamic, scalable web applications using the MERN stack (MongoDB, Express.js, React, Node.js). From concept to deployment, I create responsive, user-friendly solutions tailored to your needs.',
      icon: faCode,
      bgImg: '/webdevphoto.jpg',
    },
    {
      id: 1,
      color: 'bg-[#CBF1F5]',
      title: 'Mobile Applications',
      description:
        'I develop sleek, high-performance Android applications that provide seamless user experiences. Whether it’s a simple utility or a full-featured app, I turn your ideas into functional, polished mobile solutions.',
      icon: faMobileScreenButton,
      bgImg: '/mobiledevphoto.jpg',
    },
    {
      id: 2,
      color: 'bg-[#CBF1F5]',
      title: 'Photography and Videography',
      description:
        'I capture moments with creativity and precision, offering professional photography and videography services. From events to personal projects, I deliver stunning visuals that tell your story.',
      icon: faCamera,
      bgImg: '/photovideophoto.jpg',
    },
  ];

  const handleClick = (index: number) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className='flex w-full flex-col 2xl:flex-row overflow-clip min-h-[calc(100vh-5rem)]'>
      {serviceSections.map((sec) => (
        <div
          key={sec.id}
          onClick={() => handleClick(sec.id)}
          // tailwind does not do dynamic css injection for images, that's why it had to be rendered using in-line styles
          style={{
            backgroundImage: `url(${sec.bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className={`
            transition-all duration-500
            cursor-pointer
            flex items-center justify-center
            text-white font-bold text-xl
            relative
            ${sec.color}
            flex-1
            ${active === sec.id ? 'flex-5' : 'flex-1'}
          `}
        >
          {/* blur and darken for both active and non-active state */}
          <div
            className={`transition-all duration-500 absolute inset-0 backdrop-blur-sm  ${
              active === sec.id ? 'bg-black/60' : 'bg-black/20'
            } `}
          ></div>
          {/* Icon */}
          <span
            style={{ fontSize: 'clamp(50px, 10vw, 100px)' }}
            className={`transition-opacity duration-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              active === sec.id ? 'opacity-15' : 'opacity-100'
            }`}
          >
            <FontAwesomeIcon icon={sec.icon} />
          </span>

          {/* Text only shows when active */}
          <div
            className={`absolute top-1/2 left-1/2 transition-opacity duration-500 text-center px-[8vw] max-w-5xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full ${
              active === sec.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2
              style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
              className='font-dm text-[#66b4b9] text-left '
            >
              {sec.title}
            </h2>
            <p
              style={{ fontSize: 'clamp(16px, 1.5vw, 28px)' }}
              className='font-dm text-left  text-[#E3FDFD] mt-3 '
            >
              {sec.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Service;
