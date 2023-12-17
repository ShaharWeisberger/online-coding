import { createContext } from "react";

const PageContext = createContext({
  pageName: "",
  setPage: () => {},
  selectedTitle: "",
  setSelectedTitle: () => {},
  newItemCode: "",
  setNewItemCode: () => {},
  firstPageVisit: true,
  setFirstPageVisit: () => {},
});

export default PageContext;
