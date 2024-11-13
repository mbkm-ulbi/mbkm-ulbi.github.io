import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import flatpickrJS from "https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/+esm";
import "https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/+esm";

/**
 * @element fo-datepicker
 *
 * @attr {string} [name]
 * @attr {boolean} [error]
 * @attr {boolean} [clearable]
 * @attr {boolean} [disabled]
 * @attr {string} [placeholder]
 * @attr {string} [value]
 * @attr {string} [className]
 */
class FormDatepicker extends HTMLElement {
  constructor() {
    super();
    this.hiddenComponent = null;
    this.dateComponent = null;
    this.flatpickr = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.hiddenComponent.addEventListener("input", this.handleValueChanged);
  }

  disconnectedCallback() {
    this.hiddenComponent.removeEventListener("input", this.handleValueChanged);
  }

  static get observedAttributes() {
    return ["error", "disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hiddenComponent || oldValue === newValue) return;
    if (name === "error") this.handleError();
    if (name === "disabled") this.handleDisabled();
  }

  handleValueChanged() {
    this.parentElement.parentElement.removeAttribute("error");
    document.querySelector(`fo-error[name="${this.getAttribute("name")}"]`)?.removeAttribute("error");
  }

  handleError() {
    if (this.hasAttribute("error")) this.dateComponent.classList.add("border-red-500", "text-red-900");
    else this.dateComponent.classList.remove("border-red-500", "text-red-900");
  }

  handleDisabled() {
    if (this.hasAttribute("disabled")) this.dateComponent.setAttribute("disabled", "");
    else this.dateComponent.removeAttribute("disabled");
  }

  handleClearable() {
    if (this.hasAttribute("clearable")) {
      const container = this.flatpickr.calendarContainer.querySelector(".flatpickr-rContainer");
      if (container instanceof HTMLElement) {
        const button = document.createElement("button");
        button.innerText = "Clear";
        button.classList.add("px-2", "py-1", "mb-2", "rounded", "bg-gray-100", "text-gray-700", "text-xs", "hover:bg-gray-200", "duration-100");
        button.onclick = () => {
          this.flatpickr.clear();
          this.flatpickr.close();
        };
        container.appendChild(button);
      }
    }
  }

  renderTemplate() {
    render(
      this,
      html`
        <div class="relative">
          <input
            name=${this.getAttribute("name")}
            ?disabled=${this.hasAttribute("disabled")}
            value=${this.getAttribute("value")}
            class=${cn(
              "outline-none appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 pr-8",
              this.getAttribute("className")
            )}
          />
          <iconify-icon icon="lucide:calendar" class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600" height="16" noobserver></iconify-icon>
        </div>
      `
    );

    this.hiddenComponent = this.querySelector("input");
    this.flatpickr = flatpickrJS(this.hiddenComponent, {
      altInput: true,
      position: "auto center",
      altFormat: "j F Y",
      dateFormat: "Y-m-d",
      appendTo: document.body,
    });

    this.dateComponent = this.querySelector("input[readonly]");
    if (this.hasAttribute("name")) this.dateComponent.setAttribute("id", this.getAttribute("name"));
    if (this.hasAttribute("placeholder")) this.dateComponent.setAttribute("placeholder", this.getAttribute("placeholder"));
    this.dateComponent.classList.add("flatpickr-input");

    this.handleError();
    this.handleDisabled();
    this.handleClearable();
  }
}

customElements.define("fo-datepicker", FormDatepicker);
