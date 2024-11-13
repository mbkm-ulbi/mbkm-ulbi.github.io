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
              <div class="flex flex-col gap-4">
                <div>
                  ${item.applyStatus === "Diterima"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.applyStatus}</ui-badge>`
                    : item.applyStatus === "Perlu Ditinjau"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.applyStatus}</ui-badge>`
                    : item.applyStatus === "Ditolak"
                    ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.applyStatus}</ui-badge>`
                    : ""}
                </div>
                <ui-button data-dialog-trigger="tinjau-kandidat">TINJAU</ui-button>
                <ui-dialog name="tinjau-kandidat" className="p-0 w-[800px] h-[600px]">
                  <div class="flex flex-col">
                    <div class="p-4 flex justify-between items-center">
                      <div class="text-md font-bold">Tinjau Kandidat</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-gray-600" noobserver></iconify-icon></div>
                    </div>
                    <div class="border-t border-gray-300"></div>
                    <div class="p-4 space-y-4">
                      <div class="flex gap-3">
                        <img src=${item.profilePicture} height="[100px]" alt="image" />
                        <div>
                          <div class="font-semibold">${item.name}</div>
                          <div>NIM: 000000000123</div>
                        </div>
                      </div>
                      <div>
                        <div class="font-semibold">Program Studi</div>
                        <div class="ml-4">${item.studyProgramme}</div>
                      </div>
                      <div>
                        <div class="font-semibold">Semester</div>
                        <div class="ml-4">Semester 3</div>
                      </div>
                      <div>
                        <div class="font-semibold">No. Telepon</div>
                        <div class="ml-4">081234567890</div>
                      </div>
                      <div>
                        <div class="font-semibold">Alamat</div>
                        <div class="ml-4">Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                      </div>
                      <div class="w-full">
                        <fo-label label="File Upload"></fo-label>
                        <fo-uploaded fileurl="https://google.com" filename="filename.pdf" className="mb-2"></fo-uploaded>
                        <fo-error name="fileUpload"></fo-error>
                      </div>
                      <div class="w-full">
                        <fo-label label="File Upload"></fo-label>
                        <fo-uploaded fileurl="https://google.com" filename="filename.pdf" className="mb-2"></fo-uploaded>
                        <fo-error name="fileUpload"></fo-error>
                      </div>
                    </div>
                    <div class="border-t border-gray-300"></div>
                    <div class="p-4 flex justify-between items-center">
                      <ui-button data-dialog-close color="red" className="w-full">TOLAK</ui-button>
                      <ui-button color="green" className="w-full">SETUJUI</ui-button>
                    </div>
                  </div>
                </ui-dialog>
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
