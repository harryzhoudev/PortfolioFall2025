import React from 'react';

function Login() {
  // you can wire up real login later
  return (
    <div className='min-h-[50vh] flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl font-semibold'>Admin Login</h1>
      <p className='text-sm text-gray-500'>
        Please log in to access the admin dashboard.
      </p>
      {/* form goes here later */}
    </div>
  );
}

export default Login;
