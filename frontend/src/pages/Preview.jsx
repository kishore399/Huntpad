import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useAppStore } from '../store/appStore';
import NotFound from './NotFound';

const PreviewContent = () => {

    const preview = useAppStore((s) => s.preview);

  return (
    <div className="p-4 xl:mx-7">
      <h1 className="text-2xl font-bold mb-4">Preview Mode</h1>
      <p>This is where you can preview your notes before publishing them.</p>
      <h1 className="max-xl:hidden">In large mode</h1>
      <h1>{preview?.title}</h1>
      <p>Hi</p>
    </div>
  );
};

const Preview = () => {

    const getPreview = useAppStore((s) => s.getPreview);

    const { pid } = useParams();
    useEffect(() => {
        const fetchPreview = async () => {
            await getPreview(pid);
        };
        fetchPreview();
    },[pid]);
    
  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-stone-100 dark:bg-zinc-900 t">
      <div className="flex flex-col overflow-y-auto h-full t">
        <main className="flex-1 bg-neutral-100  min-h-screen dark:bg-slate-800 dark:text-slate-100 box-border overflow-auto w-screen t">
          <Navbar />
          <div className="h-44 bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center rounded-lg" />
          <div className="h-full w-full">
            <PreviewContent />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Preview