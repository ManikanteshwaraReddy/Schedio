import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      const useDark = stored === "dark";
      setIsDark(useDark);
      document.documentElement.classList.toggle("dark", useDark);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const handleToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isDark}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 ${className}`}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
}
