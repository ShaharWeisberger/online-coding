import { useContext, useEffect, useState } from "react";
import PageContext from "../../store/PageContext.jsx";

export default function LobbyPage() {
  const [titles, setTitles] = useState([]);
  const pageCtx = useContext(PageContext);

  // fetching the list of titles from the backend server
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://online-coding-production.up.railway.app/getListOfTitles"
        );
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
        <div className="buttons-in-center">
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
