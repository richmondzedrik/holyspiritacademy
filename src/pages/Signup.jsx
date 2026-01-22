import React, { useState } from 'react';
import { isValidPassword, validatePasswordRequirements } from '../utils/formUtils';
import { validateUserRegistration } from '../utils/nameValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import hsabImage from '../assets/hsab.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Local error state for better visibility
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strict Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return setError('First Name and Last Name are required.');
    }

    // Validate name and email for restricted terms (admin, root, etc.)
    const nameEmailValidation = validateUserRegistration(
      formData.firstName,
      formData.middleName,
      formData.lastName,
      formData.email
    );
    if (!nameEmailValidation.isValid) {
      return setError(nameEmailValidation.message);
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    const passwordValidation = isValidPassword(formData.password);
    if (!passwordValidation.isValid) {
      return setError(passwordValidation.message);
    }

    try {
      setLoading(true);
      setError('');

      // Create full name string
      const fullDisplayName = `${formData.firstName.trim()} ${formData.middleName.trim()} ${formData.lastName.trim()}`.replace(/\s+/g, ' ');

      // 1. Create user in Firebase Auth
      const user = await signup(formData.email, formData.password);

      // 2. Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        fullName: fullDisplayName,
        email: formData.email,
        role: 'user', // Default role
        createdAt: new Date().toISOString(),
        emailVerified: false
      });

      // 3. Log out immediately to prevent access before verification
      await auth.signOut();

      // 4. Show success message and redirect to verification page
      toast.success('Account created! Please verify your email to continue.');
      navigate('/verify-email', {
        state: {
          email: formData.email,
          fromSignup: true
        }
      });
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please use a different email or log in.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Failed to create account. Please try again.');
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
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 xl:p-12 relative overflow-y-auto">

          <div className="w-full max-w-md space-y-6">
            <div className="text-center lg:text-left">
              <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-gray-500 mb-8 hover:text-blue-600 transition-colors">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
              <div className="inline-block p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 lg:mb-6">
                <UserPlus size={32} />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Enter your details below to get started.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium animate-fade-in flex items-center gap-2">
                <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                {error}
              </div>
            )}

            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>

              {/* Name Fields Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">First Name <span className="text-red-500">*</span></label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                        <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        name="firstName"
                        type="text"
                        required
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Middle Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                        <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <input
                        name="middleName"
                        type="text"
                        className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        placeholder="M. (Optional)"
                        value={formData.middleName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Last Name <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                      <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="lastName"
                      type="text"
                      required
                      className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Password <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="block w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
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

                  {/* Password Requirements Checklist */}
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(() => {
                        const reqs = validatePasswordRequirements(formData.password);
                        const Requirement = ({ met, text }) => (
                          <div className={`flex items-center gap-1.5 text-xs ${met ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                            {met ? <Check size={12} className="stroke-[3]" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                            <span>{text}</span>
                          </div>
                        );
                        return (
                          <>
                            <Requirement met={reqs.length} text="8-16 Characters" />
                            <Requirement met={reqs.uppercase} text="At least 1 Uppercase" />
                            <Requirement met={reqs.number} text="At least 1 Number" />
                            <Requirement met={reqs.symbol} text="At least 1 Symbol" />
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                      <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="block w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-slate-800 border bg-opacity-50 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
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
                className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>

              <div className="text-center mt-6">
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
