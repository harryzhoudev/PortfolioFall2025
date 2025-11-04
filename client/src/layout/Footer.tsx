import React from 'react';

function Footer() {
  return (
    <footer>
      <div className='flex justify-center h-20 bg-[#A6E3E9] items-center font-semibold text-gray-800'>
        Made by&nbsp;
        <span className='font-bold'>Harry Zhou&nbsp;</span>
        with&nbsp;
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='-11.5 -10.23174 23 20.46348'
          className='max-w-7'
        >
          <title>React</title>
          <circle cx='0' cy='0' r='2.05' fill='#153b4d' />
          <g stroke='#153b4d' strokeWidth='1' fill='none'>
            <ellipse rx='11' ry='4.2' />
            <ellipse rx='11' ry='4.2' transform='rotate(60)' />
            <ellipse rx='11' ry='4.2' transform='rotate(120)' />
          </g>
        </svg>
        &nbsp;+&nbsp;
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 54 33'
          className='max-w-8'
        >
          <title>TailwindCSS</title>
          <g clipPath='url(#prefix__clip0)'>
            <path
              fill='#153b4d'
              fillRule='evenodd'
              d='M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z'
              clipRule='evenodd'
            />
          </g>
          <defs>
            <clipPath id='prefix__clip0'>
              <path fill='#fff' d='M0 0h54v32.4H0z' />
            </clipPath>
          </defs>
        </svg>
        &nbsp;+&nbsp;
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 34 12'
          className='max-w-10'
        >
          <title>Framer Motion</title>
          <path
            d='M 12.838 0 L 6.12 11.989 L 0 11.989 L 5.245 2.628 C 6.059 1.176 8.088 0 9.778 0 Z M 27.846 2.997 C 27.846 1.342 29.216 0 30.906 0 C 32.596 0 33.966 1.342 33.966 2.997 C 33.966 4.653 32.596 5.995 30.906 5.995 C 29.216 5.995 27.846 4.653 27.846 2.997 Z M 13.985 0 L 20.105 0 L 13.387 11.989 L 7.267 11.989 Z M 21.214 0 L 27.334 0 L 22.088 9.362 C 21.275 10.813 19.246 11.989 17.556 11.989 L 14.496 11.989 Z'
            fill='#153b4d'
          ></path>
        </svg>
      </div>
    </footer>
  );
}

export default Footer;
