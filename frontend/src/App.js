import React, { useState, useEffect } from "react";
import LuckyNumber from "./components/LuckyNumber";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = "light-theme";
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme === "light" ? "light-theme" : "dark-theme";
  };

  return (
    <div className={`App ${theme}`}>
      <nav className={`navbar ${theme}`}>
        <h1 className="navbar-title">Numerology</h1>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "🌞"}
        </button>
      </nav>
      <LuckyNumber />
    </div>
  );
}

export default App;
