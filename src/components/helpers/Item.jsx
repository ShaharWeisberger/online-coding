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
  // Find the object with the matching title
  const foundItem = DUMMY_DATA.find((item) => item.title === title);

  // If found, spread its properties
  const { code } = foundItem || {};

  return (
    <>
      <h2>{title}</h2>
      <pre>{title !== "" && code}</pre>
    </>
  );
}
