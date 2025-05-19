import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getUrlParam } from "../../src/js/libraries/utilities.js";
import API from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";
import { getAuth, getUserInfo } from "../../src/js/libraries/cookies.js";

const renderLaporanMahasiswa = async (dataLamaran,getReport) => {
  const auth = await getUserInfo();
  const { role } = auth;
  console.log({ role });
  const contentLaporan = document.getElementById("content-laporan");
  const handleApprove = async (id) => {
    await API.createReport(null, `/${id}/check`)
      .then(async(res) => {
        toast.success("Laporan berhasil disetujui");
        await getReport()
      })
      .catch((err) => {
        toast.error("Gagal menyetujui laporan");
      });
  };
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
              <img src=${dataLamaran?.apply_job?.users[0]?.profile_picture?.url} class="w-[150px]" alt="kandidat-image" />
              <div class="w-full">
                <div class="pb-2 flex gap-96">
                  <div>
                    <div class="text-xs font-bold">Nama Lengkap</div>
                    <div class="text-md font-bold">${dataLamaran?.apply_job?.users[0]?.name}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold">NIM</div>
                    <div class="text-xs">${dataLamaran?.apply_job?.users[0]?.profile_picture?.nim}</div>
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
                        <div>${dataLamaran?.apply_job?.users[0]?.profile_picture?.phone_number}</div>
                        <div>${dataLamaran?.apply_job?.users[0]?.profile_picture?.program_study}</div>
                        <div>${dataLamaran?.apply_job?.users[0]?.profile_picture?.address}</div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Email</div>
                      <div>IPK</div>
                    </div>
                    <div class="space-y-2">
                      <div>${dataLamaran?.apply_job?.users[0]?.profile_picture?.email}</div>
                      <div>${dataLamaran?.apply_job?.users[0]?.profile_picture?.ipk}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col text-center justify-center items-center gap-4">
            <div class="pb-2 w-full flex justify-start items-center border-b border-gray-300"></div>
            <div class="w-full p-4 flex gap-4 text-justify">
              <img src=${dataLamaran?.apply_job?.jobs[0]?.job_vacancy_image?.url} class="w-[150px]" alt="kandidat-image" />
              <div class="w-full">
                <div class="pb-2 flex gap-96">
                  <div>
                    <div class="text-xs font-bold">Perusahaan</div>
                    <div class="text-md font-bold">${dataLamaran?.apply_job?.jobs[0]?.job_vacancy_image?.company}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold">Posisi</div>
                    <div class="text-xs">${dataLamaran?.apply_job?.jobs[0]?.title}</div>
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
                        <div>${dataLamaran?.apply_job?.jobs[0]?.benefits}</div>
                        <div>${dataLamaran?.apply_job?.jobs[0]?.duration}</div>
                        <div>${dataLamaran?.apply_job?.jobs[0]?.job_type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Lokasi</div>
                    </div>
                    <div class="space-y-2">
                      <div>${dataLamaran?.apply_job?.jobs[0]?.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 flex gap-4">
            <div class="w-full ">
              <fo-label className="font-bold text-md" label="Laporan Mahasiswa"></fo-label>
              <fo-uploaded fileurl=${dataLamaran?.file_laporan?.url} filename=${dataLamaran?.file_laporan?.url} className="mb-2"></fo-uploaded>
              <fo-error name="fileUpload"></fo-error>
            </div>
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
              <iconify-icon
                icon=${dataLamaran?.company_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.company_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.company_checked_id ? "Selesai": "Menunggu"} Diperiksa Oleh Perusahaan</div>
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
                icon=${dataLamaran?.examiner_checked_id ? "solar:check-circle-bold" : "solar:danger-circle-bold"}
                height="22"
                class=${dataLamaran?.examiner_checked_id ? "text-green-500" : "text-red-500"}
                noobserver
              ></iconify-icon>
              <div>${dataLamaran?.examiner_checked_id ? "Selesai": "Menunggu"} Diperiksa Oleh Dosen Penguji</div>
            </div>
            ${(role === "prodi" && !dataLamaran?.prodi_checked_id) || (role === "dosen" && !dataLamaran?.lecturer_checked_id) || (role === "dosen" && !dataLamaran?.examiner_checked_id) || (role === "mitra" && !dataLamaran?.company_checked_id)
              ? html`<ui-button class="me-5 mt-5 mb-5" color="green" type="button" onclick=${() => handleApprove(dataLamaran?.apply_job_id)}
                  >Setujui Laporan</ui-button
                >`
              : ""}
          </div>
        </div>
      </div>
    `
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  const param = getUrlParam();
  const reportId = param.get("id");
  if (reportId) {
    async function getReport(){
      await API.getListReport(`/${reportId}`)
      .then((res) => {
        const dataLamaran = res.data.data;
        console.log({ dataLamaran });
        renderLaporanMahasiswa(dataLamaran,getReport);
      })
      .catch((err) => {
        console.log(err);
      });
    }
   await getReport()
  }
});
