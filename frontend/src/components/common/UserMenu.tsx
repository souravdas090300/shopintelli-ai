import React, { useState, useRef, useEffect } from 'react';

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-indigo-50 text-indigo-700 font-semibold"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        S
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-md py-1 text-sm">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-50">Profile</button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-50">Settings</button>
          <div className="my-1 h-px bg-gray-200" />
          <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50">Sign out</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
