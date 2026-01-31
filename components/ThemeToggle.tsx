"use client";

import { useTheme } from "next-themes";
import { useEffect,useState } from "react";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚨 Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="  top-4 right-4 z-50">
    <button      
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
      rounded-full border px-4 py-2 bg-black dark:bg-white  dark:text-black  text-white 
      transition-all
      duration-300
      ease-in-out
      hover:scale-105
      active:scale-95
       "
    >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    
    </button>
 
    </div>
 );
}
