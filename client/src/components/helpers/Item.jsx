import { useContext, useState, useEffect } from "react";
import { sendMessage } from "../pages/CodeBlockPage.jsx";
import PageContext from "../../store/PageContext.jsx";
import smileyFaceImg from "../../assets/smiley_face.png";
// import {formatCode} from "./prettier.js";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";

import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

const DUMMY_DATA = [
  { title: "Promise", code: "Promise CODE" },
  { title: "Asynchronous function", code: "Asynchronous function CODE" },
  { title: "Error handling", code: "Error handling CODE" },
  { title: "Fetch data", code: "Fetch data CODE" },
];

export function getTitles(numOfTitles) {
  if (numOfTitles >= DUMMY_DATA.length) {
    return DUMMY_DATA.map((item) => item.title);
  } else {
    return DUMMY_DATA.slice(0, numOfTitles).map((item) => item.title);
  }
}

export default function Item({ title = "" }) {
  function formatCode(code) {
    try {
      return prettier.format(code, {
        parser: "babel",
        plugins: [parserBabel],
      });
    } catch (error) {
      console.error("Error formatting code:", error);
      return code; // Return original code if formatting fails
    }
  }
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
        let s = data.code;
        PageCtx.setNewItemCode(s); // The good one

        //PageCtx.setNewItemCode(formatCode(s)); // The good one
        PageCtx.setFirstPageVisit(data.firstTime);
        PageCtx.setGoldenCode(data.goldencode);
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
  const [isSmiley, setIsSmiley] = useState(false);

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

  useEffect(() => {
    if (PageCtx.newItemCode !== "") {
      setEditedCode(PageCtx.newItemCode);
    }
  }, [PageCtx.newItemCode]);

  function MirrorCodeChange(editor, data, value) {
    setEditedCode(value);
    sendMessage(value, title);
    setIsSmiley(PageCtx.goldenCode === value);

    const updatedData = DUMMY_DATA.map((item) =>
      item.title === title ? { ...item, code: value } : item
    );

    DUMMY_DATA.splice(0, DUMMY_DATA.length, ...updatedData);
  }

  return (
    <>
      {isSmiley && <img src={smileyFaceImg} alt="smily face image" />}
      <h2 className="h2-title">{title}</h2>
      <CodeMirror
        //value={NiceEditedCode}
        value={editedCode}
        // value={formatCode(editedCode)}
        onBeforeChange={(editor, data, value) =>
          MirrorCodeChange(editor, data, value)
        }
        options={newOptions}
        className="code-mirror-container"
        // style={{ whiteSpace: "pre-wrap" }}
      />
    </>
  );
}
