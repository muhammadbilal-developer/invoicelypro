"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full border border-[var(--border-default)]" />;
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
      type="button"
    >
      <motion.div
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </button>
  );
}
