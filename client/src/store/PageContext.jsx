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
  goldenCode: "",
  setGoldenCode: () => {},
});

export default PageContext;
