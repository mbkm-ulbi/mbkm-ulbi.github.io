import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapLaporanDummy } from "../kandidat/dummyKandidat.js";
import { getAuth, getUserInfo } from "../src/js/libraries/cookies.js";
import API from "../src/js/api/index.js";
import { toast } from "../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";

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

const fetchTabelLaporan = async (list) => {
  render(
    document.getElementById("tabelLaporan"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            <td>${item.apply_job.users[0]?.name}</td>
            <td>${item.apply_job?.jobs[0]?.job_type}</td>
            <td>${item.apply_job?.jobs[0]?.company}</td>
            <td>${item.apply_job?.jobs[0]?.title}</td>
            <td>${item.apply_jobs?.jobs[0]?.duration}</td>
            <td>
              ${item.status === "Selesai"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                : item.status === "Pending" || item.status === "Draft"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                : item.status === "Berjalan"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <ui-link href=${`laporan/approve/index.html?id=${item.apply_job_id}`}
                  ><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon
                ></ui-link>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

const renderLaporan = (total) => {
  const contentLaporan = document.getElementById("content-laporan");
  render(
    contentLaporan,
    html`
      <div class="space-y-4">
        <div class="px-12 py-4 rounded-md shadow-md">
          <div id="rekapLaporan" class="flex justify-between">
            <div class="flex items-center gap-2">
              <iconify-icon icon="solar:documents-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <span class="text-lg text-ulbiBlue font-bold">Laporan</span>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Total</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Laporan Selesai</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Laporan Berjalan</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Laporan Perlu Ditinjau</div>
              <div class="text-xl font-bold">...</div>
            </div>
          </div>
        </div>
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
              <div class="mb-2 font-semibold">Nilai</div>
              <fo-select>
                <option>Semua</option>
                <option>A+</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
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
                    <th>TIPE</th>
                    <th>PERUSAHAAN</th>
                    <th>POSISI</th>
                    <th>PERIODE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="tabelLaporan">
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
          <div><ui-pagination data-pagination-count=${total} data-pagination-limit=${10} data-pagination-page=${1} /></div>
        </div>
      </div>
    `
  );
};

const renderLaporanMahasiswa = async (dataLamaran) => {
  const contentLaporan = document.getElementById("content-laporan");

  render(
    contentLaporan,
    html`
      <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
            <div class="pb-2 w-full flex justify-start items-center border-b border-gray-300">
              <div class="test-md p-4 font-bold">Laporan Magang</div>
            </div>
            <div class="w-full p-4 flex gap-4 text-justify">
              <img src=${dataLamaran?.users[0]?.profile_picture?.url} class="w-[150px]" alt="kandidat-image" />
              <div class="w-full">
                <div class="pb-2 flex gap-96">
                  <div>
                    <div class="text-xs font-bold">Nama Lengkap</div>
                    <div class="text-md font-bold">${dataLamaran?.users[0]?.name}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold">NIM</div>
                    <div class="text-xs">${dataLamaran?.users[0]?.nim}</div>
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
                        <div>${dataLamaran?.users[0]?.phone_number}</div>
                        <div>${dataLamaran?.users[0]?.program_study}</div>
                        <div>${dataLamaran?.users[0]?.address}</div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Email</div>
                      <div>IPK</div>
                    </div>
                    <div class="space-y-2">
                      <div>${dataLamaran?.users[0]?.email}</div>
                      <div>${dataLamaran?.users[0]?.ipk}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col text-center justify-center items-center gap-4">
            <div class="pb-2 w-full flex justify-start items-center border-b border-gray-300">
            </div>
            <div class="w-full p-4 flex gap-4 text-justify">
              <img src=${dataLamaran?.jobs[0]?.job_vacancy_image?.url} class="w-[150px]" alt="kandidat-image" />
              <div class="w-full">
                <div class="pb-2 flex gap-96">
                  <div>
                    <div class="text-xs font-bold">Perusahaan</div>
                    <div class="text-md font-bold">${dataLamaran?.jobs[0]?.company}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold">Posisi</div>
                    <div class="text-xs">${dataLamaran?.jobs[0]?.title}</div>
                  </div>
                </div>
                <div class="border-b border-dashed border-gray-300"></div>
                <div class="pb-2 flex gap-14">
                  <div>
                    <div class="pt-2 flex gap-16 text-xs">
                      <div class="font-bold space-y-2">
                        <div>Benefit</div>
                        <div>Durasi</div>
                        <div>Tipe Lowongan</div>
                      </div>
                      <div class="space-y-2">
                        <div>${dataLamaran?.jobs[0]?.benefits}</div>
                        <div>${dataLamaran?.jobs[0]?.duration}</div>
                        <div>${dataLamaran?.jobs[0]?.job_type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Lokasi</div>
                    </div>
                    <div class="space-y-2">
                      <div>${dataLamaran?.jobs[0]?.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form id="create-report">
         ${
           dataLamaran?.reports
             ? html`<div class="px-4 flex gap-4">
                 <div class="w-full ">
                   <fo-label className="font-bold text-md" label="Laporan Mahasiswa"></fo-label>
                   <fo-uploaded
                     fileurl=${dataLamaran?.reports?.file_laporan?.url}
                     filename=${dataLamaran?.reports?.file_laporan?.url}
                     className="mb-2"
                   ></fo-uploaded>
                   <fo-error name="fileUpload"></fo-error>
                 </div>
               </div>`
             : html`<div class="ms-5 me-5">
                 <fo-label label="Upload Laporan"></fo-label>
                 <fo-file className="min-h-24" name="file" accept="application/pdf"></fo-file>
                 <fo-error name="file"></fo-error>
               </div>`
         }
          
          
          <div
            class=" w-full flex justify-between p-4"
            style="
                padding-bottom: 50px;
                padding-top: 50px;
            ">
            <div class="flex gap-2 items-center">
              <iconify-icon
                icon=${dataLamaran?.reports ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.reports ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.reports ? "Selesai" : "Menunggu"} Dibuat Oleh Mahasiswa</div>
            </div>
             <div class="flex gap-2 items-center">
              <iconify-icon
                icon=${dataLamaran?.reports?.company_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.reports?.company_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.reports?.company_checked_id ? "Selesai" : "Menunggu"} Diperiksa Oleh Perusahaan</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon
                icon=${dataLamaran?.reports?.lecturer_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.reports?.lecturer_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.reports?.lecturer_checked_id ? "Selesai" : "Menunggu"} Diperiksa Oleh Dosen Wali</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon
                icon=${dataLamaran?.reports?.examiner_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.reports?.examiner_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.reports?.examiner_checked_id ? "Selesai" : "Menunggu"} Diperiksa Oleh Dosen Penguji</div>
            </div>
            ${dataLamaran?.reports ? "" : html`<ui-button class="me-5 mt-5 mb-5" color="orange" type="submit">KIRIM LAPORAN</ui-button>`}
          </div>
          </form
        </div>
      </div>
    `
  );
};

const renderNotEligible = () => {
  const contentLaporan = document.getElementById("content-laporan");
  render(
    contentLaporan,
    html`
       <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
           <div class="w-full p-1 flex gap-1 justify-center items-center flex-col">
           <img src="src/images/document.svg" class="w-[40rem]"></img>
           <div class="text-md mb-10">Belum ada laporan yang diunggah</div>
           </div>
          </div>
        </div>
       </div>
    `
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();

  if (auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra") {
    fetchLaporan();

    async function getDataReport(page = 1, perPage = 10) {
      try {
        const res = await API.getListReport(`?page=${page}&per_page=${perPage}`);
        const data = res.data.data;
        const total = res?.data?.count;
        renderLaporan(total);

        fetchTabelLaporan(data);
      } catch (err) {
        toast.error("Gagal mengambil data laporan");
      }
    }

    // Memuat data awal
    await getDataReport();

    // Menangani pagination page change
    const pagination = document.querySelector("ui-pagination");
    if (pagination) {
      pagination.addEventListener("pagination-page-change", async (event) => {
        const { page } = event.detail; // Mendapatkan halaman dari event
        await getDataReport(page);
      });
    }
  } else if (auth.role === "mahasiswa") {
    let apply_job_id;

    async function getMyJob() {
      try {
        const res = await API.getListCandidate(`/user/${auth.user.id}/last`);
        const dataLamaran = res.data.data || {};
        if (Object.keys(dataLamaran).length > 0 && typeof dataLamaran === "object") {
          apply_job_id = dataLamaran.id;
          renderLaporanMahasiswa(dataLamaran);
        } else {
          renderNotEligible();
        }
      } catch (err) {
        toast.error("Gagal mengambil data lamaran");
      }
    }

    // Memuat data awal untuk mahasiswa
    await getMyJob();

    const form = document.getElementById("create-report");
    if (form instanceof HTMLFormElement) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("apply_job_id", apply_job_id);
        if (!formValidation(form, formData)) return;

        try {
          await API.createReport(formData);
          toast.success("Berhasil mengirim laporan");
          await getMyJob(); // Memuat ulang laporan setelah berhasil
        } catch (err) {
          toast.error("Gagal mengirim laporan");
        }
      });
    }
  }
});
