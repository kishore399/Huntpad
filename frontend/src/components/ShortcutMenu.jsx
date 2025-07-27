const shortcuts = [
    { key: "/", action: "Open slash menu" },
  { key: "Ctrl", plus: true, key2: "S", action: "Save content" },
  { key: "Ctrl", plus: true, key2: "K", action: "Search notes" },
  { key: "Ctrl", plus: true, key2: "B", action: "Toggle sidebar" },
  { key: "Ctrl", plus: true, key2: "P", action: "Toggle Profile Page" },
];

const ShortcutMenu = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Keyboard Shortcuts
      </h2>
      <ul className="space-y-3">
        {shortcuts.map((s, i) => (
          <li
            key={i}
            className="flex items-center justify-between bg-slate-200 dark:bg-slate-900 p-3 rounded-xl shadow-sm"
          >
            <div className="flex gap-1 justify-center items-center text-sm font-mono text-zinc-700 dark:text-zinc-200">
              <kbd className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded border text-xs">
                {s.key}
              </kbd>
              {s.plus && <span className="text-xs">+</span>}
              {s.key2 && (
                <kbd className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded border text-xs">
                  {s.key2}
                </kbd>
              )}
            </div>
            <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {s.action}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShortcutMenu;
