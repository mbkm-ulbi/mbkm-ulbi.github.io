import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element fo-textarea
 *
 * @attr {string} [name]
 * @attr {string} [value]
 * @attr {boolean} [error]
 * @attr {boolean} [disabled]
 * @attr {string} [placeholder]
 * @attr {string} [className]
 */
class FormTextarea extends HTMLElement {
  constructor() {
    super();
    this.component = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.component = this.querySelector("textarea");
    this.component.addEventListener("input", this.handleValueChanged);
  }

  disconnectedCallback() {
    this.component.removeEventListener("input", this.handleValueChanged);
  }

  static get observedAttributes() {
    return ["value", "error", "disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.component || oldValue === newValue) return;
    this.renderTemplate();
  }

  handleValueChanged() {
    this.parentElement.removeAttribute("error");
    document.querySelector(`fo-error[name="${this.getAttribute("name")}"]`)?.removeAttribute("error");
  }

  renderTemplate() {
    render(
      this,
      html`
        <textarea
          id=${this.getAttribute("name")}
          name=${this.getAttribute("name")}
          placeholder=${this.getAttribute("placeholder")}
          ?value=${this.getAttribute("value")}
          ?disabled=${this.hasAttribute("disabled")}
          class=${cn(
            "outline-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5",
            this.hasAttribute("disabled") && "cursor-not-allowed bg-gray-100",
            this.hasAttribute("error") && "border-red-500 text-red-900",
            this.getAttribute("className")
          )}
        >${this.getAttribute("value")}</textarea>
      `
    );
  }
}

customElements.define("fo-textarea", FormTextarea);
