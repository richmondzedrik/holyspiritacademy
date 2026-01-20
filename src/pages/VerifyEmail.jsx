import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Inbox } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sendVerificationEmail } = useAuth();
    const [sending, setSending] = useState(false);

    const email = location.state?.email || '';
    const fromSignup = location.state?.fromSignup || false;

    // If no email in state, redirect to signup
    if (!email) {
        navigate('/signup');
        return null;
    }

    const handleResendEmail = async () => {
        try {
            setSending(true);
            await sendVerificationEmail();
            toast.success('Verification email sent! Please check your inbox and spam folder.');
        } catch (error) {
            console.error("Error resending verification email:", error);
            if (error.code === 'auth/too-many-requests') {
                toast.error('Too many attempts. Please wait a few minutes before trying again.');
            } else {
                toast.error('Failed to send verification email. Please try again later.');
            }
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <SEO
                title="Verify Your Email - Holy Spirit Academy of Bangued"
                description="Please verify your email address to complete your registration."
            />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    {/* Back to Home Link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    {/* Main Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-slate-700">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                                    <span className="text-white text-xs font-bold">!</span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
                            Verify Your Email
                        </h1>

                        {/* Subtitle */}
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                            We've sent a verification link to:
                        </p>

                        {/* Email Display */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                            <p className="text-center text-blue-900 dark:text-blue-100 font-semibold break-all">
                                {email}
                            </p>
                        </div>

                        {/* Instructions */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Click the verification link in the email to activate your account
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <Inbox className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    <p className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
                                        ⚠️ Don't forget to check your SPAM or JUNK folder!
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Sometimes verification emails end up there. If you don't see it in your inbox, please check your spam folder.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <RefreshCw className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    After verifying, you can log in to your account
                                </p>
                            </div>
                        </div>

                        {/* Resend Button */}
                        <button
                            onClick={handleResendEmail}
                            disabled={sending}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <RefreshCw size={18} className={sending ? 'animate-spin' : ''} />
                            {sending ? 'Sending...' : 'Resend Verification Email'}
                        </button>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already verified?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Having trouble? Contact us at{' '}
                            <a
                                href="mailto:info@holyspiritacademy.edu.ph"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                info@holyspiritacademy.edu.ph
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
