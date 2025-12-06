// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/client';

type LoginProps = {
  onLogin: (token: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await api.post(
        '/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // getting token
      const token = res.data.token;
      if (!token) {
        throw new Error('No token received from server');
      }

      onLogin(token);
      navigate('/admin');
    } catch (err: any) {
      let message = 'Login failed';

      if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          message;
      }

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen -mt-4'>
      <div className='w-full max-w-md bg-white/80 shadow-xl rounded-xl p-8'>
        <h1 className='text-2xl font-bold mb-6 text-center text-slate-800'>
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              className='w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Password
            </label>
            <input
              type='password'
              className='w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#71C9CE]'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className='text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2'>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-2 rounded-lg text-white font-semibold bg-[#71C9CE] hover:bg-[#5bb2b7] disabled:opacity-70 disabled:cursor-not-allowed transition hover:cursor-pointer'
          >
            {isSubmitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
