import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function Contact() {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  return (
    <div className='flex flex-col justify-center items-center h-full mt-5 gap-12 mb-20 font-dm'>
      <h1 className='text-[#71C9CE] text-4xl font-bold p-6 w-[calc(100%-5rem)] max-w-6xl'>
        Contact
      </h1>
      <div className='flex flex-col w-[calc(100%-5rem)] text-center px-6 gap-4 max-w-6xl font-semibold'>
        <p>Like what you see and would like to work with me?</p>
        <p>Shoot me your name and message to get in touch with me</p>
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className='bg-[#71C9CE] p-4 rounded-lg w-[calc(100%-8rem)] max-w-2xl flex items-center gap-4 flex-col shadow-2xl'
      >
        <input
          {...register('name', { required: 'This is required' })}
          className='w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 outline-offset-0 py-2 px-4'
          placeholder='Name'
        />
        <p className='font-bold text-red-600'>{errors.name?.message}</p>
        <input
          {...register('email', {
            required: 'This is required',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Invalid Email',
            },
          })}
          className='  w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 outline-offset-0 py-2 px-4'
          placeholder='Email'
        />
        <p className='font-bold text-red-600'>{errors.email?.message}</p>
        <textarea
          {...register('message')}
          className='max-h-52 min-h-20 w-full max-w-2xl bg-white rounded-md border border-gray-400 outline-blue-400 outline-offset-0 py-2 px-4'
          placeholder='Message'
        />
        <motion.button
          type='submit'
          className='rounded-4xl text-gray-500 px-5 py-1 hover:bg-[hsl(183,49%,70%)] hover:text-[#E3FDFD] bg-[#A6E3E9] font-dm font-bold shadow-xs shadow-gray-400'
          whileHover={{
            cursor: 'pointer',
            scale: 0.95,
          }}
          whileTap={{ scale: 0.85 }}
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
}

export default Contact;
