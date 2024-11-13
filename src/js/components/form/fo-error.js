import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element fo-error
 *
 * @attr {string} name
 * @attr {string} [error]
 * @attr {string} [className]
 */
class FormError extends HTMLElement {
  constructor() {
    super();
    this.component = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.component = this.querySelector("p");
  }

  static get observedAttributes() {
    return ["error"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.component || oldValue === newValue) return;
    this.renderTemplate();
  }

  renderTemplate() {
    render(
      this,
      html`
        <p class=${cn("text-red-500 text-xs mt-1", this.getAttribute("className"), !this.getAttribute("error") && "hidden")}>${this.getAttribute("error")}</p>
      `
    );
  }
}

customElements.define("fo-error", FormError);
