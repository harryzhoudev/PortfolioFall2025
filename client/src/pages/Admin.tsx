import { useForm, type SubmitHandler } from 'react-hook-form';
import AdminHomePgFrm from '../components/AdminHomePgFrm';
import AdminAbtPgFrm from '../components/AdminAbtPgFrm';
import AdminSrvcPgFrm from '../components/AdminSrvcPgFrm';
import AdminPrjPgFrm from '../components/AdminPrjPgFrm';
import AdminEduPgFrm from '../components/AdminEduPgFrm';
import AdminContactMsg from '../components/AdminContactMsg';

function Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  return (
    <div className='flex flex-col justify-center items-center h-full mt-5 gap-12 mb-20 font-dm'>
      <h1 className='text-[#71C9CE] text-4xl font-bold p-6 w-[calc(100%-5rem)] max-w-6xl'>
        Admin
      </h1>
      <h2 className='flex flex-col w-[calc(100%-5rem)] text-center px-6 max-w-6xl font-bold text-2xl'>
        Edit Home Page
      </h2>
      <AdminHomePgFrm />
      <h2 className='flex flex-col w-[calc(100%-5rem)] text-center px-6 max-w-6xl font-bold text-2xl'>
        Edit About Page
      </h2>
      <AdminAbtPgFrm />
      <h2 className='flex flex-col w-[calc(100%-5rem)] text-center px-6 max-w-6xl font-bold text-2xl'>
        Edit Service Page
      </h2>
      <AdminSrvcPgFrm />
      <h2 className='flex flex-col w-[calc(100%-5rem)] text-center px-6 max-w-6xl font-bold text-2xl'>
        Edit Project Page
      </h2>
      <AdminPrjPgFrm />
      <h2 className='flex flex-col w-[calc(100%-5rem)] text-center px-6 max-w-6xl font-bold text-2xl'>
        Edit Education Page
      </h2>
      <AdminEduPgFrm />
      <h2 className='flex flex-col w-[calc(100%-5rem)] text-center px-6 max-w-6xl font-bold text-2xl'>
        View Contact Messages
      </h2>
      <AdminContactMsg />
    </div>
  );
}

export default Admin;
