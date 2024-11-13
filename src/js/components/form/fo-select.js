import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import Choices from "https://cdn.jsdelivr.net/npm/choices.js@11.0.2/+esm";

/**
 * @element fo-select
 *
 * @attr {string} [name]
 * @attr {boolean} [error]
 * @attr {boolean} [clearable]
 * @attr {boolean} [searchable]
 * @attr {boolean} [disabled]
 * @attr {string} [placeholder]
 */
class FormSelect extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.childNodes);
    this.component = null;
    this.choices = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.component.addEventListener("change", this.handleValueChanged);
  }

  disconnectedCallback() {
    this.component.removeEventListener("change", this.handleValueChanged);
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
    this.parentElement.parentElement.parentElement.removeAttribute("error");
    document.querySelector(`fo-error[name="${this.getAttribute("name")}"]`)?.removeAttribute("error");
  }

  handleError() {
    const choiceInner = this.querySelector(".choices__inner");
    if (this.hasAttribute("error")) choiceInner.classList.add("error");
    else choiceInner.classList.remove("error");
  }

  handleDisabled() {
    if (this.hasAttribute("disabled")) this.choices.disable();
    else this.choices.enable();
  }

  renderTemplate() {
    render(
      this,
      html`
        <select id=${this.getAttribute("name")} name=${this.getAttribute("name")} data-placeholder=${this.getAttribute("placeholder") ?? ""}>
          ${this.hasAttribute("clearable") ? html` <option value="">Clear</option> ` : null} ${Array.from(this.content)}
        </select>
      `
    );

    this.component = this.querySelector("select");
    const choices = new Choices(this.component, {
      searchEnabled: this.hasAttribute("searchable"),
      itemSelectText: "",
    });

    this.choices = choices;
    this.handleError();
    this.handleDisabled();

    this.component.addEventListener("choice", function (event) {
      // @ts-ignore
      if (event.detail.value === "_clear") choices.removeActiveItems();
    });
  }
}

customElements.define("fo-select", FormSelect);
