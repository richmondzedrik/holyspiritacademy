import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Use current origin for dev/localhost (guaranteed to be whitelisted)
    // Use configured VITE_APP_URL in production, fallback to origin
    const redirectUrl = window.location.origin; // For now, let's force origin to ensure delivery works on the environment triggering it

    console.log("Sending verification email with redirect URL:", redirectUrl);

    const actionCodeSettings = {
      url: `${redirectUrl}/login`, // Redirect to login page after verification
      handleCodeInApp: false,
    };

    try {
      await sendEmailVerification(userCredential.user, actionCodeSettings);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }

    return userCredential.user;
  };

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = async (email) => {
    const redirectUrl = window.location.origin; // Force origin for consistency

    const actionCodeSettings = {
      url: `${redirectUrl}/login`,
      handleCodeInApp: false,
    };

    console.log("Sending password reset email to:", email, "with URL:", redirectUrl);
    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch additional user data from Firestore (e.g., roles)
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Send Verification Email
  const sendVerificationEmail = async () => {
    if (currentUser) {
      const redirectUrl = window.location.origin;
      console.log("Resending verification email with redirect URL:", redirectUrl);

      const actionCodeSettings = {
        url: `${redirectUrl}/login`,
        handleCodeInApp: false,
      };

      try {
        await sendEmailVerification(currentUser, actionCodeSettings);
        console.log("Verification email re-sent successfully");
      } catch (error) {
        console.error("Error resending verification email:", error);
        throw error;
      }
    }
  };

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    resetPassword,
    sendVerificationEmail,
    isAdmin: userData?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
