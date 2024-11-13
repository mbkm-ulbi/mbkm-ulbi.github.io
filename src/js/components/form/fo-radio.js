import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import "https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/+esm";
import "./fo-label.js";

/**
 * @element fo-radio
 *
 * @attr {string} [label]
 * @attr {string} [name]
 * @attr {string} value
 * @attr {boolean} [checked]
 * @ttr {boolean} [disabled]
 * @attr {string} [className]
 */
class FormRadio extends HTMLElement {
  constructor() {
    super();
    this.component = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.component = this.querySelector("input");
  }

  static get observedAttributes() {
    return ["disabled", "checked"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.component || oldValue === newValue) return;
    this.renderTemplate();
  }

  renderTemplate() {
    render(
      this,
      html`
        <div class="relative flex items-center gap-1">
          <input
            type="radio"
            name=${this.getAttribute("name")}
            value=${this.getAttribute("value")}
            ?checked=${this.hasAttribute("checked")}
            ?disabled=${this.hasAttribute("disabled")}
            class="sr-only"
          />
          <div
            class=${cn(
              "h-6 w-6 p-2.5 outline-none bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-gray-400 focus:border-gray-400",
              "flex items-center justify-center",
              this.hasAttribute("disabled") && "cursor-not-allowed bg-gray-200",
              this.getAttribute("className")
            )}
          >
            ${this.hasAttribute("checked")
              ? html` <iconify-icon icon="material-symbols:radio-button-unchecked" class="text-blue-500 " height="12" noobserver></iconify-icon> `
              : null}
          </div>
          ${this.hasAttribute("label") ? html`<div class="cursor-default text-sm font-medium text-gray-900">${this.getAttribute("label")}</div>` : null}
        </div>
      `
    );

    this.querySelector(".relative").addEventListener(
      "click",
      () => {
        if (this.hasAttribute("disabled")) return;
        if (this.hasAttribute("checked")) {
          this.renderTemplate();
        } else {
          document.querySelectorAll(`fo-radio[name="${this.getAttribute("name")}"]`).forEach((elm) => {
            if (elm.getAttribute("value") !== this.getAttribute("value")) {
              elm.removeAttribute("checked");
            }
          });
          this.setAttribute("checked", "");
        }
      },
      { once: true }
    );
  }
}

customElements.define("fo-radio", FormRadio);
