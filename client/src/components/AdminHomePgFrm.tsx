import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/client';
import { motion } from 'framer-motion';

interface HomeFormData {
  greeting: string;
  mainMessage: string;
  subtext: string;
}

interface HomeApiResponse {
  _id: string;
  greetingMessage: string;
  mainMessage: string;
  subMessage: string;
  createdAt: string;
  updatedAt: string;
}

function AdminHomePgFrm() {
  const { register, handleSubmit, reset } = useForm<HomeFormData>({
    defaultValues: {
      greeting: '',
      mainMessage: '',
      subtext: '',
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setIsLoading(true);

        const res = await api.get<HomeApiResponse>('/api/home');

        const home = res.data;

        reset({
          greeting: home.greetingMessage,
          mainMessage: home.mainMessage,
          subtext: home.subMessage,
        });
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.warn('No home content exists yet, starting fresh.');
        } else {
          console.error('Error fetching home content:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeContent();
  }, [reset]);

  const onSubmit: SubmitHandler<HomeFormData> = async (data) => {
    try {
      const payload = {
        greetingMessage: data.greeting,
        mainMessage: data.mainMessage,
        subMessage: data.subtext,
      };

      await api.put('/api/home', payload);

      setSubmitError(null);
      setSubmitSuccess('Home page updated successfully!');

      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      console.error('Error occurred while submitting: ', error);

      setSubmitSuccess(null);
      setSubmitError('Error saving changes. Please try again.');

      setTimeout(() => setSubmitError(null), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center py-10'>
        <p className='text-gray-600 font-dm'>Loading home content…</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-[#71C9CE] w-full p-[4rem] flex items-center gap-4 flex-col shadow-2xl'
    >
      <input
        {...register('greeting')}
        placeholder='Simple Greeting'
        className='w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
      />

      <textarea
        {...register('mainMessage')}
        placeholder='Main Message on Home Page'
        className='w-full min-h-50 max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
      />

      <textarea
        {...register('subtext')}
        placeholder='Sub-text below Main Message on Home Page'
        className='w-full min-h-50 max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
      />

      <motion.button
        type='submit'
        className='rounded-4xl text-gray-500 px-5 py-1 hover:bg-[hsl(183,49%,70%)] hover:text-[#E3FDFD] bg-[#A6E3E9] font-dm font-bold shadow-xs shadow-gray-400'
        whileHover={{ cursor: 'pointer', scale: 0.95 }}
        whileTap={{ scale: 0.85 }}
      >
        Submit
      </motion.button>

      {submitSuccess && (
        <p className='text-green-700 font-medium mt-2'>{submitSuccess}</p>
      )}
      {submitError && (
        <p className='text-red-700 font-medium mt-2'>{submitError}</p>
      )}
    </form>
  );
}

export default AdminHomePgFrm;
