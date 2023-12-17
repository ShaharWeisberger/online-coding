import { useContext, useEffect } from "react";
import Item from "../helpers/Item.jsx";
import PageContext from "../../store/PageContext.jsx";

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export function sendMessage(message, page) {
  socket.emit("send_message", { message, page });
}

export default function CodePage() {
  const PageCtx = useContext(PageContext);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      PageCtx.setNewItemCode(data.message);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("join_page", PageCtx.selectedTitle);
  }, [PageCtx.selectedTitle]);

  let renderCodePage = "";
  function hansleBackToLobby() {
    PageCtx.setPage("lobby");
  }
  if (PageCtx.pageName === "code") {
    renderCodePage = (
      <>
        <h2>Welcome to the code block page :)</h2>
        <Item title={PageCtx.selectedTitle} />
        <button onClick={hansleBackToLobby}>Back to lobby</button>
      </>
    );
  }

  return renderCodePage;
}
