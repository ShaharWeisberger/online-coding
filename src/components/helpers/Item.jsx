import { useContext, useState, useEffect } from "react";
import { sendMessage } from "../pages/CodeBlockPage.jsx";
import PageContext from "../../store/PageContext.jsx";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";

const DUMMY_DATA = [
  { title: "Async Operations", code: "Async Operations CODE" },
  { title: "Error Handling", code: "Error Handling CODE" },
  { title: "Data Fetching", code: "Data Fetching CODE" },
  { title: "Event Handling", code: "Event Handling CODE" },
];

export function getTitles(numOfTitles) {
  if (numOfTitles >= DUMMY_DATA.length) {
    return DUMMY_DATA.map((item) => item.title);
  } else {
    return DUMMY_DATA.slice(0, numOfTitles).map((item) => item.title);
  }
}

export default function Item({ title = "" }) {
  const PageCtx = useContext(PageContext);

  const options = {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    readOnly: true,
    indentUnit: 2,
    lineWrapping: false,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `http://localhost:3001/getCode?title=${title}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network problem!");
        }
        const data = await response.json();
        PageCtx.setNewItemCode(data.code);
        PageCtx.setFirstPageVisit(data.firstTime);
      } catch (error) {
        console.error("Error fetching data:    ", error);
      }
    }
    fetchData();
  }, []);

  const foundItem = DUMMY_DATA.find((item) => item.title === title);

  const { code } = foundItem || {};
  const [editedCode, setEditedCode] = useState(code);
  const [newOptions, setNewOptions] = useState(options);

  useEffect(() => {
    const temp = {
      mode: "javascript",
      theme: "dracula",
      lineNumbers: true,
      readOnly: PageCtx.firstPageVisit,
      indentUnit: 2,
      lineWrapping: false,
    };
    setNewOptions(temp);
  }, [PageCtx.firstPageVisit]);

  // PageCtx.newItemCode = code;
  useEffect(() => {
    if (PageCtx.newItemCode !== "") {
      setEditedCode(PageCtx.newItemCode);
    }
  }, [PageCtx.newItemCode]);

  // State to manage the edited code

  // Function to handle code changes
  function handleCodeChange(event) {
    setEditedCode(event.target.value);
    sendMessage(event.target.value, title);

    // Update the code in DUMMY_DATA
    const updatedData = DUMMY_DATA.map((item) =>
      item.title === title ? { ...item, code: event.target.value } : item
    );

    // Update DUMMY_DATA
    DUMMY_DATA.splice(0, DUMMY_DATA.length, ...updatedData);
  }

  const MirrorCodeChange = (editor, data, value) => {
    setEditedCode(value);
    sendMessage(value, title);

    // Update the code in DUMMY_DATA
    const updatedData = DUMMY_DATA.map((item) =>
      item.title === title ? { ...item, code: value } : item
    );

    // Update DUMMY_DATA
    DUMMY_DATA.splice(0, DUMMY_DATA.length, ...updatedData);
  };

  return (
    <>
      <h2>{title}</h2>
      {/* <textarea
        value={editedCode}
        readOnly={PageCtx.firstPageVisit}
        onChange={handleCodeChange}
        rows={10}
        cols={50}
      /> */}
      <CodeMirror
        value={editedCode}
        onBeforeChange={(editor, data, value) =>
          MirrorCodeChange(editor, data, value)
        }
        options={newOptions}
        className="code-mirror-container"
      />
    </>
  );
}
