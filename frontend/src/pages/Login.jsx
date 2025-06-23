import { useState } from "react";
import Input from "../components/Input";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import SubmitButton from "../components/SubmitButton";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked");
  }

    return (
    <div className="auth-card">
        <h2 className="auth-title">
            Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-2 mt-4 px-8">
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
          <Link to="/forgot-password" className="text-sm hover:underline hover:text-blue-600 mt-2">Forgot password?</Link>
          <SubmitButton 
            text="Login"
          />
        </form>
        <div className="w-full p-4 bg-slate-400 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-900">Don't have an account?</span>
          <Link to="/Signup" className="text-sm hover:underline hover:text-blue-600">SignUp</Link>
        </div>
    </div>
  )
}

export default Login