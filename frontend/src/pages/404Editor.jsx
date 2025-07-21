import { PlusCircle } from "lucide-react";
import { useAppStore } from "../store/appStore";
import { useNavigate } from "react-router";

const NoteNotFound = () => {

    const createNote = useAppStore((s) => s.createNote);
    const navigate = useNavigate();

    const createPage = async () => {
      await createNote((id) => navigate(`/notes/${id}`));
    }

    return (
    <div className="text-slate-900 dark:text-white flex flex-col justify-center items-center my-14">
        <h1 className="text-3xl font-extrabold p-5 text-center">😕 Oops! Can't find this note</h1>
        <p className="px-2 py-0.5 font-semibold">It may have been deleted or the link is broken</p>
        <p className="px-2 py-0.5 font-semibold">select or create note to get started</p>
        <button onClick={createPage} className="flex gap-2 my-7 py-2 px-4 text-white font-bold shadow-lg bg-purple-500 dark:bg-purple-700 hover:bg-purple-600 rounded-full hover:scale-105 t"><PlusCircle />Create Note</button>
    </div>
  )
}

export default NoteNotFound