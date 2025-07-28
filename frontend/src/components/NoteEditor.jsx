import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  useCreateBlockNote,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import {deepEqual} from "fast-equals";
import { useAppStore } from "../store/appStore";
import toast from "react-hot-toast";

const MediaKeys = ["image", "video", "audio", "file"];

const customSlashMenuItems = (editor) => {
  return getDefaultReactSlashMenuItems(editor).filter(
    (item) => !MediaKeys.includes(item.key)
  );
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full py-4">
      <div className="flex space-x-2">
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

const NoteEditor = ({ blocks, noteId }) => {
  if(!blocks || blocks?.length == 0 ) {
    return <Loader />
  }

  const isDark = useAppStore((s) => s.isDark);
  const updateContent = useAppStore((s) => s.updateContent);
  
  const editor = useCreateBlockNote({
    initialContent: blocks
  });
  
  const lastSavedRef = useRef(editor.document);
  
  useHotkeys("ctrl+s, meta+s",async () => {
    const content = editor.document;
    await updateContent(content);
    toast.success("Content saved successfully");
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enableOnContentEditable: true,
    },
    [noteId, editor]
  );

  useEffect(() => {
    const handler = async () => {
      await updateContent(editor.document);
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [editor]);

  useEffect(() => {
    let isSaving = false;

    const interval = setInterval(async () => {
      if (isSaving) return;
      if (!deepEqual(editor.document, lastSavedRef.current)) {
        isSaving = true;
        try {
          await updateContent(editor.document);
          lastSavedRef.current = editor.document;
        } finally {
          isSaving = false;
        }
      }
    }, 5000);         //auto-save evry 5sec if changes occur

    return () => clearInterval(interval);
  }, [editor]);

  const handleBlur = async () => {
    await updateContent(editor.document);
  };

  return (
    <BlockNoteView
      key={noteId || "default-editor"}
      editor={editor}
      theme={isDark ? "dark" : "light"}
      slashMenu={false}
      onBlur={handleBlur}
    >
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) => filterSuggestionItems(customSlashMenuItems(editor),query)}
      />
    </BlockNoteView>
  );
};

export default NoteEditor;
