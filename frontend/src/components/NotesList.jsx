import { useAppStore } from "../store/appStore";
import { LucideSoapDispenserDroplet, Pin, PinOff, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const NotesList = () => {

  const Notes = useAppStore((s) => s.notes);
  const getContent = useAppStore((s) => s.getContent);
  const navigate = useNavigate();

  const handlePin = async() => {
    console.log("Pinned")
  }

  const handleDelete  = async() => {
    console.log("Deleted")
  }

  const loadNote = async(id) => {
    await getContent(id);
    navigate(`/notes/${id}`)
  }

  return (
    <div className="mx-1 space-y-1 text-lg">
      {Notes?.map((note,index) => (
        <div key={index} className="group flex items-center justify-between">
          <div onClick={() => loadNote(note._id)} className="text-[16px] w-full truncate">{note?.title}</div>
          <div className="flex scale-75 gap-3 dark:text-slate-300 opacity-0 max-md:opacity-100 t group-hover:opacity-100 shrink-0">
            <div onClick={handlePin} className="">{note.isPinned ? <PinOff /> : <Pin />}</div>
            <div onClick={handleDelete} className=""><Trash2 /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotesList