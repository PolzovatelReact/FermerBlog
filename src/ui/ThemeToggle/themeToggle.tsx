import React, { useState } from "react";
import themes from "./theme.module.css"; // Подключаем стили

interface ThemeToggleProps {
  onThemeChange: (theme: "light" | "dark") => void;
}
export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    onThemeChange(newTheme); // Передаём тему в родительский компонент
  };

  return (
    <div className={themes.container}>
      <p
        className={`${themes.block} ${
          theme === "light" ? themes.lightBlock : themes.darkBlock
        }`}
      >
        Включена {theme} тема
      </p>
      <button className={themes.button} onClick={toggleTheme}>
        {theme === "light" ? "Темная" : "Светлая"}
      </button>
    </div>
  );
}
