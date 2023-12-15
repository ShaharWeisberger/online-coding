import { useState } from "react";

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
  const foundItem = DUMMY_DATA.find((item) => item.title === title);

  const { code } = foundItem || {};

  // State to manage the edited code
  const [editedCode, setEditedCode] = useState(code);

  // Function to handle code changes
  function handleCodeChange(event) {
    setEditedCode(event.target.value);

    // Update the code in DUMMY_DATA
    const updatedData = DUMMY_DATA.map((item) =>
      item.title === title ? { ...item, code: event.target.value } : item
    );

    // Update DUMMY_DATA
    DUMMY_DATA.splice(0, DUMMY_DATA.length, ...updatedData);
  }
  return (
    <>
      <h2>{title}</h2>
      <textarea
        value={editedCode}
        onChange={handleCodeChange}
        rows={10}
        cols={50}
      />
    </>
  );
}
