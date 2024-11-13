import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapPenilaianDummy } from "../kandidat/dummyKandidat.js";

const fetchPenilaian = async () => {
  const rekap = await rekapPenilaianDummy();

  render(
    document.getElementById("rekapPenilaian"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:medal-star-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Penilaian</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Sudah Dinilai</div>
          <div class="text-xl font-bold">${rekap.sudahDinilai}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Belum Dinilai</div>
          <div class="text-xl font-bold">${rekap.belumDinilai}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Draft</div>
          <div class="text-xl font-bold">${rekap.draft}</div>
        </div>
      </div>
    `
  );
};

const fetchTabelPenilaian = async () => {
  const list = await listKandidatDummy();

  render(
    document.getElementById("tabelPenilaian"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            <td>${item.applyTime}</td>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.company}</td>
            <td>${item.position}</td>
            <td>${item.studyProgramme}</td>
            <td>${item.score}</td>
            <td>
              ${item.assessment === "Sudah Dinilai"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.assessment}</ui-badge>`
                : item.assessment === "Draft"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.assessment}</ui-badge>`
                : item.assessment === "Belum Dinilai"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.assessment}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <a href="/penilaian/penilaianKandidat"><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></a>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

fetchPenilaian();
fetchTabelPenilaian();
