import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { CheckCircle, XCircle, Lock, Eye, EyeOff } from 'lucide-react';

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
      alert("Passwords do not match");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'input' && mode === 'resetPassword') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        {status === 'success' ? (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        ) : (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {status === 'success' ? 'Success!' : 'Action Failed'}
        </h2>
        
        <p className="text-gray-600 mb-8">{message}</p>
        
        <Link 
          to="/login" 
          className="inline-block w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default AuthAction;
