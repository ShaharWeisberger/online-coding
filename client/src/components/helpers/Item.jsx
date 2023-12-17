import { useContext, useState, useEffect } from "react";
import { sendMessage } from "../pages/CodeBlockPage.jsx";
import PageContext from "../../store/PageContext.jsx";
import smileyFaceImg from "../../assets/smiley_face1.png";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";

export default function Item({ title = "" }) {
  // prepare the code string for comparison
  // removes extra spaces and special characters.
  function replaceWhitespace(inputString) {
    let step0 = inputString.split("\\n").join("\n");

    let step1 = step0.replace(/ +/g, " ");
    let step2 = step1.replace(/[\n\t\r]+/g, "");
    return step2;
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

  // fetching the code for a given title.
  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://online-coding-production.up.railway.app/getCode?title=${title}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network problem!");
        }
        const data = await response.json();
        let s = data.code.split("\\n").join("\n");
        setEditedCode(s);
        PageCtx.setFirstPageVisit(data.firstTime);
        PageCtx.setGoldenCode(replaceWhitespace(data.goldencode));
      } catch (error) {
        console.error("Error fetching data:    ", error);
      }
    }
    fetchData();
  }, []);

  const [editedCode, setEditedCode] = useState("");
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
    setIsSmiley(PageCtx.goldenCode === replaceWhitespace(value));
  }

  return (
    <>
      {isSmiley && <img src={smileyFaceImg} alt="smily face image" />}
      <h2 className="h2-title">{title}</h2>
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
