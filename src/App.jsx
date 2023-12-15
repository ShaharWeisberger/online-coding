// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from "react";
import "./App.css";
import CodePage from "./components/pages/CodeBlockPage.jsx";
import LobbyPage from "./components/pages/LobbyPage.jsx";
import PageContext from "./store/PageContext.jsx";

export default function App() {
  const [pageName, setPage] = useState("lobby");
  const [selectedTitle, setSelectedTitle] = useState("");

  const contextValue = { pageName, setPage, selectedTitle, setSelectedTitle };
  return (
    <PageContext.Provider value={contextValue}>
      <LobbyPage />
      <CodePage />
    </PageContext.Provider>
  );
}
