import { useState } from "react";
import Input from "../components/Input";
import { User, Mail, Lock } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link } from "react-router";
import SubmitButton from "../components/SubmitButton";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup clicked");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <PasswordStrengthMeter password={password}/>
          <SubmitButton 
            text="Sign Up"
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