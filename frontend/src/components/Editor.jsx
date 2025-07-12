import { useAppStore } from "../store/appStore";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

const Editor = () => {

  const notes = useAppStore((s) => s.notes);
  const selectedNotesId = useAppStore((s) => s.selectedNotesId);

  const title = notes.find((note) => note._id === selectedNotesId)?.title || "Untitled";

  const editor = useCreateBlockNote();

  return (
    <div>
      <div 
        contentEditable="true"
        className="text-3xl overflow-y-auto mx-7 my-5 w-full h-full"
      >
        {title}
      </div>
      <div className="h-full w-full">
        <BlockNoteView editor={editor} />
      </div>
    </div>
  )
}

export default Editor