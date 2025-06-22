import { useState } from "react";
import Input from "../components/Input";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked");
  }

    return (
    <div className="max-w-md w-full bg-white overflow-hidden rounded-lg flex flex-col justify-center m-4">
        <h2 className="text-2xl font-bold text-violet-500 text-center mt-8">
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
          <button type="submit" className="bg-violet-500 py-2 rounded-full font-bold text-white mt-4" >Login</button>
        </form>
        <div className="w-full p-4 bg-slate-400 mt-4 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-900">Don't have an account?</span>
          <Link to="/Signup" className="text-sm hover:underline hover:text-blue-600">SignUp</Link>
        </div>
    </div>
  )
}

export default Login