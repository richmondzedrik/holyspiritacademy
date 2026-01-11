import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import { PostSkeleton } from './components/common/Skeletons';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AuthAction = lazy(() => import('./pages/AuthAction'));
const Announcements = lazy(() => import('./pages/Announcements'));
const SchoolProfile = lazy(() => import('./pages/SchoolProfile'));
const VisionMission = lazy(() => import('./pages/VisionMission'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Administrators = lazy(() => import('./pages/Administrators'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
      <AuthProvider>
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
              <Toaster 
                position="top-right" 
                toastOptions={{ 
                  duration: 4000,
                  className: 'dark:bg-slate-800 dark:text-white',
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                  },
                }} 
              />
            <ErrorBoundary>
              <Navbar />
            </ErrorBoundary>
            <main className="flex-grow">
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/admissions" element={<Admissions />} />
                      <Route path="/announcements/:id" element={<Announcements />} />
                      <Route path="/announcements" element={<Announcements />} />
                      <Route path="/school-profile" element={<SchoolProfile />} />
                      <Route path="/vision-mission" element={<VisionMission />} />
                      <Route path="/facilities" element={<Facilities />} />
                      <Route path="/administrators" element={<Administrators />} />
                      <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    
                    {/* Firebase Auth Actions (Verify Email, Reset Password) */}
                    <Route path="/auth/action" element={<AuthAction />} />

                    {/* User Routes (Protected) */}
                    <Route 
                      path="/account" 
                      element={
                        <ProtectedRoute>
                          <MyAccount />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Admin Routes (Protected) */}
                    <Route 
                      path="/admin/*" 
                      element={
                        <ProtectedRoute adminOnly={true}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        </Router>
      </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
