import { useState } from "react";
import Input from "../components/Input";
import { User, Mail, Lock } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link } from "react-router";

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
    <div className="max-w-md w-full bg-white overflow-hidden rounded-lg flex flex-col justify-center m-4">
        <h2 className="text-2xl font-bold text-violet-500 text-center mt-8">
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
          <button type="submit" className="bg-violet-500 py-2 rounded-full font-bold text-white mt-4" >Sign Up</button>
        </form>
        <div className="w-full p-4 bg-slate-400 mt-4 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-900">Already have an account?</span>
          <Link to="/login" className="text-sm hover:underline hover:text-blue-600">Login</Link>
        </div>
    </div>
  )
}

export default Signup