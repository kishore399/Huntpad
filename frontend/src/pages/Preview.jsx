import Navbar from '../components/Navbar';

const PreviewContent = () => {
  return (
    <div className="p-4 xl:mx-7">
      <h1 className="text-2xl font-bold mb-4">Preview Mode</h1>
      <p>This is where you can preview your notes before publishing them.</p>
      <h1 className="max-xl:hidden">In large mode</h1>
      {/* Add more content or components as needed */}
    </div>
  );
};

const Preview = () => {
    
  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-stone-100 dark:bg-zinc-900 t">
      <div className="flex flex-col overflow-y-auto t">
        <main className="flex-1 bg-stone-50 min-h-screen dark:bg-slate-800 dark:text-slate-100 box-border overflow-auto w-screen t">
          <Navbar isPreview={true} />
          <div className="h-44 bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center rounded-lg" />
          <div>
            <PreviewContent />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Preview