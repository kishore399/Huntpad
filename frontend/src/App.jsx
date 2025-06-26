import {useEffect} from "react";
import { Navigate, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import { useAuthStore } from "./store/authStore";
import ResetPassword from "./pages/ResetPassword";
 
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

const RedirectVerifiedUser = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  if (isAuthenticated) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

const RedirectUnverifiedUser = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children;
}

const App = () => {

  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  },[])

  if (isCheckingAuth) return <div>Checking auth</div>

  return (
    <div className="bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center w-screen h-screen flex justify-center items-center">
    <Routes>
      <Route 
        path="/" 
        element={ 
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/login" 
        element={
          <RedirectVerifiedUser>
            <Login />
          </RedirectVerifiedUser>
        }
      />
      <Route 
        path="/signup" 
        element={
          <RedirectVerifiedUser>
            <Signup />
          </RedirectVerifiedUser>
        }
      />
      <Route 
        path="/verify-email" 
        element={
          <RedirectUnverifiedUser>
            <EmailVerification />
          </RedirectUnverifiedUser>
        }
      />
      <Route 
        path="/forgot-password" 
        element={
          <RedirectVerifiedUser>
            <ForgotPassword />
          </RedirectVerifiedUser>
        }
      />
      <Route 
        path="/reset-password" 
        element={
          <RedirectVerifiedUser>
            <ResetPassword />
          </RedirectVerifiedUser>
        }
      />
    </Routes>
    <Toaster />
    </div>
  )
}

export default App