import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapLaporanDummy } from "../kandidat/dummyKandidat.js";

const fetchLaporan = async () => {
  const rekap = await rekapLaporanDummy();

  render(
    document.getElementById("rekapLaporan"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:documents-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Laporan</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Laporan Selesai</div>
          <div class="text-xl font-bold">${rekap.laporanSelesai}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Laporan Berjalan</div>
          <div class="text-xl font-bold">${rekap.laporanBerjalan}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Laporan Perlu Ditinjau</div>
          <div class="text-xl font-bold">${rekap.laporanDitinjau}</div>
        </div>
      </div>
    `
  );
};

const fetchTabelLaporan = async () => {
  const list = await listKandidatDummy();

  render(
    document.getElementById("tabelLaporan"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.company}</td>
            <td>${item.position}</td>
            <td>${item.studyProgramme}</td>
            <td>${item.period}</td>
            <td>
              ${item.reportStatus === "Selesai"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.reportStatus}</ui-badge>`
                : item.reportStatus === "Perlu Ditinjau"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.reportStatus}</ui-badge>`
                : item.reportStatus === "Berjalan"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.reportStatus}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <ui-link href="laporan/laporanMagang"><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></ui-link>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

fetchLaporan();
fetchTabelLaporan();
