import { slugUri } from "../../customs/settings.js";
import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element ui-button
 *
 * @attr {"button" | "submit"} [type] - Menentukan tipe tombol.
 * @attr {boolean} [disabled] - Menonaktifkan tombol jika diberikan.
 * @attr {string} [className] - Kelas tambahan untuk kustomisasi.
 * @attr {"default" | "outline_orange" | "outline_blue" | "ghost"} [variant] - Menentukan gaya varian tombol.
 * @attr {"default" | "red" | "orange" |"green" | "yellow" | "gray" | "muted"} [color] - Menentukan warna tombol.
 * @attr {"default" | "full" |"icon"} [size] - Menentukan ukuran tombol.
 * @attr {string} [href] - URL yang dituju saat tombol diklik.
 */
class UIButton extends HTMLElement {
  constructor() {
    super();
    this.component = null;
    this.content = Array.from(this.childNodes);
  }

  connectedCallback() {
    this.renderTemplate();
    this.component = this.querySelector("button");
    this.component.addEventListener("click", this.handleClick.bind(this));
  }

  static get observedAttributes() {
    return ["disabled", "type", "variant", "color", "size", "className"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.component || oldValue === newValue) return;
    this.renderTemplate();
  }

  handleClick() {
    const href = this.getAttribute("href");
    if (href) window.location.assign(`${slugUri}${href}`);
  }

  renderTemplate() {
    const variant = this.getAttribute("variant") || "default";
    const color = this.getAttribute("color") || "default";
    const size = this.getAttribute("size") || "default";

    render(
      this,
      html`
        <button
          ?disabled=${this.hasAttribute("disabled")}
          type=${this.getAttribute("type") || "button"}
          class=${cn(
            "flex items-center justify-center rounded-md text-sm font-semibold transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50",
            {
              // Variasi varian
              "border border-blue-700/80 hover:border-blue-600/60 focus-visible:ring-blue-600/80 hover:bg-blue-600 text-white bg-blue-800":
                variant === "default",
              "border border-orange-600/60 hover:border-orange-400 focus-visible:ring-orange-400 bg-white text-orange-600 hover:text-orange-800":
                variant === "outline_orange",
              "border border-red-600/60 hover:border-red-400 focus-visible:ring-red-400 bg-white text-red-600 hover:text-red-800": variant === "outline_red",
              "border border-blue-800/60 hover:border-blue-800 focus-visible:ring-blue-800 bg-white text-blue-800 hover:text-blue-800":
                variant === "outline_blue",
              "text-blue-600 hover:text-blue-800 focus-visible:ring-white/20": variant === "ghost",
            },
            {
              // Variasi warna
              "border-red-600/60 hover:border-red-400 focus-visible:ring-red-500 bg-red-600 hover:bg-red-700": color === "red",
              "border-orange-400/60 hover:border-orange-400 focus-visible:ring-orange-400 bg-orange-400 hover:bg-orange-400": color === "orange",
              "border-green-600/60 hover:border-green-400 focus-visible:ring-green-500 bg-green-600 hover:bg-green-700": color === "green",
              "border-yellow-500/60 hover:border-yellow-400 focus-visible:ring-yellow-500 bg-yellow-500 hover:bg-yellow-600": color === "yellow",
              "border-gray-600/60 hover:border-gray-400 focus-visible:ring-gray-500 bg-gray-600 hover:bg-gray-700": color === "gray",
              "border-muted/60 hover:border-muted/40 focus-visible:ring-muted/50 bg-gray-600/20 text-muted-foreground hover:text-muted-foreground/80":
                color === "muted",
            },
            {
              // Variasi ukuran
              "px-8 py-2 text-sm": size === "default",
              "px-[100%] py-2 text-sm": size === "full",
              "h-9 w-9": size === "icon",
            },
            // Jika tombol dinonaktifkan
            "disabled:cursor-not-allowed disabled:bg-gray-500",
            this.getAttribute("className") // Kelas tambahan dari atribut "className"
          )}
        >
          ${this.content}
        </button>
      `
    );
  }
}

customElements.define("ui-button", UIButton);
