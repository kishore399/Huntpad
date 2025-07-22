import { useNavigate } from "react-router"

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[url('/404_Page.png')] bg-cover bg-center bg-no-repeat h-screen w-screen text-white flex flex-col justify-center items-center cursor-default" >
        <h1 className="text-[152px] p-12 font-extrabold">404</h1>
        <div className="text-2xl flex flex-col justify-center items-center text-white font-semibold gap-2">
            <p className="text-center w-full mx-2">You seem lost in the woods...</p>
            <p className="text-center w-full mx-2">The Page You're looking for doesn't exist.</p>
        </div>
        <button onClick={() => navigate("/")} className="bg-violet-600 rounded-full px-8 py-4 m-12 font-bold cursor-pointer hover:bg-violet-700 hover:scale-105">Back to Home</button>
    </div>
  )
}

export default NotFound