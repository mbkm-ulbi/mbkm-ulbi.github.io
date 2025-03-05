import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapAktivitasDummy } from "../kandidat/dummyKandidat.js";
import { getAuth, getUserInfo } from "../src/js/libraries/cookies.js";
import API from "../src/js/api/index.js";
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'
import { toast } from "../src/js/libraries/notify.js";
import micromodal from "https://cdn.jsdelivr.net/npm/micromodal@0.4.10/+esm";

const fetchRekapAktivitas = async () => {
  const rekap = await rekapAktivitasDummy();

  render(
    document.getElementById("rekapAktivitas"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:medal-star-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Aktivitas</span>
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

const fetchTabelAktivitas = async (list) => {
  const auth = await getUserInfo();

  const handleDisetujui = async (id) => {
    await API.postMonthlyLogs(null, `/${id}/approve`)
      .then((res) => {
        toast.success("Berhasil menyetujui aktivitas");
        micromodal.close(`detail-aktivitas-` + id);
        fetchAktivitas();
      })
      .catch((err) => {
        toast.error("Gagal menyetujui aktivitas");
      });
  };

  const handleRevisi = async (id) => {
    await API.postMonthlyLogs(null, `/${id}/revision`)
      .then((res) => {
        toast.success("Berhasil revisi aktivitas");
        micromodal.close(`detail-aktivitas-` + id);
        fetchAktivitas();
      })
      .catch((err) => {
        toast.error("Gagal revisi aktivitas");
      });
  };

  render(
    document.getElementById("tabelAktivitas"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            ${(auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra") ?
              html`<td>${item?.apply_job?.users[0]?.name}</td>
              <td>${item?.apply_job?.users[0]?.program_study}</td>` : ''
              }
            <td>${moment(item.start_date).format('DD/MM/YYYY')}</td>
            <td>${moment(item.end_date).format('DD/MM/YYYY')}</td>
            <td>${item.content}</td>
            <td>
              ${item.status === "Disetujui"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                : item.status === "Draft"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                : item.status === "Revisi"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
              <a data-dialog-trigger=${`detail-aktivitas-` + item?.id}
                class="px-2 py-2 rounded-lg text-sm hover:bg-orange-100"
                ><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon
              ></a>
              ${(auth.role === "mahasiswa") ?
              html`<a
                class="px-2 py-2 rounded-lg text-sm hover:bg-orange-100"
                href=${`aktivitas/edit/index.html?id=${item?.id}`}>
                <iconify-icon icon="solar:pen-bold" class="text-orange-500" height="16"></iconify-icon>
              </a>` : ''
              }
              <ui-dialog name=${`detail-aktivitas-` + item?.id} className="w-[750px] h-auto p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Detail Aktivitas</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full flex gap-4 text-justify">
                      <img src=${item?.apply_job?.users[0]?.profile_picture?.url} class="w-[120px]" alt="kandidat-image" />
                      <div class="w-full">
                        <div class="pb-2 flex gap-28">
                          <div>
                            <div class="text-xs font-bold">Nama Lengkap</div>
                            <div class="text-lg font-bold">${item?.apply_job?.users[0]?.name}</div>
                          </div>
                        </div>
                        <div class="border-b border-dashed border-gray-300"></div>
                        <div class="pb-2 flex gap-16">
                          <div class="space-y-2">
                            <div class="pt-2 flex gap-4 text-xs">
                              <div class="font-bold space-y-2">
                                <div>NIM</div>
                                <div>Program Studi</div>
                              </div>
                              <div class="space-y-2">
                                <div>${item?.apply_job?.users[0]?.nim}</div>
                                <div>${item?.apply_job?.users[0]?.program_study}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="p-4 text-lg font-bold">Aktivitas</div>
                    <div class="px-4 flex gap-14">
                      <div>
                        <div class="pt-2 flex gap-16 text-xs">
                          <div class="font-bold space-y-2">
                            <div>Tanggal Mulai</div>
                            <div>Tanggal Selesai</div>
                            <div>Aktivitas</div>
                            <div>Status</div>
                          </div>
                          <div class="space-y-2">
                            <div>${moment(item.start_date).format('DD/MM/YYYY')}</div>
                            <div>${moment(item.end_date).format('DD/MM/YYYY')}</div>
                            <div>${item.content}</div>
                            <div>${item.status === "Disetujui"
                              ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                              : item.status === "Draft"
                              ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                              : item.status === "Revisi"
                              ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                              : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form id="lecturer-form">
                      <div class="p-4 flex justify-end gap-2">
                        ${item?.status == "Draft" && (auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen")
                        ? html`<div class="border-t border-gray-300"></div>
                            <div class="p-4 flex justify-between items-center">
                              <ui-button color="red" className="px-4 mx-2" onclick=${() => handleRevisi(item?.id)}>REVISI</ui-button>
                              <ui-button color="green" className="px-4 mx-2" onclick=${() => handleDisetujui(item?.id)}>SETUJUI</ui-button>
                            </div>`
                        : null}
                      </div>
                    </form>
                  </div>
                </ui-dialog>
            </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------


const renderAktivitas = (total) =>{
  const aktivitas = document.getElementById("content-aktivitas");
  render(
    aktivitas,
    html`
       <div class="space-y-4">
        <div class="px-4 py-4 space-y-4 rounded-md shadow-md">
          <div class="grid grid-cols-5 gap-2 text-xs">
            <div>
              <div class="mb-2 font-semibold">Nama</div>
              <fo-select>
                <option>Semua</option>
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
              <div class="mb-2 font-semibold">Status</div>
              <fo-select>
                <option>Semua</option>
                <option>Belum Dinilai</option>
                <option>Draft</option>
                <option>Sudah Dinilai</option>
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
                  <th>NAMA</th>
                  <th>PROGRAM STUDI</th>
                  <th>TGL MULAI</th>
                  <th>TGL SELESAI</th>
                  <th>AKTIVITAS</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
                </thead>
                <tbody id="tabelAktivitas">
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
          <div><ui-pagination data-pagination-count=${total} data-pagination-limit=${10} data-pagination-page=${1}/></div>
        </div>
      </div>
    `
  )
}
const renderAktivitasMahasiswa = async (data) =>{
  const aktivitas = document.getElementById("content-aktivitas");
  render(
    aktivitas,
    html`
    <div class="space-y-4">
      <div class="px-4 py-4 space-y-4 rounded-md shadow-md">
        <div class="flex justify-between items-center mb-4">
              <h1 class="text-xl font-semibold"></h1>
              <a class="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer" href="aktivitas/create">BUAT AKTIVITAS</a>
        </div>
        <div>
        <ui-table>
          <table>
            <thead>
              <tr>
                <th>TGL MULAI</th>
                <th>TGL SELESAI</th>
                <th>AKTIVITAS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody id="tabelAktivitas">
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
    </div>
  </div>
    `
  )
}
const renderNotEligible = () => {
  const contentLaporan = document.getElementById("content-aktivitas");
  render(
    contentLaporan,
    html`
       <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
           <div class="w-full p-1 flex gap-1 justify-center items-center flex-col">
           <img src="src/images/document.svg" class="w-[40rem]"></img>
           <div class="text-md mb-10">Belum ada aktivitas yang diberikan</div>
           <div class="flex justify-between items-center mb-4">
              <h1 class="text-xl font-semibold"></h1>
              <a class="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer" href="aktivitas/create">BUAT AKTIVITAS</a>
            </div>
           </div>
          </div>
        </div>
       </div>
    `
  )
}
const fetchAktivitas = async () => {
  const auth = await getUserInfo();

  await API.getMonthlyLogs()
  .then((res) => {
    const dataAktivitas = res?.data?.data || [];
    if (dataAktivitas.length > 0 && typeof dataAktivitas === "object") {
      fetchTabelAktivitas(dataAktivitas);
    }
  })
  .catch((err) => {
    console.error(err);
    toast.error("Gagal memuat data aktivitas");
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();

  if (auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra") {
    let dataEvaluation = [];
    let total = 0
    await API.getMonthlyLogs()
      .then((res) => {
        const dataAktivitas = res?.data?.data || [];
        if (dataAktivitas.length > 0 && typeof dataAktivitas === "object") {
          renderAktivitas(dataAktivitas);
          fetchTabelAktivitas(dataAktivitas);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat data aktivitas");
      });

    // Render awal
    renderAktivitas(null);
    // fetchRekapAktivitas();

    // Menangani pagination page change
    const pagination = document.querySelector("ui-pagination");
    if (pagination) {
      pagination.addEventListener("pagination-page-change", async (event) => {
        const { page } = event.detail; // Mendapatkan halaman baru dari event
        try {
          const res = await API.getMonthlyLogs(`?page=${page}&per_page=10`);
          const newData = res?.data?.data || [];
          fetchTabelAktivitas(newData); // Memperbarui tabel dengan data baru
        } catch (error) {
          console.error("Gagal memuat data aktivitas:", error);
          toast.error("Gagal memuat data aktivitas");
        }
      });
    }
  } else if (auth.role === "mahasiswa") {
    await API.getMonthlyLogs()
      .then((res) => {
        const dataAktivitas = res?.data?.data || [];
        if (dataAktivitas.length > 0 && typeof dataAktivitas === "object") {
          renderAktivitasMahasiswa(dataAktivitas);
          fetchTabelAktivitas(dataAktivitas);
        } else {
          renderNotEligible();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat data aktivitas");
      });
  }
});
