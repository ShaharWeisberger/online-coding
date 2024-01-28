import { useState, useEffect } from "react";
import db from "../../firebase.js";
import { collection, onSnapshot } from "firebase/firestore";

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

// export function getTitles(numOfTitles) {
//   // Use the codeBlocks state instead of DUMMY_DATA
//   if (numOfTitles >= codeBlocks.length) {
//     return codeBlocks.map((item) => item.title);
//   } else {
//     return codeBlocks.slice(0, numOfTitles).map((item) => item.title);
//   }
// }

export default function Item({ title = "" }) {
  const [editedCode, setEditedCode] = useState("");
  const [codeBlocks, setCodeBlocks] = useState([
    { title: "Loading...", code: "initial" },
  ]);
  console.log(codeBlocks);

  useEffect(
    () =>
      onSnapshot(collection(db, "CodeBlocks"), (snapshot) =>
        setCodeBlocks(
          snapshot.docs.map((doc) => ({ ...doc.data(), title: doc.title }))
        )
      ),
    []
  );

  const foundItem = codeBlocks.find((item) => item.title === title);
  // const foundItem = DUMMY_DATA.find((item) => item.title === title);
  const { code } = foundItem || {};

  // Function to handle code changes
  function handleCodeChange(event) {
    setEditedCode(event.target.value);

    // Update the code in Firestore
    collection("CodeBlocks").doc(foundItem.title).update({
      code: event.target.value,
    });
    // // Update the code in DUMMY_DATA
    // const updatedData = DUMMY_DATA.map((item) =>
    //   item.title === title ? { ...item, code: event.target.value } : item
    // );

    // // Update DUMMY_DATA
    // DUMMY_DATA.splice(0, DUMMY_DATA.length, ...updatedData);
  }
  return (
    <>
      <h2>{title}</h2>
      {codeBlocks.map((codeb) => (
        <li key={codeb.id}>
          <p>{codeb.title}</p>
          <p>{codeb.code}</p>
        </li>
      ))}
      <textarea value={code} onChange={handleCodeChange} rows={10} cols={50} />
    </>
  );
}
