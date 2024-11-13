import { dummyContent } from "./content.js";

const editor = document.querySelector("fo-editor");
if (editor instanceof HTMLElement) {
  editor.setAttribute("data-editor-content", JSON.stringify(dummyContent));
}
