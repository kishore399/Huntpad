import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
 
const App = () => {
  return (
    <div className="bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center w-screen h-screen flex justify-center items-center">
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/login" element={ <Login />} />
      <Route path="/signup" element={ <Signup />} />
    </Routes>
    </div>
  )
}

export default App