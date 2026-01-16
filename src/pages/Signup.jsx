import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import hsabImage from '../assets/hsab.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);

      // 1. Create user in Firebase Auth
      const user = await signup(formData.email, formData.password);

      // 2. Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        role: 'user', // Default role
        createdAt: new Date().toISOString(),
        isVerified: false
      });

      toast.success('Account created! Please check your email to verify your account.');
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please login or use a different email.');
      } else {
        toast.error('Failed to create an account. ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign Up - Holy Spirit Academy of Bangued"
        description="Create your account to join the Holy Spirit Academy of Bangued community."
      />
      <div className="min-h-screen flex bg-white dark:bg-slate-900">
        {/* Left Side - Image & Branding (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-900">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url(${hsabImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-800/50 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />

          <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <span className="font-medium text-blue-100 group-hover:text-white transition-colors">Back to Home</span>
            </Link>

            <div className="space-y-8 max-w-xl">
              <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
                Join our growing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Community</span>
              </h2>
              <p className="text-xl text-blue-100/80 leading-relaxed font-light">
                Create an account to begin your journey with Holy Spirit Academy of Bangued. Experience excellence in education.
              </p>
            </div>

            {/* Motto Card */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all cursor-default transform hover:-translate-y-1">
              <div className="flex items-center gap-5">
                <div className="h-12 w-1.5 bg-gradient-to-b from-blue-400 to-blue-200 rounded-full"></div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-200 mb-1 font-semibold">Our Motto</p>
                  <p className="text-3xl font-serif italic text-white">"Truth in Love"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative">

          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-gray-500 mb-8 hover:text-blue-600 transition-colors">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
              <div className="inline-block p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6 lg:mb-8">
                <UserPlus size={32} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Enter your details below to get started.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                    <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    name="fullName"
                    type="text"
                    required
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="block w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="block w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>

              <div className="text-center mt-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="absolute bottom-6 text-center w-full text-xs text-gray-400 dark:text-gray-500 lg:hidden">
            &copy; {new Date().getFullYear()} Holy Spirit Academy of Bangued
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
