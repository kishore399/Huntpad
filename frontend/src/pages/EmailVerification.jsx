import { Link } from "react-router";
import { useState, useRef } from "react";
import SubmitButton from "../components/SubmitButton";

const EmailVerification = () => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp);
  }

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log("OTP changed:", newOtp);
  }

  const handleKeyDown = (index,e) => {
    console.log("key Pressed")
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
                type="text"
                placeholder="0"
                inputMode="numeric"
                maxLength="6"
                value={num}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e) }
                className="bg-violet-200 text-center w-12 h-12 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            ))}
          </div>
          <SubmitButton 
            text="Verify OTP"
          />
        </form>
    </div>
  )
}

export default EmailVerification