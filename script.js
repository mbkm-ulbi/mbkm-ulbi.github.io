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
                  ${item.status === "Available"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                    : item.status === "Pending"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                    : item.status === "Not Available"
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
                <div>Waktu: ${item.date}</div>
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
            <div class="text-xl font-semibold">${detail.title}</div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>${detail.company}</div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>Bandung, Jawa Barat</div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>Waktu: ${detail.date}</div>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto">
          <div>
            <img class="block mx-auto" src="src/images/dummy_aice.png" alt="image" />
          </div>
          <div class="space-y-3 m-3">
            <div>
              <fo-label label="Deskripsi Pekerjaan" className="text-sm text-gray-800"></fo-label>
                <div class="mt-5">
                <h1 class="text-2xl font-bold text-gray-800 mb-4">Universitas Logistik dan Bisnis Internasional</h1>
                <p class="text-gray-700 mb-6">
                  Bekerjasama dengan <strong>PT. Alpen Food Industry</strong>, menyelenggarakan <strong>campus hiring</strong> (recruitment on campus) pada:
                </p>
  
                <div class="space-y-2 mb-6">
                  <div class="flex items-center">
                    <span class="text-blue-500 mr-2">📅</span>
                    <span><strong>Tanggal:</strong> Kamis, 28 November 2024</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-blue-500 mr-2">🕙</span>
                    <span><strong>Waktu:</strong> 10.00 WIB – Selesai</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-blue-500 mr-2">📍</span>
                    <span> <strong>Lokasi:</strong> Auditorium Lt 2, Universitas Logistik dan Bisnis Internasional, Jl. Sarisah No.54 Bandung </span>
                  </div>
                </div>
  
                <h2 class="text-lg font-semibold text-gray-800 mb-3">Untuk:</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                  <li>Alumni ULBI</li>
                  <li>Mahasiswa/i tingkat akhir</li>
                  <li>Calon wisudawan ULBI</li>
                  <li>Terbuka untuk umum (<em>Gratis</em>)</li>
                </ul>
  
                <h2 class="text-lg font-semibold text-gray-800 mb-3">Agenda:</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                  <li>Presentasi dari perusahaan</li>
                  <li>Psikotest/Interview</li>
                </ul>
  
                <h2 class="text-lg font-semibold text-gray-800 mb-3">Catatan:</h2>
                <p class="text-gray-700 mb-4">Pelaksanaan campus hiring, harap membawa:</p>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                  <li>Alat tulis</li>
                  <li>Berpakaian rapi dan formal</li>
                </ul>
  
                <p class="text-gray-700 mb-4">
                  Daftar melalui form berikut ini:
                  <a href="https://bit.ly/registrasi_campushiring_aice" class="text-blue-600 underline" target="_blank">
                    https://bit.ly/registrasi_campushiring_aice
                  </a>
                </p>
              </div>
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
