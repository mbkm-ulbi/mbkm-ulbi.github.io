import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy } from "/kandidat/dummyKandidat.js";
import { getTime, getUrlParam, toMonetary } from "../../src/js/libraries/utilities.js";
import API, { getListJob } from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
import micromodal from "https://cdn.jsdelivr.net/npm/micromodal@0.4.10/+esm";
import badgeStatus from "../../src/js/libraries/badgeStatus.js";

const fetchKandidat = async (kandidat, fetchCandidates) => {
  console.log(kandidat);
  const handleApprove = async (id, index) => {
    //disable button tolak dan setujui
    await API.postApply(null, `/${id}/approve`)
      .then((res) => {
        toast.success("Berhasil menerima kandidat");
        //jika success maka close modal
        fetchCandidates();
        micromodal.close("tinjau-kandidat-" + index);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal menerima kandidat");
      });
  };
  const handleReject = async (id, index) => {
    await API.postApply(null, `/${id}/reject`)
      .then((res) => {
        toast.success("Berhasil menolak kandidat");
        fetchCandidates();
        micromodal.close("tinjau-kandidat-" + index);
      })
      .catch((err) => {
        toast.error("Gagal menolak kandidat");
      });
  };
  render(document.getElementById("totalKandidat"), html` ${toMonetary(kandidat.length)} Kandidat `);

  render(
    document.getElementById("listKandidat"),
    html`
      ${kandidat.map((item, index) => {
        return html`
          <div class="p-4 flex-none flex gap-2 rounded-lg border border-gray-300">
            <div class="flex justify-between w-full gap-3">
              <div class="flex justify-start items-center gap-3">
                <div class="w-[48px] flex overflow-hidden rounded-full">
                  <img class="object-center object-cover h-[50px]" src=${item?.profile_picture?.url} alt="image" />
                </div>
                <div>
                  <div class="font-semibold">${item.name}</div>
                  <div>Program Studi: ${item.program_study}</div>
                  <div>Tanggal Melamar: ${moment(item.created_at).format("DD MMMM YYYY")}</div>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div>
                  ${badgeStatus(item.apply_job.status)}
                 
                </div>
                ${item?.apply_job?.status == "Melamar" ? html`<ui-button data-dialog-trigger=${"tinjau-kandidat-" + index}>TINJAU</ui-button>` : ''}
                
                <ui-dialog name=${"tinjau-kandidat-" + index} className="p-0 w-[800px] h-auto">
                  <div class="flex flex-col">
                    <div class="p-4 flex justify-between items-center">
                      <div class="text-md font-bold">Tinjau Kandidat</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-gray-600" noobserver></iconify-icon></div>
                    </div>
                    <div class="border-t border-gray-300"></div>
                    <div class="p-4 space-y-4">
                      <div class="flex gap-3">
                        <div class="w-[48px] flex overflow-hidden rounded-full">
                          <img class="object-center object-cover h-[50px]" src=${item?.profile_picture?.url} alt="image" />
                        </div>
                        <div class="flex flex-col justify-center">
                          <div class="font-semibold">${item.name}</div>
                          <div>NIM: ${item.nim ? item.nim : "-"}</div>
                        </div>
                      </div>
                      <div>
                        <div class="font-semibold">Program Studi</div>
                        <div class="ml-4">${item.program_study ? item.program_study : "-"}</div>
                      </div>
                      <div>
                        <div class="font-semibold">Semester</div>
                        <div class="ml-4">Semester 3</div>
                      </div>
                      <div>
                        <div class="font-semibold">No. Telepon</div>
                        <div class="ml-4">${item.phone_number ? item.phone_number : "-"}</div>
                      </div>
                      <div>
                        <div class="font-semibold">Alamat</div>
                        <div class="ml-4">${item.address ? item.address : "-"}</div>
                      </div>
                      <div class="w-full">
                        <fo-label label="DHS"></fo-label>
                        <fo-uploaded
                          ?disabled=${!item?.apply_job?.dhs?.url}
                          fileurl=${item?.apply_job?.dhs ? item?.apply_job?.dhs?.url : ""}
                          filename=${item?.apply_job?.dhs ? item?.apply_job?.dhs?.url : "File tidak ditemukan"}
                          className="mb-2"
                        ></fo-uploaded>
                        <fo-error name="fileUpload"></fo-error>
                      </div>
                      <div class="w-full">
                        <fo-label label="CV"></fo-label>
                        <fo-uploaded
                          ?disabled=${!item?.apply_job?.cv?.url}
                          fileurl=${item?.apply_job?.cv ? item?.apply_job?.cv?.url : ""}
                          filename=${item?.apply_job?.cv ? item?.apply_job?.cv?.url : "File tidak ditemukan"}
                          className="mb-2"
                        ></fo-uploaded>
                        <fo-error name="fileUpload"></fo-error>
                      </div>
                      <div class="w-full">
                        <fo-label label="Surat Lamaran"></fo-label>
                        <fo-uploaded
                          ?disabled=${!item?.apply_job?.surat_lamaran?.url}
                          fileurl=${item?.apply_job?.surat_lamaran ? item?.apply_job?.surat_lamaran?.url : ""}
                          filename=${item?.apply_job?.surat_lamaran ? item?.apply_job?.surat_lamaran?.url : "File tidak ditemukan"}
                          className="mb-2"
                        ></fo-uploaded>
                        <fo-error name="fileUpload"></fo-error>
                      </div>
                      <div class="w-full">
                        <fo-label label="Surat Rekomendasi Prodi"></fo-label>
                        <fo-uploaded
                          ?disabled=${!item?.apply_job?.surat_rekomendasi_prodi?.url}
                          fileurl=${item?.apply_job?.surat_rekomendasi_prodi ? item?.apply_job?.surat_rekomendasi_prodi?.url : ""}
                          filename=${item?.apply_job?.surat_rekomendasi_prodi ? item?.apply_job?.surat_rekomendasi_prodi?.url : "File tidak ditemukan"}
                          className="mb-2"
                        ></fo-uploaded>
                        <fo-error name="fileUpload"></fo-error>
                      </div>
                    </div>
                    ${item?.apply_job?.status == "Melamar"
                      ? html`<div class="border-t border-gray-300"></div>
                          <div class="p-4 flex justify-between items-center">
                            <ui-button color="red" className="w-full" onclick=${() => handleReject(item?.apply_job?.id, index)}>TOLAK</ui-button>
                            <ui-button color="green" className="w-full" onclick=${() => handleApprove(item?.apply_job?.id, index)}>SETUJUI</ui-button>
                          </div>`
                      : null}
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

const renderDetailJobs = (item) => {
  const detailJobs = document.getElementById("detail-jobs");
  const urlImage = "src/images/dummy_ulbi.png";

  render(
    detailJobs,
    html`
      <div class="flex justify-between items-center">
        <div>Diposting ${getTime(item?.created_at)}</div>
        <div>
           ${item.status === "Tersedia"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                    : item.status === "Perlu Ditinjau"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                    : item.status === "Ditutup" || item.status === "Ditolak"
                    ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                    : ""}
        </div>
      </div>
      <div class="flex flex-row gap-2 justify-start items-center">
        <div class="w-[120px] flex overflow-hidden rounded-l-lg">
          <img class="object-center object-contain" src=${
            item?.job_vacancy_image?.url ? item?.job_vacancy_image?.url : urlImage
          } height="[100px]" alt="image" />
        </div>
        <div class="flex flex-col justify-start gap-2">
          <div class="text-sm font-semibold">${item?.title}</div>
          <div class="flex justify-start items-center gap-2">
            <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
            <div>${item?.company}</div>
          </div>
          <div class="flex justify-start items-center gap-2">
            <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
            <div>${item?.location}</div>
          </div>
        </div>
      </div>
      <div class="p-0 my-2 border-t border-gray-300"></div>
      <div class="space-y-4">
        <h1 class="font-bold text-sm">Deskripsi Pekerjaan</h1>
        <div class="p-6 mt-10">
         <div class="mt-5" innerHTML=${item?.description}></div>
        </div>
      </div>
        <div class="space-y-4">
        <h1 class="font-bold text-sm">Durasi</h1>
        <div class="p-6 mt-10">
            <p class="text-base">${item?.duration}</p>
        </div>
      </div>
      </div>
        <div class="space-y-4">
        <h1 class="font-bold text-sm">Jenis Pekerjaan</h1>
        <div class="p-6 mt-10">
            <p class="text-base">${item?.job_type}</p>
        </div>
      </div>
      </div>
        <div class="space-y-4">
        <h1 class="font-bold text-sm">Benefit Yang Ditawarkan</h1>
        <div class="p-6 mt-10">
            <p class="text-base">${item?.benefits}</p>
        </div>
      </div>
      </div>
        <div class="space-y-4">
        <h1 class="font-bold text-sm">Tipe Lowongan</h1>
        <div class="p-6 mt-10">
            <p class="text-base">${item?.vacancy_type}</p>
        </div>
      </div>
      </div>
        <div class="space-y-4">
        <h1 class="font-bold text-sm">Batas Akhir Pendaftaran</h1>
        <div class="p-6 mt-10">
          <p class="text-base">${moment(item?.deadline).format("DD MMMM YYYY")}</p>
        </div>
      </div>
    `
  );
};

const renderTutupLowongan = (id, fetchJob) => {
  const elemetTutupLowongan = document.getElementById("tutup-lowongan-element");
  const handleTutupLowongan = async (id) => {
    await API.getListJob(`/${id}/tolak`)
      .then((res) => {
        toast.success("Berhasil menutup lowongan");
        micromodal.close("tutup-lowongan");
        fetchJob()
      }).catch((err) => {
        toast.error("Gagal menutup lowongan");
        fetchJob()

      })
  }
  render(
    elemetTutupLowongan,
    html`<div>
      <ui-button color="red" data-dialog-trigger="tutup-lowongan">TUTUP LOWONGAN</ui-button>
      <ui-dialog name="tutup-lowongan" className="w-[750px] h-[320px]">
        <div class="flex flex-col text-center justify-center items-center gap-3">
          <div class="test-md font-bold">Yakin Untuk Menutup Postingan Ini?</div>
          <iconify-icon icon="solar:close-square-bold-duotone" height="96" class="text-ulbiOrange" noobserver></iconify-icon>
          <div class="text-sm font-semibold">Postingan Anda Akan Kami Tinjau Maksimal 2x24 Jam</div>
          <div class="text-xs">Akun Perusahaan Anda Kini Dapat Melakukan Posting Lowongan Magang Pada Website MBKM ULBI</div>
          <div class="text-xs">Silahkan Masuk Menggunakan Akun Yang Telah Anda Buat Untuk Melakukan Posting Lowongan Magang</div>
          <div class="flex gap-4">
            <ui-button data-dialog-close>BATAL</ui-button>
            <div>
              <ui-button color="red" onclick=${()=>handleTutupLowongan(id)}>TUTUP</ui-button>
            </div>
          </div>
        </div>
      </ui-dialog>
    </div> `
  );
};
document.addEventListener("DOMContentLoaded", async () => {
  micromodal.init();
  const urlParams = getUrlParam();
  const id = urlParams.get("id");
  // let data = {};
  let job = {}
  const fetchJob = async () => {
    await API.getListJob(`/${id}`)
      .then((res) => {
        job = res.data.data;
        renderDetailJobs(job);
      })
      .catch((err) => {
        toast.error("Gagal mengambil data lowongan");
      });
  };
  await fetchJob()
 
  let fetchCandidates = async () => {
    await API.getListJob(`/${id}/list`)
      .then((res) => {
        let candidates = res.data.data;
        fetchKandidat(candidates, fetchCandidates);
      })
      .catch((err) => {
        toast.error("Gagal mengambil data kandidat");
      });
  };

  await fetchCandidates();
  if(job.status === "Available"){
    renderTutupLowongan(id,fetchJob);
  }
});
