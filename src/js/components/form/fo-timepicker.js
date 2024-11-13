import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import flatpickrJS from "https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/+esm";
import "https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/+esm";

/**
 * @element fo-timepicker
 *
 * @attr {string} [name]
 * @attr {boolean} [error]
 * @attr {boolean} [disabled]
 * @attr {string} [placeholder]
 * @attr {string} [value]
 * @attr {string} [className]
 */
class FormTimepicker extends HTMLElement {
  constructor() {
    super();
    this.component = null;
    this.flatpickr = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.component.addEventListener("input", this.handleValueChanged);
  }

  disconnectedCallback() {
    this.component.removeEventListener("input", this.handleValueChanged);
  }

  static get observedAttributes() {
    return ["error", "disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.component || oldValue === newValue) return;
    if (name === "error") this.handleError();
    if (name === "disabled") this.handleDisabled();
  }

  handleValueChanged() {
    this.parentElement.parentElement.removeAttribute("error");
    document.querySelector(`fo-error[name="${this.getAttribute("name")}"]`)?.removeAttribute("error");
  }

  handleError() {
    if (this.hasAttribute("error")) this.component.classList.add("border-red-500", "text-red-900");
    else this.component.classList.remove("border-red-500", "text-red-900");
  }

  handleDisabled() {
    if (this.hasAttribute("disabled")) this.component.setAttribute("disabled", "");
    else this.component.removeAttribute("disabled");
  }

  renderTemplate() {
    render(
      this,
      html`
        <div class="relative">
          <input
            id=${this.getAttribute("name")}
            name=${this.getAttribute("name")}
            placeholder=${this.getAttribute("placeholder")}
            ?disabled=${this.hasAttribute("disabled")}
            value=${this.getAttribute("value")}
            class=${cn(
              "flatpickr-input outline-none appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 pr-8",
              this.getAttribute("className")
            )}
          />
          <iconify-icon icon="lucide:clock" class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600" height="16" noobserver></iconify-icon>
        </div>
      `
    );

    this.component = this.querySelector("input");
    this.flatpickr = flatpickrJS(this.component, {
      altInput: false,
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      position: "auto center",
      appendTo: document.body,
    });

    this.component = this.querySelector("input[readonly]");
    if (this.hasAttribute("name")) this.component.setAttribute("id", this.getAttribute("name"));
    if (this.hasAttribute("placeholder")) this.component.setAttribute("placeholder", this.getAttribute("placeholder"));
    this.component.classList.add("flatpickr-input");

    this.handleError();
    this.handleDisabled();
  }
}

customElements.define("fo-timepicker", FormTimepicker);
