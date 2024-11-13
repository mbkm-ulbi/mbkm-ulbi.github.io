import { toMonetary } from "../../libraries/utilities.js";
import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import "https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/+esm";
import "./ui-button.js";

/**
 * @element ui-pagination
 *
 * @attr {boolean} [disabled]
 * @attr {string} [className]
 * @attr {number} [data-pagination-count]
 * @attr {number} [data-pagination-limit]
 * @attr {number} [data-pagination-page]
 */
class UIPagination extends HTMLElement {
  constructor() {
    super();
    this.component = null;
    this.firstPage = null;
    this.prevPage = null;
    this.nextPage = null;
    this.lastPage = null;
  }

  connectedCallback() {
    this.renderTemplate();
    this.firstPage = this.querySelector(".first-page");
    this.prevPage = this.querySelector(".prev-page");
    this.nextPage = this.querySelector(".next-page");
    this.lastPage = this.querySelector(".last-page");
    this.firstPage.addEventListener("click", this.handleFirstPage.bind(this));
    this.prevPage.addEventListener("click", this.handlePrevPage.bind(this));
    this.nextPage.addEventListener("click", this.handleNextPage.bind(this));
    this.lastPage.addEventListener("click", this.handleLastPage.bind(this));
  }

  disconnectedCallback() {
    this.component = null;
    this.firstPage.removeEventListener("click", this.handleFirstPage);
    this.prevPage.removeEventListener("click", this.handlePrevPage);
    this.nextPage.removeEventListener("click", this.handleNextPage);
    this.lastPage.removeEventListener("click", this.handleLastPage);
  }

  static get observedAttributes() {
    return ["disabled", "data-pagination-page"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.component || oldValue === newValue) return;
    this.renderTemplate();
  }

  handleFirstPage() {
    this.setAttribute("data-pagination-page", "1");
    this.emitPageChangeEvent(1);
  }

  handlePrevPage() {
    const page = Number(this.getAttribute("data-pagination-page") ?? 1);
    this.setAttribute("data-pagination-page", (page - 1).toString());
    this.emitPageChangeEvent(page - 1);
  }

  handleNextPage() {
    const page = Number(this.getAttribute("data-pagination-page") ?? 1);
    this.setAttribute("data-pagination-page", (page + 1).toString());
    this.emitPageChangeEvent(page + 1);
  }

  handleLastPage() {
    const count = Number(this.getAttribute("data-pagination-count") ?? 0);
    const limit = Number(this.getAttribute("data-pagination-limit") ?? 0);
    this.setAttribute("data-pagination-page", Math.ceil(count / limit).toString());
    this.emitPageChangeEvent(Math.ceil(count / limit));
  }

  emitPageChangeEvent(page) {
    const event = new CustomEvent("pagination-page-change", {
      detail: { page },
    });
    this.dispatchEvent(event);
  }

  renderTemplate() {
    const count = Number(this.getAttribute("data-pagination-count") ?? 0);
    const limit = Number(this.getAttribute("data-pagination-limit") ?? 0);
    const page = Number(this.getAttribute("data-pagination-page") ?? 1);
    const disabled = this.hasAttribute("disabled");

    render(
      this,
      html`
        <div class=${cn("pagination-wrapper mx-0 flex items-center justify-between gap-2 text-xs text-muted-foreground", this.getAttribute("className"))}>
          <div class="truncate">Total: <strong>${toMonetary(count)}</strong> items</div>
          <div class="flex items-center gap-4">
            <div class="flex gap-4">
              <div class="flex items-center justify-center whitespace-nowrap">
                Page ${toMonetary((page ?? 1).toString())} of ${toMonetary((Math.ceil(count / limit) ?? 1).toString())}
              </div>
              <div class="flex items-center gap-1">
                <ui-button
                  size="icon"
                  className="first-page flex items-center justify-center rounded text-white w-7 h-7 p-0"
                  ?disabled=${page === 1 || disabled}
                >
                  <span class="sr-only">Go to first page</span>
                  <iconify-icon icon="material-symbols:keyboard-double-arrow-left-rounded" width="20" height="20" noobserver></iconify-icon>
                </ui-button>
                <ui-button
                  size="icon"
                  className="prev-page flex items-center justify-center rounded text-white w-7 h-7 p-0"
                  ?disabled=${page === 1 || disabled}
                >
                  <span class="sr-only">Go to previous page</span>
                  <iconify-icon icon="material-symbols:chevron-left-rounded" width="20" height="20" noobserver></iconify-icon>
                </ui-button>
                <ui-button
                  size="icon"
                  className="next-page flex items-center justify-center rounded text-white w-7 h-7 p-0"
                  ?disabled=${count / limit === 0 || Math.ceil(count / limit) === (page ?? 1) || disabled}
                >
                  <span class="sr-only">Go to next page</span>
                  <iconify-icon icon="material-symbols:chevron-right-rounded" width="20" height="20" noobserver></iconify-icon>
                </ui-button>
                <ui-button
                  size="icon"
                  className="last-page flex items-center justify-center rounded text-white w-7 h-7 p-0"
                  ?disabled=${count / limit === 0 || Math.ceil(count / limit) === (page ?? 1) || disabled}
                >
                  <span class="sr-only">Go to last page</span>
                  <iconify-icon icon="material-symbols:keyboard-double-arrow-right-rounded" width="20" height="20" noobserver></iconify-icon>
                </ui-button>
              </div>
            </div>
          </div>
        </div>
      `
    );

    this.component = this.querySelector(".pagination-wrapper");
  }
}

customElements.define("ui-pagination", UIPagination);
