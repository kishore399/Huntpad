import { useAppStore } from "../store/appStore";
import { LucideSoapDispenserDroplet, Pin, PinOff, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const NotesList = () => {

  const Notes = useAppStore((s) => s.notes);
  const getContent = useAppStore((s) => s.getContent);
  const deleteNote = useAppStore((s) => s.deleteNote);
  const pinNote = useAppStore((s) => s.pinNote);

  const navigate = useNavigate();

  const handlePin = async(id) => {
    console.log("from pin", id);
    await pinNote(id);
    console.log("Pin");
  }

  const handleDelete  = async(id) => {
    await deleteNote(id);
    console.log(id);
  }

  const loadNote = async(id) => {
    await getContent(id);
    console.log(id)
    navigate(`/notes/${id}`)
  }

  return (
    <div className="mx-1 text-lg">
      {Notes?.map((note,index) => (
        <div key={index} className="group flex items-center justify-between hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-2 py-1 t">
          <div onClick={() => loadNote(note._id)} className="text-[16px] w-full truncate">{note?.title}</div>
          <div className="flex scale-75 gap-3 max-sm:gap-5 dark:text-slate-300 opacity-0 max-md:opacity-100 t group-hover:opacity-100 shrink-0">
            <div onClick={() => handlePin(note._id)} className="hover:scale-105">{note.isPinned ? <PinOff /> : <Pin />}</div>
            <div onClick={() => handleDelete(note._id)} className="hover:scale-105"><Trash2 /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotesList