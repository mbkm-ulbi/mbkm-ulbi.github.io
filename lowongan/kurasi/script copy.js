import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy } from "/kandidat/dummyKandidat.js";
import { toMonetary } from "../../src/js/libraries/utilities.js";

const fetchKandidat = async () => {
  const kandidat = await listKandidatDummy();
  console.log(kandidat);

  render(document.getElementById("totalKandidat"), html` ${toMonetary(kandidat.length)} Kandidat `);

  render(
    document.getElementById("listKandidat"),
    html`
      ${kandidat.map((item) => {
        return html`
          <div class="p-4 flex-none flex gap-2 rounded-lg border border-gray-300">
            <div class="flex gap-3">
              <div class="flex justify-start items-center gap-3">
                <div class="w-[48px] flex overflow-hidden rounded-full">
                  <img class="object-center object-contain" src=${item.profilePicture} height="[100px]" alt="image" />
                </div>
                <div>
                  <div class="font-semibold">${item.name}</div>
                  <div>Program Studi: ${item.studyProgramme}</div>
                  <div>Tanggal Melamar: ${item.applyTime}</div>
                </div>
              </div>
              <div>
                ${item.applyStatus === "Diterima"
                  ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.applyStatus}</ui-badge>`
                  : item.applyStatus === "Ditinjau"
                  ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.applyStatus}</ui-badge>`
                  : item.applyStatus === "Ditolak"
                  ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.applyStatus}</ui-badge>`
                  : ""}
              </div>
            </div>
          </div>
        `;
      })}
    `
  );
};

//-----------------

fetchKandidat();
