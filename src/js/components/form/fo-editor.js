import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
// import ClassicEditor from "https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-classic/build/ckeditor.js";

/**
 * @element fo-editor
 *
 * @attr {string} [name]
 * @attr {string} [value]
 * @attr {string} [className]
 * @attr {string} [placeholder]
 */
class FormEditor extends HTMLElement {
  constructor() {
    super();
    this.editorInstance = null;
  }

  connectedCallback() {
    // Pastikan hanya satu instance editor yang diinisialisasi
    this.initializeEditor();
  }

  disconnectedCallback() {
    // Hancurkan editor ketika komponen dilepas dari DOM
    if (this.editorInstance) {
      this.editorInstance.destroy().then(() => {
        this.editorInstance = null;
      }).catch((error) => {
        console.error("Error destroying CKEditor:", error);
      });
    }
  }

  static get observedAttributes() {
    return ["value", "placeholder", "className"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.editorInstance && oldValue !== newValue) {
      if (name === "value") {
        this.editorInstance.setData(newValue || "");
      }
    }
  }

  initializeEditor() {
    const editorContainer = this.querySelector("#editor");

    if (editorContainer && !this.editorInstance) {
      // Inisialisasi CKEditor hanya jika belum ada instance editor
      // @ts-ignore
      ClassicEditor.create(editorContainer, {
        toolbar: [
          'heading', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
          'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo', 'insertImage',
        ],
        placeholder: this.getAttribute("placeholder") || "Start writing...",
      }).then(this.handleEditorReady.bind(this))
        .catch((error) => {
          console.error("Error initializing CKEditor:", error);
        });
    }
  }

  handleEditorReady(editor) {
    this.editorInstance = editor;
    console.log("CKEditor is ready", editor);

    // Menangani event saat data editor disimpan atau berubah
    this.addEventListener("save", () => {
      const editorData = this.editorInstance.getData();
      console.log("Saved Content:", editorData);
      // Kirim atau simpan data editor sesuai kebutuhan
    });
  }

  renderTemplate() {
    render(
      this,
      html`
        <div
          id="editor"
          class="${this.getAttribute("className") || "min-h-[400px] border border-gray-300 p-4 rounded"}"
        ></div>
      `
    );
  }

}

customElements.define("fo-editor", FormEditor);
