import { useContext } from "react";
import PageContext from "../../store/PageContext.jsx";

import { getTitles } from "../helpers/Item.jsx";

export default function LobbyPage() {
  const titlesToShow = getTitles(4);
  const pageCtx = useContext(PageContext);

  function handleButtonClick(title) {
    //need to complete and change th context of PageContext to 'code'
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
          {titlesToShow.map((name, index) => (
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
