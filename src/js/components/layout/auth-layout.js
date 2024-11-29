import { cn } from "../../libraries/tailwind.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { slugUri } from "../../customs/settings.js";
import { removeAuth, getAuth, getUserInfo } from "../../libraries/cookies.js";
import { capitalizeEachWord } from "../../libraries/utilities.js";

/**
 * @element auth-layout
 */
class AuthLayout extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.childNodes);
    this.path = new URL(window.location.href).pathname.replace(slugUri, "/");
    this._state = {
      isMasterDataOpen: false, // State to track dropdown for "Master Data"
      listNavSidebar: [
        {
          name: "Beranda",
          href: `${slugUri}beranda/`,
          icon: "solar:home-smile-angle-bold",
          active: this.path.startsWith("/beranda/"),
        },
        {
          name: "Lowongan",
          href: `${slugUri}lowongan/`,
          icon: "solar:case-round-bold",
          active: this.path.startsWith("/lowongan/"),
        },
        {
          name: "Kandidat",
          href: `${slugUri}kandidat/`,
          icon: "solar:user-hands-bold",
          active: this.path.startsWith("/kandidat/"),
        },
        {
          name: "Penilaian",
          href: `${slugUri}penilaian/`,
          icon: "solar:medal-star-bold",
          active: this.path.startsWith("/penilaian/"),
        },
        {
          name: "Laporan",
          href: `${slugUri}laporan/`,
          icon: "solar:documents-bold",
          active: this.path.startsWith("/laporan/"),
        },
      ],
      userInfo: {}
    };
    this.state = new Proxy(this._state, {
      set: (target, key, value) => {
        target[key] = value;
        this.renderTemplate(); // Re-render on state change
        return true;
      },
    });
  }

  async connectedCallback() {
    const auth = await getUserInfo();
    if (auth.role === "superadmin") {
      //push new menu master data
      let arr = [...this.state.listNavSidebar]
      arr.push({
              name: "Master Data",
              href: `${slugUri}master-data/`,
              icon: "solar:database-bold",
              active: this.path.startsWith("/master-data/"),
              hasChildren: true,  
              children: [
                {
                    name: "Data User",
                    href: `${slugUri}master-data/user/`,
                    active: this.path.startsWith("/master-data/user/"),
                },
                {
                    name: "Data Role",
                    href: `${slugUri}master-data/role/`,
                    active: this.path.startsWith("/master-data/role/"),
                },
                {
                    name: "Data Lowongan",
                    href: `${slugUri}master-data/lowongan/`,
                    active: this.path.startsWith("/master-data/lowongan/"),
                },
                {
                    name: "Data Laporan",
                    href: `${slugUri}master-data/laporan/`,
                    active: this.path.startsWith("/master-data/laporan/"),
                },
                {
                    name: "Data Penilaian",
                    href: `${slugUri}master-data/penilaian/`,
                    active: this.path.startsWith("/master-data/penilaian/"),
                },
                {
                    name: "Data Artikel",
                    href: `${slugUri}master-data/artikel/`,
                    active: this.path.startsWith("/master-data/artikel/"),
                }]
            })
      this.state.listNavSidebar =  arr
    }
    console.log({wakww:auth})
    this.state.userInfo = auth
    this.renderTemplate();
    
  }

  toggleMasterDataDropdown() {
    this.state.isMasterDataOpen = !this.state.isMasterDataOpen;
    // this.renderTemplate();
  }

  handleLogout() {
    console.log("Logout clicked"); // Debugging: Pastikan fungsi dipanggil
    removeAuth(); // Menghapus cookie atau sesi
    console.log("Authentication removed"); // Debugging: Konfirmasi sesi dihapus
    window.location.href = "/login"; // Redirect ke halaman login
  }



  sidebarTemplate() {
    return html`
      <aside
        id="sidebar"
        class=${cn(
          "peer z-30 bg-white flex flex-col gap-1 overflow-y-auto border-r border-gray-200 shadow-lg text-sm overflow-x-clip duration-200 ease-in-out fixed h-screen xl:!w-[316px] xl:relative",
          "w-0 data-[open]:w-[316px]"
        )}
      >
        <div class="px-6 py-4 mt-2">
          <img src="src/images/logo_ulbi_header.png" alt="logo" class="block mx-auto h-[55px] shrink-0" />
          <div class="mt-6 border-t border-gray-200 border-dashed"></div>
        </div>
        <div class="px-6 flex items-center gap-2">
          <img src=${this.state.userInfo.user.profile_picture.preview} alt="avatar" class="block rounded-full h-[48px] shrink-0" />
          <div>
            <div class="font-semibold whitespace-nowrap">${this.state.userInfo?.user?.name}</div>
            <div class="text-gray-500 text-xs mt-1 whitespace-nowrap">${this.state.userInfo.user.program_study}</div>
          </div>
        </div>
        <nav class="px-6 grow flex flex-col gap-2 mt-4">
          ${this.state.listNavSidebar.map((item) =>
            item.hasChildren
              ? html`
                  <div class="flex flex-col">
                    <button
                      @click=${() => this.toggleMasterDataDropdown()}
                      class=${cn("group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ulbiBlue duration-200", item.active && "active bg-ulbiBlue")}
                    >
                      <iconify-icon
                        class="text-gray-600 group-hover:text-ulbiOrange group-[.active]:text-ulbiOrange duration-200"
                        icon=${item.icon}
                        width="24"
                        noobserver
                      ></iconify-icon>
                      <span class="text-gray-600 font-semibold group-hover:text-white group-[.active]:text-white duration-200">${item.name}</span>
                      <iconify-icon
                        icon="material-symbols:chevron-right-rounded"
                        class=${cn("ml-auto transition-transform duration-200", this?.state.isMasterDataOpen ? "rotate-90" : "")}
                      ></iconify-icon>
                    </button>
                    ${this?.state.isMasterDataOpen
                      ? html`
                          <div class="pl-8">
                            ${item.children.map(
                              (child) => html`
                                <a
                                  href=${child.href}
                                  class=${cn(
                                    "group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ulbiOrange duration-200",
                                    child.active && "active bg-ulbiOrange"
                                  )}
                                >
                                  <span class="text-gray-600 font-semibold group-hover:text-white group-[.active]:text-white duration-200">${child.name}</span>
                                </a>
                              `
                            )}
                          </div>
                        `
                      : ""}
                  </div>
                `
              : html`
                  <a
                    href=${item.href}
                    class=${cn("group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ulbiBlue duration-200", item.active && "active bg-ulbiBlue")}
                  >
                    <iconify-icon
                      class="text-gray-600 group-hover:text-ulbiOrange group-[.active]:text-ulbiOrange duration-200"
                      icon=${item.icon}
                      width="24"
                      noobserver
                    ></iconify-icon>
                    <span class="text-gray-600 font-semibold group-hover:text-white group-[.active]:text-white duration-200">${item.name}</span>
                  </a>
                `
          )}
        </nav>
        <div class="px-6 flex flex-col gap-2 mt-4">
          <button
            data-popover-trigger="popover-logout"
            class="flex items-center gap-2 px-2 py-2 rounded-lg bg-red-600 hover:bg-red-600/90 duration-200 focus:outline-none"
          >
            <iconify-icon class="text-white" icon="solar:logout-3-bold" width="24" noobserver></iconify-icon>
            <span class="text-white font-semibold">Logout</span>
          </button>
          <ui-popover name="popover-logout" trigger="click" placement="top" className="">
            <div class="text-sm">Mau keluar dari aplikasi ini?</div>
            <div class="flex items-center justify-end gap-2 mt-3">
              <ui-button className="px-3 text-xs" color="red" @click=${this.handleLogout}>Yes</ui-button>
              <ui-button className="px-3 text-xs" variant="outline_blue" data-popover-close>No</ui-button>
            </div>
          </ui-popover>

          <a
            href="pengaturan/"
            class=${cn(
              "group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ulbiBlue duration-200",
              this.path.startsWith("/pengaturan/") && "active bg-ulbiBlue"
            )}
          >
            <iconify-icon
              class="text-gray-600 group-hover:text-ulbiOrange group-[.active]:text-ulbiOrange duration-200"
              icon="solar:settings-bold"
              width="24"
              noobserver
            ></iconify-icon>
            <span class="text-gray-600 font-semibold group-hover:text-white group-[.active]:text-white duration-200">Pengaturan</span>
          </a>
          <a
            href="bantuan/"
            class=${cn(
              "group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-ulbiBlue duration-200",
              this.path.startsWith("/bantuan/") && "active bg-ulbiBlue"
            )}
          >
            <iconify-icon
              class="text-gray-600 group-hover:text-ulbiOrange group-[.active]:text-ulbiOrange duration-200"
              icon="solar:question-square-bold"
              width="24"
              noobserver
            ></iconify-icon>
            <span class="text-gray-600 font-semibold group-hover:text-white group-[.active]:text-white duration-200">Bantuan</span>
          </a>
        </div>
        <div class="px-6 my-4 pb-2">
          <div class="border-t border-gray-200 border-dashed"></div>
          <div class="mt-4 text-xs text-gray-400 whitespace-nowrap text-center">Versi 1.2.3 -beta | MBKM ULBI 2024</div>
        </div>
      </aside>
      <div
        id="sidebarOverlay"
        class="fixed duration-200 inset-0 transition-backdrop h-screen w-0 z-20 peer-data-[open]:block backdrop-blur-none peer-data-[open]:w-screen peer-data-[open]:backdrop-blur-sm xl:!hidden"
      ></div>
    `;
  }

  headerTemplate() {
    const path = new URL(window.location.href).pathname
      .replace(slugUri, "/")
      .split("/")
      .filter((item) => item.length > 0);

    return html`
      <header class="sticky z-10 top-0 h-24 bg-ulbiBlue text-white border-b-8 border-ulbiOrange flex items-center px-4 justify-between overflow-clip">
        <div class="flex items-center justify-center gap-4">
          <button id="sidebarMenu" class="xl:hidden text-white hover:text-white/80 duration-100 focus:outline-none flex items-center">
            <iconify-icon icon="pajamas:hamburger" width="20" noobserver></iconify-icon>
          </button>
          <div class="hidden sm:flex items-center gap-1 pl-4 pr-6 py-2 rounded-lg bg-white text-black text-xs font-semibold">
            <iconify-icon class="text-ulbiOrange" icon="solar:home-smile-angle-bold" width="20" noobserver></iconify-icon>
            ${path.map(
              (item) => html`
                <iconify-icon class="text-gray-400" icon="material-symbols:chevron-right-rounded" width="20" noobserver></iconify-icon>
                <div class="text-gray-600 whitespace-nowrap">${capitalizeEachWord(item)}</div>
              `
            )}
          </div>
        </div>
        <div>
          <button
            data-popover-trigger="popover-notification"
            class="flex items-center gap-2 px-2 py-2 rounded-lg bg-white hover:opacity-90 duration-200 focus:outline-none"
          >
            <iconify-icon class="text-ulbiOrange" icon="solar:bell-bold" width="20" noobserver></iconify-icon>
            <span class="font-semibold text-gray-800 text-xs">Notifikasi</span>
            <iconify-icon class="text-gray-800" icon="solar:alt-arrow-down-bold" width="16" noobserver></iconify-icon>
          </button>
          <ui-popover name="popover-notification" trigger="click" placement="bottom-end">
            <ul class="text-sm list-inside list-disc">
              <li>Notifikasi 1</li>
              <li>Notifikasi 2</li>
              <li>Notifikasi 3</li>
            </ul>
          </ui-popover>
        </div>
      </header>
    `;
  }

  renderTemplate() {
    render(
      this,
      html`
        <div class="grid xl:grid-cols-[fit-content(20ch),minmax(min(50vw,30ch),1fr)] h-screen">
          ${this.sidebarTemplate()}
          <div class="overflow-y-auto">
            ${this.headerTemplate()}
            <main class="mx-4 my-6">${this.content}</main>
          </div>
        </div>
      `
    );

    const sidebar = document.getElementById("sidebar");

    document.getElementById("sidebarMenu").addEventListener("click", () => {
      const isSidebarOpen = sidebar.hasAttribute("data-open");
      if (isSidebarOpen) sidebar.removeAttribute("data-open");
      else sidebar.setAttribute("data-open", "");
    });

    document.getElementById("sidebarOverlay").addEventListener("click", () => {
      const isSidebarOpen = sidebar.hasAttribute("data-open");
      if (isSidebarOpen) sidebar.removeAttribute("data-open");
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        const isSidebarOpen = sidebar.hasAttribute("data-open");
        if (isSidebarOpen) sidebar.removeAttribute("data-open");
      }
    });
  }
}

customElements.define("auth-layout", AuthLayout);
