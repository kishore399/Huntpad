import { useState, useEffect, use } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import { useAppStore } from '../store/appStore';
import NotFound from './NotFound';
import {
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

const PreviewNote = ({pid}) => {

  const preview = useAppStore((s) => s.preview);
  const isDark = useAppStore((s) => s.isDark);

  const editor = useCreateBlockNote(
    {
      initialContent:
        preview?.content && preview?.content?.length > 0
        ? preview?.content
        : [
          {
            id: pid,
            type: "paragraph",
            content: [{ type: "text", text: "" }],
          },
        ],
    },
    [pid] 
  );

  console.log("after block",preview?.content)

  return (
    <div className="p-4 xl:mx-7 mt-5">
      <div className="text-6xl text-gray-800 leading-tight dark:text-white font-bold box-border outline-none overflow-visible resize-y px-7 py-5 w-full h-full t">{preview?.title}</div>
      <div className='w-full h-full overflow-y-auto'>
        <BlockNoteView
          key={pid || "default-editor"}
          editor={editor}
          editable={false}
          theme={isDark ? "dark" : "light"}
        />
      </div>
    </div>
  );
};

const Preview = () => {

    const getPreview = useAppStore((s) => s.getPreview);
    const preview = useAppStore((s) => s.preview);
    const [isValid, setIsValid] = useState(true);

    const { pid } = useParams();

    useEffect(() => {
        const fetchPreview = async () => {
            await getPreview(pid);
        };
        fetchPreview();
        console.log("preview", preview)
    },[pid]);

    useEffect(() => {
        if (!preview) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
    }, [preview]);

  if (!isValid) {
    return <NotFound />;
  }
  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-stone-100 dark:bg-zinc-900 t">
      <div className="flex flex-col overflow-y-auto h-full t">
        <main className="flex-1 bg-neutral-100  min-h-screen dark:bg-slate-800 dark:text-slate-100 box-border overflow-auto w-screen t">
          <Navbar />
          <div className="h-44 md:h-52 md:mb-3 lg:h-60 lg:mb-5 bg-cover bg-center bg-no-repeat rounded-lg" style={{backgroundImage: `url(${preview?.cover || "/BackgroundVioletScenery.jpg"})`}} />
          <div className="h-full w-full">
            <PreviewNote pid={pid}/>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Preview