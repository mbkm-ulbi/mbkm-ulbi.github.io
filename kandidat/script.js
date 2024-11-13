import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapKandidatDummy } from "./dummyKandidat.js";

const fetchKandidat = async () => {
  const rekap = await rekapKandidatDummy();

  render(
    document.getElementById("rekapJumlahKandidat"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:user-hands-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Kandidat</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Aktif Magang</div>
          <div class="text-xl font-bold">${rekap.aktifMagang}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Pelamar Magang</div>
          <div class="text-xl font-bold">${rekap.pelamarMagang}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Aktif Kerja</div>
          <div class="text-xl font-bold">${rekap.aktifKerja}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Aktif Kerja</div>
          <div class="text-xl font-bold">${rekap.pelamarKerja}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Selesai</div>
          <div class="text-xl font-bold">${rekap.selesai}</div>
        </div>
      </div>
    `
  );
};

const fetchTabelKandidat = async () => {
  const list = await listKandidatDummy();

  render(
    document.getElementById("tabelKandidat"),
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
            <td>
              ${item.currentStatus === "Aktif"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.currentStatus}</ui-badge>`
                : item.currentStatus === "Melamar"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.currentStatus}</ui-badge>`
                : item.currentStatus === "Selesai"
                ? html`<ui-badge class="bg-gray-600/25 text-gray-600" dot>${item.currentStatus}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <a data-dialog-trigger="detail-kandidat"><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></a>
                <ui-dialog name="detail-kandidat" className="w-[750px] h-[450px] p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Detail Kandidat</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full flex gap-4 text-justify">
                      <img src="src/images/dummy_foto_kandidat.png" width="[250px]" alt="kandidat-image" />
                      <div class="w-full">
                        <div class="pb-2 flex gap-28">
                          <div>
                            <div class="text-xs font-bold">Nama Lengkap</div>
                            <div class="text-lg font-bold">Darmaji Setiaji Ngahiji</div>
                          </div>
                          <div>
                            <div class="text-xs font-bold">NIM</div>
                            <div class="text-xs">000000000123</div>
                          </div>
                        </div>
                        <div class="border-b border-dashed border-gray-300"></div>
                        <div class="pb-2 flex gap-16">
                          <div class="space-y-2">
                            <div class="pt-2 flex gap-4 text-xs">
                              <div class="font-bold space-y-2">
                                <div>Telepon</div>
                                <div>Prodi</div>
                              </div>
                              <div class="space-y-2">
                                <div>08123456789</div>
                                <div>D3-Manajemen Bisnis</div>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2 flex gap-4 text-xs">
                            <div class="font-bold space-y-2">
                              <div>Email</div>
                              <div>IPK</div>
                            </div>
                            <div class="space-y-2">
                              <div>darmaji@mail.com</div>
                              <div>3.5</div>
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-4">
                          <div class="font-bold">Alamat</div>
                          <div>Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                        </div>
                      </div>
                    </div>

                    <div class="p-4 text-lg font-bold">Melamar Magang</div>
                    <div class="px-4 flex gap-14">
                      <div>
                        <div class="pt-2 flex gap-16 text-xs">
                          <div class="font-bold space-y-2">
                            <div>Perusahaan</div>
                            <div>Tanggal</div>
                          </div>
                          <div class="space-y-2">
                            <div>PT. Pos Indonesia</div>
                            <div>24 September 2024 - 14:35</div>
                          </div>
                        </div>
                      </div>
                      <div class="pt-2 flex gap-16 text-xs">
                        <div class="font-bold space-y-2">
                          <div>Posisi</div>
                          <div>Masa Kerja</div>
                        </div>
                        <div class="space-y-2">
                          <div>Staf Admin</div>
                          <div>3 Bulan</div>
                        </div>
                      </div>
                    </div>
                    <div class="p-4 flex gap-4">
                      <div class="font-bold">Alamat</div>
                      <div>Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                    </div>
                    <div class="p-4 flex justify-between">
                      <div class="flex gap-4">
                        <ui-button color="orange" className="w-max flex gap-2">
                          <iconify-icon icon="solar:letter-opened-bold" height="22" class="text-white" noobserver></iconify-icon>
                          KIRIM EMAIL</ui-button
                        >
                        <ui-button color="green" className="w-max flex gap-2">
                          <iconify-icon icon="ic:baseline-whatsapp" height="22" class="text-white" noobserver></iconify-icon>
                          HUBUNGI</ui-button
                        >
                      </div>
                      <ui-button className="w-max flex gap-2" data-dialog-close> SELESAIKAN MASA KERJA</ui-button>
                    </div>
                  </div>
                </ui-dialog>
              </div>
              <div><iconify-icon icon="solar:download-square-bold" class="text-blue-900" height="16"></iconify-icon></div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

fetchKandidat();
fetchTabelKandidat();
