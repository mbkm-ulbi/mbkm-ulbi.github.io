import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element fo-ckeditor
 *
 * @attr {string} [name]
 * @attr {string} [value]
 * @attr {boolean} [disabled]
 * @attr {string} [className]
 */

class FormCKEditor extends HTMLElement {
  constructor() {
    super();
    this.editor = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.loadEditor();
  }

  disconnectedCallback() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  static get observedAttributes() {
    return ["value", "disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" && this.editor && oldValue !== newValue) {
      this.editor.setData(newValue);
    }
    if (name === "disabled" && this.editor) {
      this.editor.isReadOnly = this.hasAttribute("disabled");
    }
  }

  async loadEditor() {
    const editorContainer = this.querySelector(".editor");

    if (!editorContainer) {
      console.error("Editor container not found");
      return;
    }

    // Memuat CKEditor dari CDN
    const { default: ClassicEditor } = await import("https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-classic@latest/build/ckeditor.js");

    const editorConfig = {
      toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
    };

    // Inisialisasi CKEditor
    ClassicEditor
      .create(editorContainer, editorConfig)
      .then(editor => {
        this.editor = editor;

        // Mengatur nilai awal
        this.editor.setData(this.getAttribute("value") || "");

        // Mendengarkan perubahan data
        this.editor.model.document.on('change:data', () => {
          const data = this.editor.getData();
          this.setAttribute("value", data);
          this.dispatchEvent(new Event('input')); // Memicu event input
        });
      })
      .catch(error => {
        console.error("Failed to initialize CKEditor:", error);
      });
  }

  renderTemplate() {
    render(
      this,
      html`
        <div class="editor-container ${cn(this.getAttribute("className"))}">
          <div class="editor" ?disabled=${this.hasAttribute("disabled")}></div>
        </div>
      `
    );
  }
}

customElements.define("fo-editor", FormCKEditor);