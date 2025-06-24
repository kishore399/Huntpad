import { useState } from "react";
import Input from "../components/Input";
import { User, Mail, Lock, Loader } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link, useNavigate  } from "react-router";
import SubmitButton from "../components/SubmitButton";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Signup = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const error = useAuthStore((s) => s.error);
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setError = useAuthStore((s) => s.setError);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password do not match")
    } else {
      
      try{
        await signup(email, password, fullName);
        navigate("/verify-email");
        toast.success("OTP sent successfully")
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="auth-card">
        <h2 className="auth-title">
            Create Account
        </h2>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-2 mt-4 px-8">
            <Input 
              Icon={ User }
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input 
              Icon={ Mail }
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              Icon={ Lock }
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
              Icon={ Lock }
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          { error && <p className="text-red-500 text-sm mt-2">{error}</p> }

          <PasswordStrengthMeter password={password}/>
          <SubmitButton 
            text={isLoading ? <Loader className="animate-spin mx-auto" /> : "Sign Up" }
          />
        </form>
        <div className="w-full p-4 bg-slate-400 mt-2 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-900">Already have an account?</span>
          <Link to="/login" className="text-sm hover:underline hover:text-blue-600">Login</Link>
        </div>
    </div>
  )
}

export default Signup