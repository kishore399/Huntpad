import Input from "../components/Input";
import { Lock, ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const error = useAuthStore((s) => s.error);
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setError = useAuthStore((s) => s.setError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password do not match")
    } else {
      
      try{
        await resetPassword( password );
        navigate("/");
        toast.success("Password updated successfully")
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
    <div className="auth-card">
      <div className="auth-title mb-4">Reset Password</div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 mt-4 px-8">
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
              text={isLoading ? <Loader className="animate-spin mx-auto" /> : "Reset Password" }
            />
      </form>
        <div className="w-full p-4 bg-slate-400 mt-2 flex justify-center items-center gap-2">
          <ArrowLeft className="text-slate-900 scale-75" />
          <Link to="/login" className="text-sm text-slate-900 hover:underline hover:text-blue-600">  Back to Login</Link>
        </div>
    </div>
    </div>
  )
}

export default ResetPassword