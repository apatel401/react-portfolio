import React from "react";
import './index.scss';
import Header from "./component/Header";
import useLocalStorage from 'use-local-storage';


function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  return (
    <main  className="main-container">
  <Header />
  </main>
  );
}

export default App;