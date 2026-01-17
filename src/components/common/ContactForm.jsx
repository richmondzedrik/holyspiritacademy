import React, { useState } from 'react';
import { sendMessage } from '../../services/feedbackService';
import { Send, User, Mail as MailIcon, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendMessage(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );
      toast.success('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-400"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Subject</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-400"
              placeholder="What is this regarding?"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Message <span className="text-red-500">*</span></label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending...
            </div>
          ) : (
            <>
              <Send size={20} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
