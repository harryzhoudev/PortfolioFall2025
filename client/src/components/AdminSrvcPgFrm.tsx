import { useEffect, useState, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import api from '../api/client';
import { motion } from 'framer-motion';

interface CloudinaryAssetResponse {
  publicId: string;
  url: string;
}

interface ServiceSectionApiResponse {
  id: number;
  title: string;
  description: string;
  // Assuming you store background images in Cloudinary like About page
  bgImg?: CloudinaryAssetResponse | null;
}

type ServiceApiResponse = ServiceSectionApiResponse[];

type ServiceFormData = {
  section0Title: string;
  section0Description: string;

  section1Title: string;
  section1Description: string;

  section2Title: string;
  section2Description: string;
};

function AdminSrvcPgFrm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ServiceFormData>({
    defaultValues: {
      section0Title: '',
      section0Description: '',

      section1Title: '',
      section1Description: '',

      section2Title: '',
      section2Description: '',
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Background image URLs for preview (from Cloudinary / DB)
  const [bg0Url, setBg0Url] = useState<string | null>(null);
  const [bg1Url, setBg1Url] = useState<string | null>(null);
  const [bg2Url, setBg2Url] = useState<string | null>(null);

  // Fetch existing service sections (headings + descriptions + bg urls)
  useEffect(() => {
    const fetchServiceContent = async () => {
      try {
        setIsLoading(true);
        setSubmitError(null);

        // ⬇️ Adjust URL if your backend route is different
        const res = await api.get<ServiceApiResponse>('/api/service');

        const sections = res.data ?? [];

        const s0 = sections[0] ?? {
          id: 0,
          title: '',
          description: '',
          bgImg: null,
        };
        const s1 = sections[1] ?? {
          id: 1,
          title: '',
          description: '',
          bgImg: null,
        };
        const s2 = sections[2] ?? {
          id: 2,
          title: '',
          description: '',
          bgImg: null,
        };

        // Populate text fields
        reset({
          section0Title: s0.title,
          section0Description: s0.description,
          section1Title: s1.title,
          section1Description: s1.description,
          section2Title: s2.title,
          section2Description: s2.description,
        });

        // Store current background image URLs for preview
        setBg0Url(s0.bgImg?.url ?? null);
        setBg1Url(s1.bgImg?.url ?? null);
        setBg2Url(s2.bgImg?.url ?? null);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.warn(
            'No service content exists yet, starting with empty fields.'
          );
        } else {
          console.error('Error fetching service content:', error);
          setSubmitError('Error loading service content.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceContent();
  }, [reset]);

  // Save headings + descriptions
  const onSubmit: SubmitHandler<ServiceFormData> = async (data) => {
    try {
      setSubmitError(null);

      // Only sending text fields; bg images handled by separate upload endpoints
      const payload = [
        {
          id: 0,
          title: data.section0Title,
          description: data.section0Description,
        },
        {
          id: 1,
          title: data.section1Title,
          description: data.section1Description,
        },
        {
          id: 2,
          title: data.section2Title,
          description: data.section2Description,
        },
      ];

      // ⬇️ Adjust URL & body shape to match your backend
      await api.put('/api/service', payload);

      setSubmitSuccess('Service page text updated successfully!');
      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving service text:', error);
      setSubmitSuccess(null);
      setSubmitError('Error saving changes. Please try again.');
      setTimeout(() => setSubmitError(null), 5000);
    }
  };

  // Generic handler for background image uploads for any section
  const handleBgUpload = async (
    sectionId: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    // Field name must match multer config in your backend, e.g. upload.single("file")
    formData.append('file', file);

    try {
      // Example endpoint: PUT /api/service/:id/background
      const res = await api.put<ServiceSectionApiResponse>(
        `/api/service/${sectionId}/background`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedSection = res.data;

      // Update the right preview URL
      if (sectionId === 0) {
        setBg0Url(updatedSection.bgImg?.url ?? null);
      } else if (sectionId === 1) {
        setBg1Url(updatedSection.bgImg?.url ?? null);
      } else if (sectionId === 2) {
        setBg2Url(updatedSection.bgImg?.url ?? null);
      }

      setSubmitError(null);
      setSubmitSuccess('Background image uploaded successfully!');
      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error) {
      console.error('Error uploading background image:', error);
      setSubmitSuccess(null);
      setSubmitError('Error uploading image. Please try again.');
      setTimeout(() => setSubmitError(null), 5000);
    } finally {
      // Clear file input so the same file can be re-selected if needed
      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center py-10'>
        <p className='text-gray-600 font-dm'>Loading service content…</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-[#71C9CE] w-full p-[4rem] flex items-center gap-4 flex-col shadow-2xl'
    >
      {/* Section 1 */}
      <div className='w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'>
        <h3 className='font-dm font-semibold text-lg mb-3'>Section 1</h3>

        {/* Background upload */}
        <label className='block mb-2 font-dm text-sm font-medium text-gray-700'>
          Background Image
          <input
            type='file'
            accept='image/*'
            className='mt-1 block w-full text-sm text-gray-700
                       file:mr-3 file:py-1 file:px-3
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-[#71C9CE] file:text-white
                       hover:file:bg-[#45b6bc]'
            onChange={(e) => handleBgUpload(0, e)}
          />
        </label>

        {bg0Url && (
          <div className='mt-2'>
            <p className='text-xs text-gray-500 mb-1'>Current image:</p>
            <img
              src={bg0Url}
              alt='Section 1 background'
              className='h-24 w-full object-cover rounded-md border border-gray-200'
            />
          </div>
        )}

        <label className='block mt-4 mb-2 font-dm text-sm font-medium text-gray-700'>
          Heading
          <input
            {...register('section0Title')}
            type='text'
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
            placeholder='Full-Stack Web Development'
          />
        </label>

        <label className='block mb-2 font-dm text-sm font-medium text-gray-700'>
          Description
          <textarea
            {...register('section0Description')}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px] max-h-40 resize-y focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
            placeholder='Describe the web development services you provide...'
          />
        </label>
      </div>

      {/* Section 2 */}
      <div className='w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'>
        <h3 className='font-dm font-semibold text-lg mb-3'>Section 2</h3>

        {/* Background upload */}
        <label className='block mb-2 font-dm text-sm font-medium text-gray-700'>
          Background Image
          <input
            type='file'
            accept='image/*'
            className='mt-1 block w-full text-sm text-gray-700
                       file:mr-3 file:py-1 file:px-3
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-[#71C9CE] file:text-white
                       hover:file:bg-[#45b6bc]'
            onChange={(e) => handleBgUpload(1, e)}
          />
        </label>

        {bg1Url && (
          <div className='mt-2'>
            <p className='text-xs text-gray-500 mb-1'>Current image:</p>
            <img
              src={bg1Url}
              alt='Section 2 background'
              className='h-24 w-full object-cover rounded-md border border-gray-200'
            />
          </div>
        )}

        <label className='block mt-4 mb-2 font-dm text-sm font-medium text-gray-700'>
          Heading
          <input
            {...register('section1Title')}
            type='text'
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
            placeholder='Mobile Applications'
          />
        </label>

        <label className='block mb-2 font-dm text-sm font-medium text-gray-700'>
          Description
          <textarea
            {...register('section1Description')}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px] max-h-40 resize-y focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
            placeholder='Describe the mobile app services you provide...'
          />
        </label>
      </div>

      {/* Section 3 */}
      <div className='w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 py-2 px-4'>
        <h3 className='font-dm font-semibold text-lg mb-3'>Section 3</h3>

        {/* Background upload */}
        <label className='block mb-2 font-dm text-sm font-medium text-gray-700'>
          Background Image
          <input
            type='file'
            accept='image/*'
            className='mt-1 block w-full text-sm text-gray-700
                       file:mr-3 file:py-1 file:px-3
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-[#71C9CE] file:text-white
                       hover:file:bg-[#45b6bc]'
            onChange={(e) => handleBgUpload(2, e)}
          />
        </label>

        {bg2Url && (
          <div className='mt-2'>
            <p className='text-xs text-gray-500 mb-1'>Current image:</p>
            <img
              src={bg2Url}
              alt='Section 3 background'
              className='h-24 w-full object-cover rounded-md border border-gray-200'
            />
          </div>
        )}

        <label className='block mt-4 mb-2 font-dm text-sm font-medium text-gray-700'>
          Heading
          <input
            {...register('section2Title')}
            type='text'
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
            placeholder='Photography and Videography'
          />
        </label>

        <label className='block mb-2 font-dm text-sm font-medium text-gray-700'>
          Description
          <textarea
            {...register('section2Description')}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px] max-h-40 resize-y focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
            placeholder='Describe your photo & video services...'
          />
        </label>
      </div>

      <motion.button
        type='submit'
        disabled={isSubmitting}
        className='self-start mt-2 rounded-4xl bg-[#71C9CE] px-6 py-2 font-dm font-semibold text-white shadow-md hover:bg-[#45b6bc] disabled:opacity-70 disabled:cursor-not-allowed'
        whileHover={isSubmitting ? {} : { scale: 0.97 }}
        whileTap={isSubmitting ? {} : { scale: 0.9 }}
      >
        {isSubmitting ? 'Saving…' : 'Save Changes'}
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

export default AdminSrvcPgFrm;
