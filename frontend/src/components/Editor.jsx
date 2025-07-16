import { useAppStore } from "../store/appStore";
import { useRef, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

const Editor = () => {

  const notes = useAppStore((s) => s.notes);
  const selectedNotesId = useAppStore((s) => s.selectedNotesId);
  const selectedContent = useAppStore((s) => s.selectedContent);
  const updateTitle = useAppStore((s) => s.updateTitle);
  const saveTitle = useAppStore((s) => s.saveTitle);
  const getContent = useAppStore((s) => s.getContent);

  const titleref = useRef(null);

  useEffect(() => {
    if (titleref.current && titleref.current.innerText !== title){
      titleref.current.innerText = title
    }

    const loadNote = async () => {
      if (selectedNotesId) {
        console.log("Loading note with ID:", selectedNotesId);
        await getContent(selectedNotesId);
        editor.replaceContent(
          selectedContent.length ? selectedContent : [{
            id: "init-block",
            type: "paragraph",
            content: [{ type: "text", text: "" }],
          }]
        );
      }
    }
    loadNote();
  },[selectedNotesId])

  const title = notes.find((note) => note._id === selectedNotesId)?.title || "Untitled";

  const onTitleChange = () => {
    const newTitle = titleref.current.innerText;
    updateTitle(newTitle);
  }

  const onTitleBlur = () => {
    saveTitle(selectedNotesId, titleref.current.innerText);
    titleref.current.blur();
  }

  const editor = useCreateBlockNote({

  });

  return (
    <div>
      <div 
        ref={titleref}
        contentEditable={true}
        spellCheck={false}
        onInput={onTitleChange}
        onBlur={onTitleBlur}
        className="text-6xl font-bold box-border outline-none overflow-visible resize-y px-7 py-5 w-full h-full t"
      />
      <div className="h-full w-full">
        <BlockNoteView editor={editor} />
      </div>
    </div>
  )
}

export default Editor