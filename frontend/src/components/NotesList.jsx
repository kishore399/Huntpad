import { useAppStore } from "../store/appStore";
import { LucideSoapDispenserDroplet, Pin, PinOff, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const NotesList = () => {

  const Notes = useAppStore((s) => s.notes);
  const getContent = useAppStore((s) => s.getContent);
  const deleteNote = useAppStore((s) => s.deleteNote);
  const pinNote = useAppStore((s) => s.pinNote);
  const selectedNotesId = useAppStore((s) => s.selectedNotesId);
  const setIsCollapsed = useAppStore((s) => s.setIsCollapsed);

  const navigate = useNavigate();

  const isTouchScreen = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const handlePin = async(id,e) => {
    e.stopPropagation();
    console.log("from pin", id);
    await pinNote(id);
    console.log("Pin");
  }

  const handleDelete  = async(id,e) => {
    e.stopPropagation();
    await deleteNote(id);
    if (id === selectedNotesId) {
      navigate("/home");
    }
    console.log(id);
  }

  const loadNote = async(id) => {
    await getContent(id);
    console.log(id)
    navigate(`/home/notes/${id}`)
    if (window.innerWidth < 640) {
      setIsCollapsed(true);
    }
  }

  return (
    <div className="mx-1 text-lg">
      {Notes?.map((note) => (
        <div key={note?._id} onClick={() => loadNote(note._id)} className="group flex items-center justify-between hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-2 py-1 t">
          <div className="text-[16px] w-full truncate">{note?.title}</div>
          <div className={`flex scale-75 gap-3 max-sm:gap-5 dark:text-slate-300 ${isTouchScreen ? "opacity-100" : "opacity-0 group-hover:opacity-100"} t shrink-0`}>
            <div onClick={(e) => handlePin(note._id,e)} className="hover:scale-105">{note.isPinned ? <PinOff /> : <Pin />}</div>
            <div onClick={(e) => handleDelete(note._id,e)} className="hover:scale-105"><Trash2 /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotesList