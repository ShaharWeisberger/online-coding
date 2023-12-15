import { useContext } from "react";
import Item from "../helpers/Item.jsx";
import PageContext from "../../store/PageContext.jsx";

export default function CodePage() {
  //const title = "Error Handling";

  const PageCtx = useContext(PageContext);
  let renderCodePage = "";
  if (PageCtx.pageName === "code") {
    renderCodePage = (
      <>
        <h2>Welcome to the code block page :)</h2>
        <Item title={PageCtx.selectedTitle} />
      </>
    );
  }

  return renderCodePage;
}
