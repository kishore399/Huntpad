import Input from "../components/Input";
import { Mail, ArrowLeft, Loader } from "lucide-react";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const error = useAuthStore((s) => s.error);
  const forgotPassword = useAuthStore((s) => s.forgotPassword);
  const isLoading = useAuthStore((s) => s.isLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      forgotPassword(email);
      navigate("/verify-email?from=forgot-password");
      toast.success("OTP sent successfully")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
    <div className="auth-card">
      <div className="auth-title mb-4">Forgot Password</div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 mt-4 px-8">
            <Input 
              Icon={ Mail }
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            { error && <p className="text-red-500 text-sm mt-2">{error}</p> }

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

export default ForgotPassword