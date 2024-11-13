import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listArtikelDummy, listLowonganMagangDummy } from "./dummyLanding.js";
import { toMonetary } from "./src/js/libraries/utilities.js";

const fetchListLowongan = async () => {
  const list = await listLowonganMagangDummy();

  render(document.getElementById("totalLowonganMagang"), html` Total: ${toMonetary(list.length)} Lowongan Magang `);

  render(
    document.getElementById("listLowonganMagang"),
    html`
      ${list.map(
        (item) => html`
          <div class="flex-none flex gap-3 rounded-lg border border-gray-300">
            <div class="w-[120px] flex overflow-hidden rounded-l-lg">
              <img class="object-center object-contain" src=${item.picture} height="[100px]" alt="image" />
            </div>
            <div class="p-4 flex flex-col gap-2 text-xs">
              <div class="flex justify-between items-center">
                <div>Diposting 2 Hari Yang Lalu</div>
                <div>
                  ${item.status === "Aktif"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                    : item.status === "Perlu Ditinjau"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                    : item.status === "Ditolak"
                    ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                    : ""}
                </div>
              </div>
              <div class="text-sm font-semibold">${item.title}</div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>${item.company}</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>${item.location}</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>Batas Akhir Pendaftaran: ${item.date}</div>
              </div>
              <div class="flex justify-between items-center gap-2">
                <div class="flex justify-start items-center gap-2">
                  <iconify-icon icon="solar:user-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                  <div class="text-sm font-semibold">${item.applicants} Kandidat Mendaftar</div>
                </div>
                <div class="flex gap-2">
                  <ui-button variant="outline_orange" type="button" href="">Simpan</ui-button>
                  <ui-button color="orange" type="button" href="">Detail</ui-button>
                </div>
              </div>
            </div>
          </div>
        `
      )}
    `
  );

  // render default from list
  const detail = list[0];

  render(
    document.getElementById("detailLowonganMagang"),
    html`
      <div class="flex-none h-[500px] flex flex-col rounded-md border border-gray-300 text-xs">
        <div class="pt-4 px-4 flex justify-between items-center">
          <div>Diposting 2 Hari Yang Lalu</div>
          <div><ui-badge className="bg-green-600/25 text-green-600" dot>Aktif</ui-badge></div>
        </div>
        <div class="flex border-b border-gray-300">
          <div class="pl-2 w-[120px] flex overflow-hidden rounded-l-lg">
            <img class="object-center object-contain" src=${detail.picture} height="[100px]" alt="image" />
          </div>
          <div class="p-4 flex flex-col gap-1">
            <div class="text-xl font-semibold">Global Finance Accounting Internship</div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>PT. Pos Indonesia</div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>Bandung, Jawa Barat</div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>Batas Akhir Pendaftaran: 6 September 2024</div>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto">
          <div>
            <img class="block mx-auto" src="src/images/dummy_poster.png" alt="image" />
          </div>
          <div class="space-y-3 m-3">
            <div>
              <fo-label label="Deskripsi Pekerjaan" className="text-sm text-gray-800"></fo-label>
              <p class="mx-4">
                As a Global Finance & Accounting Intern at EIGER, your mission is to support our finance and accounting team in various functions, including
                financial analysis, reporting, and compliance. You will gain practical experience in managing financial data, contributing to budgeting
                processes, and ensuring accurate financial records. This internship offers a unique opportunity to develop your skills and knowledge in a global
                retail environment, preparing you for a successful career in finance and accounting. What you'll need to Success: Final semester students or
                recently completed a degree in accounting or a related field. Strong analytical skills with the ability to interpret financial data. Someone who
                is confident, proactive attitude, enthusiasm for learning and communicative in conveying something orally or in writing Work placement at the
                Head Office of Kab. Bandung West Java. Interest in the retail industry and EIGER's brand. Kompetensi yang akan dikembangkan Administrasi
                Komunikasi Analisis Data Kerjasama Tim Pengelolaan Waktu Pemahaman Lingkungan Bisnis Problem Solving Analisis Keuangan Keahlian Teknologi
                Kemampuan Beradaptasi Operasional Kriteria Akademik Mahasiswa perguruan tinggi aktif minimal semester 6 Program studi yang diutamakan: Akuntansi
                dan Perpajakan Ekonomi
              </p>
            </div>
            <div>
              <fo-label label="Durasi" className="text-sm text-gray-800"></fo-label>
              <p class="mx-4">3 bulan</p>
            </div>
            <div>
              <fo-label label="Jenis Pekerjaan" className="text-sm text-gray-800"></fo-label>
              <p class="mx-4">Fulltime</p>
            </div>
            <div>
              <fo-label label="Benefit Yang Ditawarkan" className="text-sm text-gray-800"></fo-label>
              <p class="mx-4">Gaji pokok per bulan, tunjangan kesehatan</p>
            </div>
            <div>
              <fo-label label="Tipe Lowongan" className="text-sm text-gray-800"></fo-label>
              <p class="mx-4">Umum</p>
            </div>
          </div>
        </div>
        <div class="p-4 flex flex-wrap justify-between border-t border-gray-300">
          <div><ui-button variant="outline_orange" type="button" href="">Simpan</ui-button></div>
          <div><ui-button color="orange" type="button" href="">Daftar</ui-button></div>
        </div>
      </div>
    `
  );
};

const fetchDetailLowongan = async (id) => {
  // return await detailLowonganMagangDummy(id);
};

const fetchArticle = async () => {
  const list = await listArtikelDummy();

  render(
    document.getElementById("listArtikel"),
    html`
      ${list.map(
        (item) => html`
          <div class="w-[450px] flex flex-col gap-2 border border-gray-300 rounded-lg">
            <div><img class="rounded-t-lg overflow-hidden w-[450px]" src=${item.picture} alt="post" /></div>
            <div class="p-4 flex flex-col gap-3">
              <div class="text-xs">Dipublikasikan oleh <span class="font-bold">${item.author} | 6 September 2024 </span></div>
              <div class="text-xl text-blue-800 font-bold">${item.title}</div>
              <div class="text-md">${item.content}</div>
              <div class="flex justify-between items-center">
                <ui-button color="orange" type="button" href="" className="text-xs font-medium">
                  Read more <iconify-icon icon="formkit:arrowright" height="15" noobserver></iconify-icon>
                </ui-button>
                <div class="flex items-center gap-2">
                  <iconify-icon icon="solar:eye-bold" height="12" noobserver></iconify-icon>
                  <span class="text-xs">Dilihat <span class="font-bold">${item.views}</span> kali</span>
                </div>
              </div>
            </div>
          </div>
        `
      )}
    `
  );
};

// -----------------------------------

fetchListLowongan();
fetchArticle();

const filter = {
  keyword: "",
  periode: "",
  perusahaan: "",
  mataKuliah: "",
  kategori: [],
  status: "",
};

// filter form
const form = document.querySelector("#filter-form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

// show/hide filter

document.addEventListener("DOMContentLoaded", function () {
  const filterSection = document.getElementById("filter-section");
  const toggleButton = document.getElementById("toggle-filter");
  const icon = toggleButton.querySelector("iconify-icon");
  const toggleText = document.getElementById("toggle-text");

  // Handle toggle visibility of the filter section
  toggleButton.addEventListener("click", function () {
    if (filterSection.classList.contains("hidden")) {
      filterSection.classList.remove("hidden");
      toggleText.textContent = "Tutup Filter";
      icon.setAttribute("icon", "solar:alt-arrow-up-outline");
    } else {
      filterSection.classList.add("hidden");
      toggleText.textContent = "Tampilkan Filter";
      icon.setAttribute("icon", "solar:alt-arrow-down-outline");
    }
  });
});
