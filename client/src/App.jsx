import { useState } from "react";
import "./App.css";
import CodeBlockPage from "./components/pages/CodeBlockPage.jsx";
import LobbyPage from "./components/pages/LobbyPage.jsx";
import PageContext from "./store/PageContext.jsx";

export default function App() {
  const [pageName, setPage] = useState("lobby");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [newItemCode, setNewItemCode] = useState("");
  const [firstPageVisit, setFirstPageVisit] = useState(true);
  const [goldenCode, setGoldenCode] = useState(true);

  const contextValue = {
    pageName,
    setPage,
    selectedTitle,
    setSelectedTitle,
    newItemCode,
    setNewItemCode,
    firstPageVisit,
    setFirstPageVisit,
    goldenCode,
    setGoldenCode,
  };
  return (
    <PageContext.Provider value={contextValue}>
      <LobbyPage />
      <CodeBlockPage />
    </PageContext.Provider>
  );
}
