import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import SubmitButton from "../components/SubmitButton";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();

    const error = useAuthStore((s) => s.error);
    const verifyEmail = useAuthStore((s) => s.verifyEmail);
    const isLoading = useAuthStore((s) => s.isLoading);
    const setError = useAuthStore((s) => s.setError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if(!/^\d{6}$/.test(code)){
      setError("OTP must be 6-digit number")
    } else {

      try {
        await verifyEmail(code);
        navigate("/");
        toast.success("Email verified successfully");
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    if (value.length === 2 && index === 5) {}
    else if (value.length > 1) {
      const pastedOtp = value.slice(0,6).split("")
      for (let i=0; i<6; i++) {
        newOtp[i] = pastedOtp[i] || "";
      }
      const lastIndex = newOtp.reduce((acc,curr) => acc + (curr? 1 : 0), 0 );
      const focusIndex = (lastIndex < 6)? lastIndex : 5;
      setOtp(newOtp);
      inputRef.current[focusIndex].focus();

    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index !== 5 && value) {
        inputRef.current[index+1].focus();
      }
    }
  }

  const handleKeyDown = (index,e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index-1].focus();
    }
  }

  return (
    <div className="auth-card">
        <h2 className="auth-title">
            Verify your Email
        </h2>
        <p className="text-center text-sm text-slate-600 font-semibold mt-8 mb-4">Enter the 6-digit code sent to your email address</p>
        <form onSubmit={ handleSubmit } className="w-full flex flex-col gap-2 mt-4 px-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            {otp.map((num,index) => (
              <input 
                key={index}
                autoComplete="one-time-code"
                type="text"
                placeholder="0"
                inputMode="numeric"
                maxLength="6"
                ref={(el) => (inputRef.current[index] = el)}
                value={num}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e) }
                className="bg-violet-200 text-center w-12 h-12 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            ))}
          </div>
            { error && <p className="text-red-500 text-sm mt-2">{error}</p> }

          <SubmitButton 
            text={isLoading ? <Loader className="animate-spin mx-auto" /> : "Verify Email" }
          />
        </form>
    </div>
  )
}

export default EmailVerification