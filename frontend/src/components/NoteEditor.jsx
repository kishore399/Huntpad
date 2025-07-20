import React, { useEffect } from "react";
import {
  useCreateBlockNote,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useAppStore } from "../store/appStore";

const MediaKeys = ["image", "video", "audio", "file"];

const customSlashMenuItems = (editor) => {
  return getDefaultReactSlashMenuItems(editor).filter(
    (item) => !MediaKeys.includes(item.key)
  );
};

const NoteEditor = ({ blocks, noteId }) => {
  const isDark = useAppStore((s) => s.isDark);
  const updateContent = useAppStore((s) => s.updateContent);

  const editor = useCreateBlockNote(
    {
      initialContent:
        blocks && blocks.length > 0
          ? blocks
          : [
              {
                id: noteId,
                type: "paragraph",
                content: [{ type: "text", text: "" }],
              },
            ],
    },
    [noteId] 
  );

console.log("NoteEditor initialized with blocks:");
  const slashItems = customSlashMenuItems(editor);

  return (
    <BlockNoteView
      key={noteId || "default-editor"}
      editor={editor}
      theme={isDark ? "dark" : "light"}
      slashMenu={false}
      onChange={() => { }}
    >
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async () => slashItems}
      />
    </BlockNoteView>
  );
};

export default React.memo(NoteEditor);
