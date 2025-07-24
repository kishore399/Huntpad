import { useState, useMemo } from "react";
import { useAppStore } from "../store/appStore";
import { useNavigate } from "react-router";

const FilteredList = ({Notes, close}) => {

  const getContent = useAppStore((s) => s.getContent);

  const navigate = useNavigate();

  const loadNote = async(id) => {
    await getContent(id);
    console.log(id)
    navigate(`/notes/${id}`)
    close();
  }

  return (
    <div className="mx-1 text-lg">
      {Notes?.map((note) => (
        <div key={note?._id} onClick={() => loadNote(note._id)} className="group flex items-center justify-between hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-2 py-1 t">
          <div className="text-[16px] w-full truncate">{note?.title}</div>
        </div>
      ))}
    </div>
  )
}

const SearchBar = ({close}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const notes = useAppStore((s) => s.notes);

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => (
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    },[searchTerm, notes]);

  return (
    <div onClick={close} className="absolute z-30 inset-0 flex justify-center items-center backdrop-blur-xs p-4 cursor-default t">
        <div onClick={(e) => e.stopPropagation()} className=" bg-slate-300 dark:bg-gray-800 dark:text-stone-100 rounded-lg shadow-lg shadow-slate-700 flex flex-col justify-center items-center gap-2">
            <div className="p-4 w-96 sm:w-[500px] sm:my-10">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="m-2 text-3xl font-bold">Search</h1>
                    <h1 className="font-semibold text-md">Find your notes quickly</h1>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <input 
                        type="text" 
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 rounded-lg mt-4 outline-none bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-stone-100"
                    />
                </div>
                <div className="flex flex-col mt-4 justify-center gap-1 ml-2">
                    {filteredNotes.length > 0 ? (
                        <FilteredList Notes={filteredNotes} close={close} />
                    ) : (
                        <div className="text-center text-slate-500 dark:text-slate-100 mt-4">No notes found</div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar