import { createContext } from "react";

const PageContext = createContext({
  pageName: "",
  setPage: () => {},
  selectedTitle: "",
  setSelectedTitle: () => {},
});

export default PageContext;
