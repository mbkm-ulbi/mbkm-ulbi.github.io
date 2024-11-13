import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { rekapLowonganMagangDummy, listLowonganMagangDummy } from "./dummyLowongan.js";
import { toMonetary } from "../src/js/libraries/utilities.js";

const fetchLowonganMagang = async () => {
  const rekap = await rekapLowonganMagangDummy();

  render(
    document.getElementById("rekapLowonganMagang"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:case-round-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Lowongan</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Diterima</div>
          <div class="text-xl font-bold">${rekap.diterima}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Ditinjau</div>
          <div class="text-xl font-bold">${rekap.ditinjau}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Ditolak</div>
          <div class="text-xl font-bold">${rekap.ditolak}</div>
        </div>
      </div>
    `
  );
};

const fetchListLowongan = async () => {
  const list = await listLowonganMagangDummy();

  render(document.getElementById("totalLowonganMagang"), html` Menampilkan ${toMonetary(list.length)} Lowongan `);

  render(
    document.getElementById("listLowonganMagang"),
    html`
      ${list.map(
        (item) => html`
          <div class="flex-none flex gap-2 rounded-lg border border-gray-300">
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
                  <div class="font-semibold">${item.applicants} Kandidat Mendaftar</div>
                </div>
                <div class="flex gap-2">
                  <ui-button variant="outline_orange" type="button" href="lowongan/kurasi">Detail</ui-button>
                  <ui-button color="orange" type="button" href="lowongan/kurasi">Tinjau</ui-button>
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
      <div class="flex-none h-[800px] flex flex-col rounded-md border border-gray-300 text-xs">
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
          <div>
            <ui-button data-dialog-trigger="data-lamaran" color="orange" type="button">Lamar</ui-button>
            <ui-dialog name="data-lamaran" className="w-[1000px] h-[2000px] p-0 overflow-auto">
              <div class="flex flex-col items-center gap-4">
                <div class="pb-2 p-4 w-full flex justify-between items-center border-b border-gray-300">
                  <div class="text-lg font-bold">Formulir Lamaran</div>
                  <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-gray-600" noobserver></iconify-icon></div>
                </div>
                <div class="px-4 w-full flex justify-between items-center">
                  <div class="h-[100px] w-[400px] flex gap-4 text-justify border border-gray-300 rounded-lg">
                    <img src="src/images/dummy_foto_kandidat.png" width="[100px]" alt="kandidat-image" />
                    <div class="pr-4 flex flex-col justify-evenly items-start">
                      <div class="text-md font-semibold">Darmaji Setiaji Ngahiji</div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:buildings-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>D3-Manajemen Bisnis</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:user-check-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>NIM: 000000000123</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:file-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>IPK: 3,5</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center"><img src="src/images/red_arrow.png" width="[100px]" alt="kandidat-image" /></div>
                  <div class="h-[100px] w-[400px] flex gap-4 text-justify border border-gray-300 rounded-lg">
                    <img src="src/images/dummy_pos_ind.png" alt="kandidat-image" />
                    <div class="pr-4 flex flex-col justify-evenly items-start">
                      <div class="text-md font-semibold">Global Finance Accounting Internship</div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:buildings-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>PT.Pos Indonesia</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:map-point-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>Bandung, Jawa Barat</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:calendar-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>Batas Akhir Pendaftaran: 06 September 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 w-full flex flex-col gap-4 justify-start items-center">
                  <div class="w-full">
                    <fo-label label="Email" className="text-sm text-gray-800"></fo-label>
                    <fo-input name="email" className="w-full" placeholder="darmaji@mail.com" disabled></fo-input>
                  </div>
                  <div class="w-full">
                    <fo-label label="No Telepon" className="text-sm text-gray-800"></fo-label>
                    <fo-input name="phone" className="w-full" placeholder="081234567890" disabled></fo-input>
                  </div>
                  <div class="w-full">
                    <fo-label label="Alamat" className="text-sm text-gray-800"></fo-label>
                    <fo-input
                      name="address"
                      className="w-full"
                      placeholder="Jl. Bersama Kamu Selamanya No.123, Kota Apa Saja, Jawa Utara 40000"
                      disabled
                    ></fo-input>
                  </div>
                </div>
                <div class="px-4 mb-4 w-full grid grid-cols-3 gap-4">
                  <div>
                    <fo-label label="Upload KTM"></fo-label>
                    <fo-file name="fileUpload" accept="application/pdf"></fo-file>
                    <fo-error name="fileUpload"></fo-error>
                  </div>
                  <div>
                    <fo-label label="Upload CV"></fo-label>
                    <fo-file name="fileUpload" accept="application/pdf"></fo-file>
                    <fo-error name="fileUpload"></fo-error>
                  </div>
                  <div>
                    <fo-label label="Upload Surat Lamaran"></fo-label>
                    <fo-file name="fileUpload" accept="application/pdf"></fo-file>
                    <fo-error name="fileUpload"></fo-error>
                  </div>
                </div>
                <div class="w-full border-b border-gray-300"></div>
                <div class="px-4 pb-4 w-full flex justify-between items-center gap-4">
                  <div class="w-full">
                    <ui-button color="red" data-dialog-close className="w-full">BATAL</ui-button>
                  </div>
                  <div class="w-full">
                    <ui-button data-dialog-trigger="pengajuan-berhasil" color="green" type="submit" className="w-full">KIRIM</ui-button>
                    <ui-dialog name="pengajuan-berhasil" className="w-[750px] h-[320px]">
                      <div class="flex flex-col text-center justify-center items-center gap-3">
                        <div class="text-lg font-bold">Lamaran Berhasil Diajukan</div>
                        <iconify-icon icon="solar:verified-check-bold-duotone" height="96" class="text-green-600" noobserver></iconify-icon>
                        <div class="text-sm font-semibold">Postingan Anda Akan Kami Tinjau Maksimal 7x24 Jam</div>
                        <div class="text-xs">
                          <p>Akun Perusahaan Anda Kini Dapat Melakukan Posting Lowongan Magang Pada Website MBKM ULBI</p>
                          <p>Silahkan Masuk Menggunakan Akun Yang Telah Anda Buat Untuk Melakukan Posting Lowongan Magang</p>
                        </div>
                        <div class="flex gap-3">
                          <ui-button data-dialog-close>SELESAI</ui-button>
                        </div>
                      </div>
                    </ui-dialog>
                  </div>
                </div>
              </div>
            </ui-dialog>
          </div>
        </div>
      </div>
    `
  );
};

const fetchDetailLowongan = async (id) => {
  // return await detailLowonganMagangDummy(id);
};
//-----------------

fetchLowonganMagang();
fetchListLowongan();

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
