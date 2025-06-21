import { useState } from "react";
import Input from "../components/Input";
import { User, Mail, Lock } from "lucide-react";
import PasswordStrength from "../components/PasswordStrength";

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
    <div className="max-w-md w-full bg-white overflow-hidden rounded-lg flex flex-col justify-center p-6">
        <h2 className="text-2xl font-bold text-violet-500 text-center">
            Create Account
        </h2>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-2 mt-4">
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
        </form>
        <PasswordStrength password={password}/>
    </div>
  )
}

export default Signup