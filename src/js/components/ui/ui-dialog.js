import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import micromodal from "https://cdn.jsdelivr.net/npm/micromodal@0.4.10/+esm";

/**
 * @element ui-dialog
 *
 * @attr {string} name
 * @attr {string} [className]
 */
class UIDialog extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.childNodes);
  }

  connectedCallback() {
    this.renderTemplate();
  }

  renderTemplate() {
    const id = this.getAttribute("name") || Date.now().toString();

    render(
      this,
      html`
        <div class="group ui-dialog" id=${id} aria-hidden="true">
          <div
            class=${cn(
              "z-30 duration-300 fixed inset-0 bg-white/80 backdrop-blur-sm",
              "group-aria-[hidden=false]:animate-in group-aria-[hidden=false]:fade-in-0",
              "group-aria-hidden:animate-out group-aria-hidden:fade-out-0"
            )}
            tabindex="-1"
            data-dialog-close
          ></div>
          <div
            class=${cn(
              "z-30 duration-300 fixed left-[50%] top-[50%] w-full h-full max-w-[95dvw] max-h-[90dvh] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border bg-white p-6 shadow-lg",
              "group-aria-[hidden=false]:animate-in group-aria-[hidden=false]:fade-in-0 group-aria-[hidden=false]:zoom-in-95 group-aria-[hidden=false]:slide-in-from-left-1/2 group-aria-[hidden=false]:slide-in-from-top-[48%]",
              "group-aria-hidden:animate-out group-aria-hidden:fade-out-0 group-aria-hidden:zoom-out-95 group-aria-hidden:slide-out-to-left-1/2 group-aria-hidden:slide-out-to-top-[48%]",
              this.getAttribute("className")
            )}
            role="dialog"
            aria-modal="true"
          >
            ${this.content}
          </div>
        </div>
      `
    );

    micromodal.init({
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
      disableScroll: true,
      openTrigger: "data-dialog-trigger",
      closeTrigger: "data-dialog-close",
    });
  }
}

customElements.define("ui-dialog", UIDialog);
