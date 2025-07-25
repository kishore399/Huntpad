import { PlusCircle } from "lucide-react";
import { useAppStore } from "../store/appStore";
import { useNavigate } from "react-router";

const WelcomePage = () => {

    const createNote = useAppStore((s) => s.createNote);
    const navigate = useNavigate();

    const createPage = async () => {
      await createNote((id) => navigate(`/home/notes/${id}`));
    }

    return (
    <div className="text-slate-900 dark:text-white flex flex-col justify-center items-center my-14">
        <h1 className="text-5xl font-extrabold p-5 text-center">Welcome to HuntPad</h1>
        <p className="px-2 py-0.5 font-semibold">select or create a note to get started</p>
        <button onClick={createPage} className="flex gap-2 my-7 py-2 px-4 text-white font-bold shadow-lg bg-purple-500 dark:bg-purple-700 hover:bg-purple-600 rounded-full hover:scale-105 t"><PlusCircle />Create Note</button>
    </div>
  )
}

export default WelcomePage