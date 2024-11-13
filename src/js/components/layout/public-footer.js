import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element public-footer
 */
class PublicFooter extends HTMLElement {
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
        <footer class="bg-ulbiBlack text-white text-xs">
          <div class="grid sm:grid-cols-3 gap-x-10 gap-y-3 mx-auto max-w-[90dvw] 2xl:max-w-7xl py-12">
            <div class="space-y-4 self-center">
              <img src="src/images/logo_ulbi_footer.png" alt="logo" />
              <p class="tracking-wider">
                ULBI adalah institusi pendidikan tinggi yang didirikan oleh Yayasan Pendidikan Bhakti Pos Indonesia (YPBPI), ULBI memiliki visi menjadi
                perguruan tinggi vokasi yang unggul secara Nasional dalam bidang Logistik dan Manajemen Rantai Pasok
              </p>
              <div class="flex flex-row gap-3">
                <a href="https://www.facebook.com/ulbi.official" class="hover:opacity-80 duration-150">
                  <iconify-icon icon="ic:baseline-facebook" height="22" noobserver></iconify-icon>
                </a>
                <a href="https://twitter.com/Official_ULBI" class="hover:opacity-80 duration-150">
                  <iconify-icon icon="mdi:twitter" height="22" noobserver></iconify-icon>
                </a>
                <a href="https://youtube.com/@ADMISSIONULBI" class="hover:opacity-80 duration-150">
                  <iconify-icon icon="mdi:youtube" height="22" noobserver></iconify-icon>
                </a>
                <a href="https://www.instagram.com/ulbi.official/" class="hover:opacity-80 duration-150">
                  <iconify-icon icon="mdi:instagram" height="22" noobserver></iconify-icon>
                </a>
                <a href="https://www.tiktok.com/@kampus.ulbi" class="hover:opacity-80 duration-150">
                  <iconify-icon icon="ic:baseline-tiktok" height="22" noobserver></iconify-icon>
                </a>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-lg font-semibold">Lokasi</span>
              <span>Yayasan Pendidikan Bhakti Pos Indonesia (YPBPI)</span>
              <span>Jalan Sariasih No. 54 Sarijadi Bandung, 40151, Jawa Barat Indonesia</span>
              <span class="text-lg font-semibold">Kontak</span>
              <a href="tel:+62 22 200 9562" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Sekretariat
              </a>
              <a href="tel:+62 813 1234 0362" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> HUMAS
              </a>
              <a href="tel:+62 811 2267 778" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Admission
              </a>
              <span class="text-lg font-semibold">Email</span>
              <a href="mailto:info@ulbi.ac.id" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> info@ulbi.ac.id
              </a>
              <a href="mailto:humas@ulbi.ac.id" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> humas@ulbi.ac.id
              </a>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-lg font-semibold">Link Terkait</span>
              <a href="https://admission.ulbi.ac.id/" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Penerimaan Mahasiswa Baru (Admission)
              </a>
              <a href="https://sip.ulbi.ac.id/" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Sistem Informasi Akademik (SIP)
              </a>
              <a href="#" target="_blank" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Sistem Informasi Sumberdaya Terintegrasi
              </a>
              <a href="https://endowment.ulbi.ac.id/" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Endowment
              </a>
              <a href="https://infokost.ulbi.ac.id/" class="hover:opacity-80 duration-150">
                <iconify-icon icon="formkit:arrowright" height="9" noobserver></iconify-icon> Asrama Kampus dan Kost
              </a>
            </div>
          </div>
          <div class="p-2 w-full flex bg-ulbiOrange text-white text-sm justify-center items-center whitespace-nowrap overflow-clip">
            © 2024 ‧ Universitas Logistik dan Bisnis Internasional (ULBI). All rights reserved.
          </div>
        </footer>
      `
    );
  }
}

customElements.define("public-footer", PublicFooter);
