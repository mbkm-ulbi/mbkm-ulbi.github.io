import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import tippyJS from "https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/headless/+esm";

/**
 * @element ui-popover
 *
 * @attr {string} name
 * @attr {"click" | "mouseenter"} [trigger]
 * @attr {"auto" | "auto-start" | "auto-end" | "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "right" | "right-start" | "right-end" | "left" | "left-start" | "left-end"} [placement]
 * @attr {string} [className]
 */
class UIPopover extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.childNodes);
  }

  connectedCallback() {
    this.renderTemplate();
  }

  renderTemplate() {
    const className = this.getAttribute("className");

    // @ts-ignore
    tippyJS(document.querySelector(`[data-popover-trigger=${this.getAttribute("name")}]`), {
      content: this.content,
      trigger: this.getAttribute("trigger") || "click",
      animation: true,
      interactive: true,
      placement: this.getAttribute("placement") || "auto",
      appendTo: document.body,
      render(instance) {
        const popper = document.createElement("div");
        const template = html`
          <div class=${cn("popover-content z-50 duration-150 border bg-white px-4 py-3 shadow-lg rounded-lg", className)}>
            <div>${instance.props.content}</div>
          </div>
        `;
        render(popper, template);

        popper.querySelector("[data-popover-close]")?.addEventListener("click", () => {
          instance.hide();
        });

        return { popper };
      },
      onShow(instance) {
        const content = instance.popper.querySelector(".popover-content");
        content.classList.remove("animate-out", "fade-out-0", "zoom-out-95");
        content.classList.add("animate-in", "fade-in-0", "zoom-in-95");
      },
      onHide(instance) {
        const content = instance.popper.querySelector(".popover-content");
        content.classList.remove("animate-in", "fade-in-0", "zoom-in-95");
        content.classList.add("animate-out", "fade-out-0", "zoom-out-95");

        content.addEventListener(
          "animationend",
          () => {
            instance.unmount();
          },
          { once: true }
        );
      },
      plugins: [this.hideOnEsc],
    });
  }

  hideOnEsc = {
    name: "hideOnEsc",
    defaultValue: true,
    fn({ hide }) {
      function onKeyDown(event) {
        if (event.keyCode === 27) {
          hide();
        }
      }
      return {
        onShow() {
          document.addEventListener("keydown", onKeyDown);
        },
        onHide() {
          document.removeEventListener("keydown", onKeyDown);
        },
      };
    },
  };
}

customElements.define("ui-popover", UIPopover);
