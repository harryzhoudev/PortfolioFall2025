import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect, useState, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../api/client';

interface AboutFormData {
  title: string;
  description: string;
  resume?: string | null;
  profilePic?: string | null;
}

interface CloudinaryAssetResponse {
  publicId: string;
  url: string;
}

interface AboutApiResponse {
  _id: string;
  title: string;
  description: string;
  resume?: CloudinaryAssetResponse | null;
  profilePic?: CloudinaryAssetResponse | null;
  createdAt: string;
  updatedAt: string;
}

function AdminAbtPgFrm() {
  const { register, handleSubmit, reset } = useForm<AboutFormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setIsLoading(true);

        const res = await api.get<AboutApiResponse>('/api/about');

        const about = res.data;
        // Set existing data into text fields in the form
        reset({
          title: about.title,
          description: about.description,
        });
        // Save current asset URLs if any
        setResumeUrl(about.resume?.url ?? null);
        setProfilePicUrl(about.profilePic?.url ?? null);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.warn('No about content exists yet, starting fresh.');
        } else {
          console.error('Error fetching about content:', error);
          setSubmitError('Error loading about content.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutContent();
  }, [reset]);

  const onSubmit: SubmitHandler<AboutFormData> = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
      };

      await api.put('/api/about', payload);

      setSubmitError(null);
      setSubmitSuccess('About page updated successfully!');

      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      console.error('Error occurred while submitting: ', error);

      setSubmitSuccess(null);
      setSubmitError('Error saving changes. Please try again.');

      setTimeout(() => setSubmitError(null), 5000);
    }
  };

  // Handles resume upload (PUT /api/about/resume)
  const handleResumeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    // Field name must match multer: upload.single("file")
    formData.append('file', file);

    try {
      const res = await api.put('/api/about/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updated = res.data.about as AboutApiResponse;

      setResumeUrl(updated.resume?.url ?? null);
      setSubmitError(null);
      setSubmitSuccess('Resume uploaded successfully!');

      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      console.error('Error uploading resume:', error);
      setSubmitSuccess(null);
      setSubmitError('Error uploading resume. Please try again.');
      setTimeout(() => setSubmitError(null), 5000);
    } finally {
      // Optional: clear the file input
      e.target.value = '';
    }
  };

  // Handles profile picture upload (PUT /api/about/profile-pic)
  const handleProfilePicUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.put('/api/about/profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updated = res.data.about as AboutApiResponse;

      setProfilePicUrl(updated.profilePic?.url ?? null);
      setSubmitError(null);
      setSubmitSuccess('Profile picture uploaded successfully!');

      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setSubmitSuccess(null);
      setSubmitError('Error uploading profile picture. Please try again.');
      setTimeout(() => setSubmitError(null), 5000);
    } finally {
      // Clear the file input
      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center py-10'>
        <p className='text-gray-600 font-dm'>Loading about content…</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-[#71C9CE] w-full p-16 flex items-center gap-4 flex-col shadow-2xl'
    >
      <input
        {...register('title')}
        placeholder='Title for about page'
        className='w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
      />

      <textarea
        {...register('description')}
        placeholder='Short bio or description for about page'
        className='w-full min-h-50 max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
      />

      {/* Resume upload */}
      <div className='w-full max-w-2xl flex flex-col gap-2'>
        <label className='font-black'>Upload Resume:</label>
        <input
          type='file'
          accept='.pdf,.doc,.docx'
          onChange={handleResumeUpload}
          className='bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
        />
        {resumeUrl && (
          <a
            href={resumeUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-800 underline text-sm'
          >
            View current resume
          </a>
        )}
      </div>

      {/* Profile picture upload */}
      <div className='w-full max-w-2xl flex flex-col gap-2'>
        <label className='font-black'>Upload Profile Picture:</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleProfilePicUpload}
          className='bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'
        />
        {profilePicUrl && (
          <img
            src={profilePicUrl}
            alt='Current profile'
            className='mt-2 h-24 w-24 rounded-full object-cover border border-gray-300'
          />
        )}
      </div>

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

export default AdminAbtPgFrm;
