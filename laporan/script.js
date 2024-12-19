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
                : item.status === "Pending"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                : item.status === "Berjalan"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <ui-link href=${`laporan/approve/index.html?id=${item.apply_job_id}`}><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></ui-link>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

const renderLaporan = () => {
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
          <div><ui-pagination /></div>
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
          <div class="ms-5 me-5">
            <fo-label label="Upload Laporan"></fo-label>
            <fo-file className="min-h-24" name="file" accept="application/pdf"></fo-file>
            <fo-error name="file"></fo-error>
          </div>
          <div
            class=" w-full flex justify-between p-4"
            style="
                padding-bottom: 50px;
                padding-top: 50px;
            ">
            <div class="flex gap-2 items-center">
              <iconify-icon icon="solar:check-circle-bold" height="22" class="text-green-500" noobserver></iconify-icon>
              <div>Selesai Dibuat Oleh Mahasiswa</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
              <div>Selesai Diperiksa Oleh Perusahaan</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon
                icon=${dataLamaran?.lecturer_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.lecturer_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.lecturer_checked_id ? "Selesai" : "Menunggu"} Diperiksa Oleh Dosen Wali</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon
                icon=${dataLamaran?.prodi_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.prodi_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.prodi_checked_id ? "Selesai": "Menunggu"} Diperiksa Oleh Prodi</div>
            </div>
             <ui-button class="me-5 mt-5 mb-5" color="orange" type="submit">KIRIM LAPORAN</ui-button>
          </div>
          </form
        </div>
      </div>
    `
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();
  if (auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra") {
    renderLaporan();
    fetchLaporan();

    async function getDataReport() {
      await API.getListReport()
        .then((res) => {
          let data = res.data.data;
          fetchTabelLaporan(data);
        })
        .catch((err) => {
          toast.error("Gagal mengambil data laporan");
        });
    }
    await getDataReport();
  } else if (auth.role === "mahasiswa") {
    const auth = await getUserInfo();
    let apply_job_id;
    async function getMyJob() {
      await API.getListCandidate("/user/" + auth.user.id + "/last")
        .then((res) => {
          let dataLamaran = res.data.data;
          apply_job_id = dataLamaran.id;
          renderLaporanMahasiswa(dataLamaran);
        })
        .catch((err) => {
          toast.error("Gagal mengambil data lamaran");
        });
    }

    await getMyJob();

    const form = document.getElementById("create-report");
    if (form instanceof HTMLFormElement) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("apply_job_id", apply_job_id);
        if (!formValidation(form, formData)) return;

        await API.createReport(formData)
          .then((res) => {
            toast.success("Berhasil mengirim laporan");
            getMyJob();
          })
          .catch((err) => {
            toast.error("Gagal mengirim laporan");
          });
      });
    }

    // await
  }
});
