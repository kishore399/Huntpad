import { useState, useEffect } from "react";
import Input from "../components/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router";
import SubmitButton from "../components/SubmitButton";
import { useAuthStore } from "../store/authStore";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const error = useAuthStore((s) => s.error);
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setError = useAuthStore((s) => s.setError);

  useEffect(() => {
    setError(null);
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
      try{
        await login(email, password);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
  }

    return (
      <div className="screen-center">
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
          { error && <p className="text-red-500 text-sm mt-2">{error}</p> }

          <SubmitButton 
            text={isLoading ? <Loader className="animate-spin mx-auto" /> : "Login" }
          />
        </form>
        <div className="w-full p-4 bg-slate-400 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-900">Don't have an account?</span>
          <Link to="/Signup" className="text-sm hover:underline hover:text-blue-600">SignUp</Link>
        </div>
    </div>
    </div>
  )
}

export default Login