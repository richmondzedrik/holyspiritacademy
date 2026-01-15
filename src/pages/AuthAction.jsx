import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase/config';
import { CheckCircle, XCircle, Lock, Eye, EyeOff, ShieldCheck, Mail, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthAction = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode'); // verifyEmail, resetPassword, recoverEmail
  const actionCode = searchParams.get('oobCode');

  // State
  const [status, setStatus] = useState('loading'); // loading, success, error, input (for password reset)
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!actionCode) {
      setStatus('error');
      setMessage('Invalid link. No action code found.');
      return;
    }

    const handleAction = async () => {
      try {
        if (mode === 'verifyEmail') {
          await applyActionCode(auth, actionCode);
          setStatus('success');
          setMessage('Your email has been verified successfully. You can now access all features.');
        } else if (mode === 'resetPassword') {
          // Verify the code first to ensure it's valid
          const email = await verifyPasswordResetCode(auth, actionCode);
          setStatus('input'); // Show password input form
          setMessage(`Resetting password for ${email}`);
        } else {
          setStatus('error');
          setMessage('Invalid mode.');
        }
      } catch (error) {
        console.error(error);
        setStatus('error');
        setMessage(error.message);
      }
    };

    handleAction();
  }, [mode, actionCode]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setStatus('loading');
      await confirmPasswordReset(auth, actionCode, newPassword);
      setStatus('success');
      setMessage('Your password has been reset successfully. You can now login with your new password.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (status === 'input' && mode === 'resetPassword') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-fade-in">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl inline-block mb-6">
              <Lock className="mx-auto h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Set New Password</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </div>

          <form onSubmit={handlePasswordReset} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-xl relative block w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 placeholder-gray-400 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-xl relative block w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 placeholder-gray-400 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 animate-fade-in">
        <div className="inline-block mb-4">
          {status === 'success' ? (
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl shadow-lg">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
              <ShieldAlert className="h-12 w-12 text-white" />
            </div>
          )}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          {status === 'success' ? 'Success!' : 'Action Failed'}
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {message}
        </p>

        <Link
          to="/login"
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default AuthAction;
