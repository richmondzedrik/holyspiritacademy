import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Real Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Admissions from './pages/Admissions';
import ForgotPassword from './pages/ForgotPassword';
import MyAccount from './pages/MyAccount';
import AdminDashboard from './pages/AdminDashboard';
import AuthAction from './pages/AuthAction'; // Custom Email Action Handler
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/admissions" element={<Admissions />} />
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
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
