import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword(email);
      toast.success('If an account exists, you will receive a reset link shortly.');
    } catch (err) {
      console.error("Reset Password Error:", err);
      if (err.code === 'auth/user-not-found') {
        toast.error('No account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        toast.error('Invalid email address format.');
      } else {
        toast.error('Failed to reset password. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-fade-in">
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl inline-block mb-6">
            <KeyRound className="mx-auto h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Reset Password</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 placeholder-gray-400 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>

          <div className="flex items-center justify-center">
            <Link to="/login" className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
