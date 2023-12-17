import { useContext, useEffect, useState } from "react";
import PageContext from "../../store/PageContext.jsx";

export default function LobbyPage() {
  const [titles, setTitles] = useState([]);
  const pageCtx = useContext(PageContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/getListOfTitles");
        if (!response.ok) {
          throw new Error("Network problem!");
        }
        const data = await response.json();
        setTitles(data.titles);
      } catch (error) {
        console.error("Error fetching data:    ", error);
      }
    }
    fetchData();
  }, []);

  function handleButtonClick(title) {
    pageCtx.setPage("code");
    pageCtx.setSelectedTitle(title);
  }

  let renderLobbyPage = "";
  if (pageCtx.pageName === "lobby") {
    renderLobbyPage = (
      <>
        <header>
          <h2>Choose code block</h2>
        </header>
        <div>
          {titles.length !== 0 &&
            titles.map((name, index) => (
              <button key={index} onClick={() => handleButtonClick(name)}>
                {name}
              </button>
            ))}
        </div>
      </>
    );
  }

  return renderLobbyPage;
}
