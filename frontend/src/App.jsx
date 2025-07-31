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
import NotFound from "./pages/NotFound";
import LoadingScreen from "./pages/LoadingScreen";
import { useAppStore } from "./store/appStore";
import Editor from "./components/Editor";
import WelcomePage from "./pages/WelcomePage";
import NoteNotFound from "./pages/404Editor";
import Preview from "./pages/Preview";
 
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
    return <Navigate to="/home" replace />
  }
  if (isAuthenticated) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

const App = () => {

  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const setIsDark = useAppStore((s) => s.setIsDark);

  useEffect(() => {
    checkAuth();
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  },[])

  if (isCheckingAuth) return <LoadingScreen />

  return (
    <div className="bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center w-screen h-screen">
    <Routes>
      <Route 
        path="/home" 
        element={ 
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<WelcomePage />} />
        <Route path="/home/404" element={<NoteNotFound />} />
        <Route path="/home/notes/:id" element={<Editor />} />
      </Route>
      <Route 
        path="/preview/:pid" 
        element={
            <Preview />
        }
      />
      <Route 
        path="/" 
        element={<Navigate to="/home" replace />}
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
            <EmailVerification />
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
      <Route 
        path="*" 
        element={
          <NotFound />
        } 
      />
    </Routes>
    <Toaster />
    </div>
  )
}

export default App