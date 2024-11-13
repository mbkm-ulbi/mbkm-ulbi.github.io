import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element fo-label
 *
 * @attr {string} label
 * @attr {string} [for]
 * @attr {string} [className]
 */
class FormLabel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.renderTemplate();
  }

  renderTemplate() {
    if (this.hasAttribute("for")) {
      render(
        this,
        html`
          <label for=${this.getAttribute("for")} class=${cn("block mb-1 text-xs font-medium text-gray-600", this.getAttribute("className"))}>
            ${this.getAttribute("label")}
          </label>
        `
      );
    } else {
      render(
        this,
        html` <div class=${cn("block mb-1 text-xs font-medium text-gray-600", this.getAttribute("className"))}>${this.getAttribute("label")}</div> `
      );
    }
  }
}

customElements.define("fo-label", FormLabel);
