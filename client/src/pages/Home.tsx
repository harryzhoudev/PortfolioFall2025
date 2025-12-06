import api from '../api/client';
import { useState, useEffect } from 'react';
import highlightLastTwoWords from '../utils/highlightLastTwoWords';
import highlightLastTwoWordsGradient from '../utils/highlightLastTwoWordsGradient';

function home() {
  const [homeContent, setHomeContent] = useState({
    greetingMessage: '',
    mainMessage: '',
    subMessage: '',
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const res = await api.get('/api/home');
        setHomeContent(res.data);
      } catch (err) {
        console.error('Error fetching home content:', err);
      }
    };

    fetchHomeContent();
  }, []);

  return (
    <div className='flex flex-col justify-center items-start h-[calc(100lvh-5rem)] px-20 gap-3 max-w-6xl mx-auto'>
      <p className='font-mono'>{homeContent.greetingMessage || 'Loading...'}</p>
      <p className='font-dm font-semibold text-4xl'>
        {highlightLastTwoWords(homeContent.mainMessage)}
      </p>
      <p className='font-dm text-lg'>
        {highlightLastTwoWordsGradient(homeContent.subMessage)}
      </p>
    </div>
  );
}

export default home;
