import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
/**
 * @element ch-bar
 *
 * @attr {string} [className]
 */
class ChartBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.renderTemplate();
  }

  renderTemplate() {
    render(this, html``);
  }
}

customElements.define("ch-bar", ChartBar);
