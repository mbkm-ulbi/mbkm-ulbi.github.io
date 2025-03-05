import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element public-header
 */
class PublicHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.renderTemplate();
  }

  renderTemplate() {
    render(
      this,
      html`
        <header>
          <div class="p-2 w-full flex bg-ulbiOrangeBeranda text-white text-sm gap-6 justify-center items-center whitespace-nowrap overflow-clip">
            <span>+62821 2000 2716</span>
            <span>+62813 1111 0194</span>
            <span>info@ulbi.ac.id</span>
            <span>Jl. Sariasih No.54, Sarijadi, Sukasari, Kota Bandung</span>
          </div>
          <div class="h-[80px] w-full flex gap-6 justify-evenly items-center shadow-sm">
            <div class="flex gap-6 items-center">
              <a href="" class="hover:opacity-90 duration-150">
                <img width="${150}" src="src/images/logo_ulbi_header.png" alt="logo" />
              </a>
            </div>
            <div class="flex gap-6">
              <ui-button variant="outline_blue" href="register_student/">Register Mahasiswa</ui-button>
              <ui-button variant="outline_blue" href="register_company/">Register Employer</ui-button>
              <a
                href="login/"
                class="px-8 py-2 text-sm text-white font-semibold flex items-center justify-center rounded-md transition-colors duration-150 border border-orange-400 bg-orange-400 hover:bg-orange-400/90"
              >
                Login
              </a>
            </div>
          </div>
        </header>
      `
    );
  }
}

customElements.define("public-header", PublicHeader);
