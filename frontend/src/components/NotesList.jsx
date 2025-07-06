import { useAppStore } from "../store/appStore";
import { Pin, PinOff, Trash2 } from "lucide-react";

const NotesList = () => {

  const Notes = useAppStore((s) => s.notes)

  const handlePin = async() => {
    console.log("Pinned")
  }

  const handleDelete  = async() => {
    console.log("Deleted")
  }

  return (
    <div className="mx-1 space-y-1 text-lg">
      {Notes?.map((note,index) => (
        <div key={index} className="group flex items-center justify-between">
          <div className="text-md">{note.title}</div>
          <div className="flex scale-75 gap-3 dark:text-slate-300 opacity-0 max-md:opacity-100 t group-hover:opacity-100">
            <div onClick={handlePin} className="">{note.isPinned ? <PinOff /> : <Pin />}</div>
            <div onClick={handleDelete} className=""><Trash2 /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotesList