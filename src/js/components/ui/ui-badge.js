import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { cn } from "../../libraries/tailwind.js";

/**
 * @element ui-badge
 * @attr {boolean} [dot] - Menampilkan badge dengan dot jika diatur.
 * @attr {string} [content] - Isi teks dalam badge.
 * @attr {string} [className] - Kelas tambahan untuk kustomisasi.
 */
class UIBadge extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.childNodes);
  }

  connectedCallback() {
    this.renderTemplate();
  }

  renderTemplate() {
    const hasDot = this.hasAttribute("dot");
    const content = this.textContent;

    render(
      this,
      html`
        <div class=${cn("rounded-xl px-2 py-1 text-xs font-medium flex items-center gap-2 shrink-0 w-fit bg-inherit", this.getAttribute("className"))}>
          ${hasDot ? html`<span class="w-2 h-2 rounded-full bg-current"></span>` : ""} ${content}
        </div>
      `
    );
  }
}

customElements.define("ui-badge", UIBadge);
