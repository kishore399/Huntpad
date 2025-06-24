import {useEffect} from "react";
import { Navigate, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import { useAuthStore } from "./store/authStore";
 
const ProtectedRoute = () => {}

const RedirectVerifiedUser = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children
}

const App = () => {

  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  },[])

  console.log(isCheckingAuth)

  return (
    <div className="bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center w-screen h-screen flex justify-center items-center">
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route 
        path="/login" 
        element={
          <RedirectVerifiedUser>
            <Login />
          </RedirectVerifiedUser>
        }
      />
      <Route path="/signup" element={ <Signup />} />
      <Route path="/verify-email" element={ <EmailVerification />} />
      <Route path="/forgot-password" element={ <ForgotPassword />} />
    </Routes>
    <Toaster />
    </div>
  )
}

export default App