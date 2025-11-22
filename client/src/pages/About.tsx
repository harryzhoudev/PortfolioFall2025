import { useEffect, useState } from 'react';
import axios from 'axios';

interface CloudinaryAsset {
  publicId: string;
  url: string;
  downloadUrl?: string;
}

interface AboutApiResponse {
  _id: string;
  title: string;
  description: string;
  resume?: CloudinaryAsset | null;
  profilePic?: CloudinaryAsset | null;
  createdAt: string;
  updatedAt: string;
}

function About() {
  const [about, setAbout] = useState<AboutApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axios.get<AboutApiResponse>(
          'http://localhost:5001/api/about'
        );
        setAbout(res.data);
      } catch (err: any) {
        console.error('Error fetching about content:', err);
        setError('Unable to load about content right now.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleResumeClick = () => {
    if (!about?.resume?.url) return;

    window.open(about.resume.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-5rem)]'>
        <p className='text-gray-600 font-dm'>Loading about content…</p>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className='flex flex-col justify-center items-center p-20 gap-4 max-w-6xl mx-auto min-h-[calc(100vh-5rem)]'>
        <h1 className='font-bold font-dm text-4xl text-[#71C9CE]'>WHO I AM</h1>
        <p className='text-gray-500 font-dm'>
          {error ?? 'No bio available yet.'}
        </p>
      </div>
    );
  }

  const resumeHref = about.resume?.downloadUrl ?? about.resume?.url ?? null;
  const profilePicUrl = about.profilePic?.url ?? null;

  return (
    <div className='flex flex-col justify-center items-center p-20 gap-8 max-w-6xl mx-auto min-h-[calc(100vh-5rem)]'>
      <div className='flex gap-8 md:flex-row flex-col justify-center items-center'>
        <div className='flex md:flex-1 flex-col gap-4 order-1 md:order-2'>
          <h1 className='font-bold font-dm text-4xl text-[#71C9CE]'>
            {about.title}
          </h1>
          <p className='text-justify font-dm font-semibold text-gray-500 whitespace-pre-line'>
            {about.description}
          </p>
        </div>

        <div className='border-[#A6E3E9] border-8 overflow-hidden rounded-full max-w-64 max-h-64 order-2 md:order-1 shadow-md shadow-gray-400'>
          {profilePicUrl ? (
            <img
              className='w-full h-full object-cover'
              src={profilePicUrl}
              alt='profile picture'
            />
          ) : (
            <img
              className='w-full h-full object-cover'
              src='../src/assets/selfie.jpg'
              alt='profile picture'
            />
          )}
        </div>
      </div>

      {resumeHref ? (
        <a
          href={resumeHref}
          target='_blank'
          rel='noopener noreferrer'
          download='HarryZhouResume.pdf'
          className='border-3 border-[#A6E3E9] rounded-4xl text-gray-500 px-5 py-1 hover:bg-[#71C9CE] hover:border-[#71C9CE] hover:text-[#E3FDFD] bg-[#A6E3E9] transition-all duration-300 font-dm font-bold hover:cursor-pointer shadow-xs shadow-gray-300 inline-block text-center'
        >
          My Resume
        </a>
      ) : (
        <button
          disabled
          className='border-3 border-[#A6E3E9] rounded-4xl px-5 py-1 bg-[#A6E3E9] text-gray-400 cursor-not-allowed opacity-70 font-dm font-bold shadow-xs shadow-gray-300'
        >
          Resume not available
        </button>
      )}
    </div>
  );
}

export default About;
