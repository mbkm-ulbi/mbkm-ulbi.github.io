import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapKandidatDummy } from "./dummyKandidat.js";
import { getAuth } from "../src/js/libraries/cookies.js";

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
                    <div class="p-4 flex justify-end">
                      
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

const renderKandidatAdmin = () =>{
  const contentKandidat = document.getElementById("content-kandidat");
  render(
    contentKandidat,
    html`
          <div class="space-y-4">
        <div class="px-12 py-4 rounded-md shadow-md">
          <div id="rekapJumlahKandidat" class="flex justify-between">
            <div class="flex items-center gap-2">
              <iconify-icon icon="solar:user-hands-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <span class="text-lg text-ulbiBlue font-bold">Kandidat</span>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Total</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Aktif Magang</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Pelamar Magang</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Aktif Kerja</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Pelamar Kerja</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Selesai</div>
              <div class="text-xl font-bold">...</div>
            </div>
          </div>
        </div>
        <div class="px-4 py-4 space-y-4 rounded-md shadow-md">
          <div class="grid grid-cols-6 gap-2 text-xs">
            <div>
              <div class="mb-2 font-semibold">Nama</div>
              <fo-select>
                <option>Semua</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Perusahaan</div>
              <fo-select>
                <option>Semua</option>
                <option>ULBI</option>
                <option>PT. Pos Indonesia</option>
                <option>Bank Negara Indonesia</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Tipe</div>
              <fo-select>
                <option>Semua</option>
                <option>Magang</option>
                <option>Kerja</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Prodi</div>
              <fo-select>
                <option>Semua</option>
                <option>D3-Akuntansi</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Status</div>
              <fo-select>
                <option>Semua</option>
                <option>Aktif</option>
                <option>Melamar</option>
                <option>Selesai</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Tanggal</div>
              <fo-select>
                <option>Terbaru</option>
              </fo-select>
            </div>
          </div>
          <div>
            <ui-table>
              <table>
                <thead>
                  <tr>
                    <th>TANGGAL</th>
                    <th>NAMA</th>
                    <th>TIPE</th>
                    <th>PERUSAHAAN</th>
                    <th>POSISI</th>
                    <th>PRODI</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="tabelKandidat">
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </ui-table>
          </div>
          <div><ui-pagination /></div>
        </div>
      </div>
    `
  )
}


const renderKandidatMahasiswa = () =>{
  const contentKandidat = document.getElementById("content-kandidat");

  console.log(contentKandidat);
  render(
    contentKandidat,
    html`
     <div class="space-y-4">
      <div class="rounded-md shadow-md">
        <div class="flex flex-col text-center justify-center items-center gap-4">
          <div class="pb-2 w-full flex justify-start items-center border-b border-gray-300">
            <div class="test-md p-4 font-bold">Kandidat</div>
          </div>
          <div class="w-full p-4 flex gap-4 text-justify border-b border-dashed border-gray-300">
            <img src="src/images/dummy_foto_kandidat.png" width="[250px]" alt="kandidat-image" />
            <div class="w-full">
              <div class="pb-2 flex gap-96">
                <div>
                  <div class="text-xs font-bold">Nama Lengkap</div>
                  <div class="text-md font-bold">Darmaji Setiaji Ngahiji</div>
                </div>
                <div>
                  <div class="text-xs font-bold">NIM</div>
                  <div class="text-xs">000000000123</div>
                </div>
              </div>
              <div class="border-b border-dashed border-gray-300"></div>
              <div class="pb-2 flex gap-14">
                <div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Telepon</div>
                      <div>Prodi</div>
                      <div>Alamat</div>
                    </div>
                    <div class="space-y-2">
                      <div>08123456789</div>
                      <div>D3-Manajemen Bisnis</div>
                      <div>Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 flex gap-16 text-xs">
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
            </div>
          </div>
          <div class="w-full p-4 text-justify border-b border-dashed border-gray-300">
            <div class="test-md p-2 font-bold">Melamar Magang</div>
            <div class="pb-2 flex gap-5 ">
              <div>
                <img src="src/images/dummy_pos_ind.png" style="height: 80px;" />
              </div>
              <div class="mr-10">
                <div class="pt-2 flex gap-16 text-xs">
                  <div class="font-bold space-y-2">
                    <div>Telepon</div>
                    <div>Prodi</div>
                    <div>Alamat</div>
                  </div>
                  <div class="space-y-2">
                    <div>08123456789</div>
                    <div>D3-Manajemen Bisnis</div>
                    <div>Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                  </div>
                </div>
              </div>
              <div class="pt-2 flex gap-16 text-xs">
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
          </div>
          <div class="w-full p-4 text-justify mb-5">
            <div class="test-md p-2 font-bold">Selesai Magang</div>
            <div class="pb-2 flex gap-5 ">
              <div>
                <img src="src/images/dummy_pos_ind.png" style="height: 80px;" />
              </div>
              <div class="mr-10">
                <div class="pt-2 flex gap-16 text-xs">
                  <div class="font-bold space-y-2">
                    <div>Telepon</div>
                    <div>Prodi</div>
                    <div>Alamat</div>
                  </div>
                  <div class="space-y-2">
                    <div>08123456789</div>
                    <div>D3-Manajemen Bisnis</div>
                    <div>Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                  </div>
                </div>
              </div>
              <div class="pt-2 flex gap-16 text-xs">
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
          </div>
        </div>
      </div>
    </div>
    `
  )
}
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getAuth();
  const parseAuth = JSON.parse(auth);
  if(parseAuth.role === "mahasiswa"){
    renderKandidatMahasiswa();
  } else {
    renderKandidatAdmin();
    fetchKandidat();
    fetchTabelKandidat();
  }
});