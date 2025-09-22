import * as React from "react";

export function useTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (window.localStorage.getItem("theme_v1") as "light" | "dark") || "light";
  });

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme_v1", theme);
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeToggle({
  value,
  onChange
}: {
  value: "light" | "dark";
  onChange: (v: "light" | "dark") => void;
}) {
  return (
    <button
      onClick={() => onChange(value === "light" ? "dark" : "light")}
      className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-700"
      title="Toggle theme"
    >
      {value === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
