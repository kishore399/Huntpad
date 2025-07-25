import { useAppStore } from "../store/appStore";
import { useRef, useEffect } from "react";
import { useParams } from "react-router";
import { useHotkeys } from "react-hotkeys-hook";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, getDefaultReactSlashMenuItems, SuggestionMenuController } from "@blocknote/react";
import NoteEditor from "./NoteEditor";


const Editor = () => {

  const notes = useAppStore((s) => s.notes);
  const selectedNotesId = useAppStore((s) => s.selectedNotesId);
  const selectedContent = useAppStore((s) => s.selectedContent);
  const updateTitle = useAppStore((s) => s.updateTitle);
  const saveTitle = useAppStore((s) => s.saveTitle);
  const getContent = useAppStore((s) => s.getContent);
  const setSelectedNotesId = useAppStore((s) => s.setSelectedNotesId);
  const isDark = useAppStore((s) => s.isDark);

  const titleref = useRef(null);
  const { id } = useParams();

  const title = notes.find((note) => note._id === selectedNotesId)?.title || "Loading...";
  
  useEffect(() => {
    console.log(selectedContent, "selectedContent in Editor");
  }, [selectedContent]);

  useEffect(() => {
    if (id && id != selectedNotesId) {
      setSelectedNotesId(id);
    }
  },[id, selectedNotesId, setSelectedNotesId]);

  useEffect(() => {
    const loadNote = async () => {
      if (selectedNotesId) {
        console.log("Loading note with ID:", selectedNotesId);
        await getContent(selectedNotesId);
        console.log("Note content loaded:", selectedContent);
      }
    }
    loadNote();
  },[selectedNotesId])
  
  useEffect(() => {
    if (titleref.current && titleref.current.innerText !== title){
      titleref.current.innerText = title
    }
  },[selectedNotesId, title]);

  const onTitleChange = () => {
    const newTitle = titleref.current.innerText;
    updateTitle(newTitle);
  }

  const onTitleBlur = () => {
    saveTitle(selectedNotesId, titleref.current.innerText);
    titleref.current.blur();
  }

  return (
    <div className="sm:mx-5 md:mx-8 lg:mx-16">
      <div 
        ref={titleref}
        contentEditable={true}
        spellCheck={false}
        onInput={onTitleChange}
        onBlur={onTitleBlur}
        className="text-6xl text-gray-800 leading-tight dark:text-white font-bold box-border outline-none overflow-visible resize-y px-7 py-5 w-full h-full t"
      />
      <div className="h-full w-full">
       <NoteEditor key={selectedNotesId} blocks={selectedContent} noteId={selectedNotesId} />
      </div>
    </div>
  )
}

export default Editor