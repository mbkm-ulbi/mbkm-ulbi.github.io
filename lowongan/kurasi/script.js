import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy } from "/kandidat/dummyKandidat.js";
import { getTime, getUrlParam, toMonetary } from "../../src/js/libraries/utilities.js";
import API, { getListJob } from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'


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
                    : item.applyStatus === "Pending"
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

const renderDetailJobs = (item) => {
  const detailJobs = document.getElementById("detail-jobs");
  const urlImage = "src/images/dummy_ulbi.png";

  render(
    detailJobs,
    html`
      <div class="flex justify-between items-center">
        <div>Diposting ${getTime(item?.created_at)}</div>
        <div>
          ${item.status === "Available"
            ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
            : item.status === "Pending"
            ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
            : item.status === "Not Available"
            ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
            : ""}
        </div>
      </div>
      <div class="flex flex-row gap-2 justify-start items-center">
        <div class="w-[120px] flex overflow-hidden rounded-l-lg">
          <img class="object-center object-contain" src=${item?.job_vacancy_image?.url ? item?.job_vacancy_image?.url :urlImage} height="[100px]" alt="image" />
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
            <p class="text-base">belum masuk</p>
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
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = getUrlParam();
  const id = urlParams.get("id");
  // let data = {};
  let candidates = [];
  await API.getListJob(`/${id}`)
    .then((res) => {
      let data = res.data.data;
      renderDetailJobs(data);
    })
    .catch((err) => {
      toast.error("Gagal mengambil data lowongan");
    });

  await API.getListCandidate(`/${id}`)
    .then((res) => {
      candidates = res.data.data;
    })
    .catch((err) => {
      toast.error("Gagal mengambil data kandidat");
    });

  fetchKandidat();
});
