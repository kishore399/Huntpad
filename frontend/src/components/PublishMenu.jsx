
import { Globe, Copy } from "lucide-react";
import toast from "react-hot-toast";

const PublishMenu = ({note, handlePublish}) => {

  const handleCopy = () => {
    const url = import.meta.env.MODE === "development" ? `http://localhost:5173/preview/${note._id}` : `https://huntpad.onrender.com/preview/${note._id}`;

    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="absolute top-full bg-slate-100/70 dark:bg-slate-700/70 z-10 rounded-lg m-3 px-2 py-1">
      {note?.isPublished ?
        <div className="mt-1 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-2">
            <Globe className="text-indigo-500 dark:text-sky-500 size-5 animate-[pulse_0.9s_linear_infinite]"/>
            <p className="text-sm font-bold">The note is live</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-md h-7 bg-slate-300 dark:bg-slate-700/80 dark:text-slate-300 pl-2 rounded-l-lg w-56 truncate">http://localhost:5173/preview/{note._id}</div>
            <div className="bg-slate-700 dark:bg-slate-800 p-1 px-2 rounded-r-lg">
              <Copy onClick={handleCopy} className="size-5 text-white" />
            </div>
          </div>
          <button onClick={handlePublish} className="py-0.5 my-1 px-16 font-semibold text-white bg-slate-700 dark:bg-slate-800 hover:scale-y-105 hover:bg-slate-800 dark:hover:bg-slate-900 rounded-lg t" >Unpublish</button>
        </div>
        :
        <div className="mt-1 flex flex-col items-center justify-center gap-3">
          <Globe className="size-10" />
          <h1 className="font-semibold text-md">Publish this note</h1>
          <button onClick={handlePublish} className="py-0.5 font-semibold mb-2 px-20 text-white bg-slate-700 hover:scale-y-105 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-900 rounded-lg t" >Publish</button>
        </div>
      }
    </div>
  )
}

export default PublishMenu