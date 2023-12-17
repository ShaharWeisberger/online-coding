import { format } from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

// Function to format code using prettier
export default function formatCode(code) {
  try {
    return format(code, {
      parser: "babel",
      plugins: [parserBabel],
      semi: false,
      singleQuote: true,
      trailingComma: "es5",
    });
  } catch (error) {
    console.error("Error formatting code:", error);
    return code;
  }
}
