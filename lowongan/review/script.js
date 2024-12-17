import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getAuth, getUserInfo } from "../../src/js/libraries/cookies.js";
import API, { getListJob } from "../../src/js/api/index.js";
import { getTime, getUrlParam, isDeadlineExceeded } from "../../src/js/libraries/utilities.js";
import { toast } from "../../src/js/libraries/notify.js";
import { slugUri } from "../../src/js/customs/settings.js";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";

const renderApprovalButton = (data) => {
  console.log(data);
  const approvlButton = document.getElementById("approval-lowongan");

  if (data?.status === "Perlu Ditinjau") {
    const handleApprove = async () => {
      console.log("approve", data.id);
      await API.postJob(null,`/${data.id}/approve`)
        .then((res) => {
          toast.success("Lowongan berhasil disetujui");
          window.location.assign(`${slugUri}lowongan`);
        })
        .catch((err) => {
          toast.error("Gagal menyetujui lowongan");
        });
    };
    const handleReject = async () => {
      console.log("reject", data.id);
      API.postJob(null,`/${data.id}/reject`)
        .then((res) => {
          toast.success("Lowongan berhasil ditolak");
          window.location.assign(`${slugUri}lowongan`);
        })
        .catch((err) => {
          toast.error("Gagal menyetujui lowongan");
        });
    };
    render(
      approvlButton,
      html`
        <div class="flex gap-4">
          <ui-button color="red" data-dialog-trigger="reject">TOLAK</ui-button>
          <ui-button color="green" data-dialog-trigger="approve">SETUJUI</ui-button>
        </div>
        <ui-dialog name="reject" className="w-[750px] h-auto">
          <div class="flex flex-col text-center justify-center items-center gap-3">
            <div class="test-md font-bold">Apakah Anda yakin ingin menolak data ini?</div>
            <iconify-icon icon="solar:question-circle-line-duotone" height="96" class="text-yellow-600" noobserver></iconify-icon>
            <div class="text-sm font-semibold">Data yang ditolak tidak dapat dipublikasikan.</div>
            <div class="flex justify-between gap-3">
              <ui-button data-dialog-close color='red' id="batal">Batal</ui-button>
              <ui-button onclick=${handleReject}>Ya, Yakin!</ui-button>
            </div>
          </div>
        </ui-dialog>
        <ui-dialog name="approve" className="w-[750px] h-auto">
          <div class="flex flex-col text-center justify-center items-center gap-3">
            <div class="test-md font-bold">Apakah Anda yakin ingin menyetujui data ini?</div>
            <iconify-icon icon="solar:question-circle-line-duotone" height="96" class="text-yellow-600" noobserver></iconify-icon>
            <div class="text-sm font-semibold">Data yang distujui dapat dipublikasikan.</div>
            <div class="flex justify-between gap-3">
              <ui-button data-dialog-close color='red' id="batal">Batal</ui-button>
              <ui-button onclick=${handleApprove}>Ya, Yakin!</ui-button>
            </div>
          </div>
        </ui-dialog>
      `
    );
  } else {
    const handleDelete = async () => {
      await API.deleteJobsById(`/${data.id}`)
        .then((res) => {
          toast.success("Lowongan berhasil dihapus");
          setTimeout(() => {
            window.location.assign(`${slugUri}lowongan`);
          },500)
        })
        .catch((err) => {
          toast.error("Gagal menghapus lowongan");
        });
    };
    render(
      approvlButton,
      html`
        <div class="flex gap-4">
          <ui-button color="red" data-dialog-trigger="delete">HAPUS</ui-button>
          <ui-button color="green">EDIT</ui-button>
        </div>
        <ui-dialog name="delete" className="w-[750px] h-auto">
          <div class="flex flex-col text-center justify-center items-center gap-3">
            <div class="test-md font-bold">Apakah Anda yakin ingin menghapus data ini?</div>
            <iconify-icon icon="solar:question-circle-line-duotone" height="96" class="text-yellow-600" noobserver></iconify-icon>
            <div class="text-sm font-semibold">Data yang dihapus tidak dapat dikembalikan.</div>
            <div class="flex justify-between gap-3">
              <ui-button data-dialog-close color='red' id="batal">Batal</ui-button>
              <ui-button onclick=${handleDelete}>Ya, Yakin!</ui-button>
            </div>
          </div>
        </ui-dialog>
      `
    );
  }
};

const renderApplyButton = () => {
  const approvlButton = document.getElementById("approval-lowongan");
  const param = getUrlParam();
  console.log(param.get("id"));
  render(
    approvlButton,
    html`
      <div class="flex gap-4">
        <ui-button variant="outline_orange" type="button">Simpan</ui-button>
        <ui-button color="orange" type="button" href=${`lowongan/apply/index.html?id=${param.get("id")}`}>Lamar</ui-button>
      </div>
    `
  );
};
const urlImage = "src/images/dummy_ulbi.png";

const renderElement = (data) => {
  const lowongan = document.getElementById("lowongan-review");
  render(
    lowongan,
    html`
      <div class="space-y-4 overflow-hidden">
        <div class="p-4 flex flex-col gap-4 rounded-md shadow-md">
          <div class="flex justify-between items-center">
            <div class="text-md font-bold">Detail Postingan</div>
            <div class="flex gap-4" id="approval-lowongan"></div>
          </div>
          <div class="border-t border-gray-300 border-dashed"></div>
          <div class="p-4 flex flex-col gap-2 text-xs rounded-md border border-gray-300">
            <div class="flex justify-between items-center">
              <div>${getTime(data?.created_at)}</div>
              <div>
              ${data.status === "Tersedia"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${data.status}</ui-badge>`
                : data.status === "Perlu Ditinjau"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${data.status}</ui-badge>`
                : data.status === "Ditutup" || data.status === "Ditolak"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${data.status}</ui-badge>`
                : ""}
              </div>
            </div>
            <div class="flex flex-row gap-2 justify-start items-center">
              <div class="w-[120px] flex overflow-hidden rounded-l-lg">
                <img class="object-center object-contain" src=${data?.job_vacancy_image?.url ? data?.job_vacancy_image?.url : urlImage} height="[100px]" alt="image" />
              </div>
              <div class="flex flex-col justify-start gap-2">
                <div class="text-sm font-semibold">${data?.title}</div>
                <div class="flex justify-start items-center gap-2">
                  <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                  <div>${data?.company}</div>
                </div>
                <div class="flex justify-start items-center gap-2">
                  <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                  <div>${data?.location}</div>
                </div>
              </div>
            </div>
            <div class="p-0 my-2 border-t border-gray-300"></div>
            <div class="space-y-4 mb-6">
              <h1 class="font-bold">Deskripsi Pekerjaan</h1>
              <div class="mt-5">
                <div class="mt-5" innerHTML=${data?.description}></div>
              </div>
            </div>
            <div class="mb-6">
              <h1 class="font-bold">Durasi</h1>
              <p class="text-base">${data?.duration}</p>
            </div>
            <div class="mb-6">
              <h1 class="font-bold">Jenis Pekerjaan</h1>
              <p class="text-base">${data?.job_type}</p>
            </div>
            <div class="mb-6">
              <h1 class="font-bold">Benefit Yang Ditawarkan</h1>
              <p class="text-base">${data?.benefits}</p>
            </div>
            <div class="mb-6">
              <h1 class="font-bold">Tipe Lowongan</h1>
              <p class="text-base">belum masuk</p>
            </div>
            <div class="mb-6">
              <h1 class="font-bold">Batas Akhir Pendaftaran</h1>
              <p class="text-base">${moment(data?.deadline).format("DD MMMM YYYY")}</p>
            </div>
          </div>
          <div class="flex justify-end">
            <ui-button color="red" href="lowongan/">Kembali</ui-button>
          </div>
        </div>
      </div>
    `
  );
};

const renderEditDeleteButton = () => {
  const approvlButton = document.getElementById("approval-lowongan");
  const param = getUrlParam();
  console.log(param.get("id"));
  render(
    approvlButton,
    html`
      <div class="flex gap-4">
        <ui-button variant="outline_orange" type="button">Simpan</ui-button>
        <ui-button color="orange" type="button" href=${`lowongan/apply/index.html?id=${param.get("id")}`}>Lamar</ui-button>
      </div>
    `
  );
};
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = getUrlParam();
  const id = urlParams.get("id");
  let data = {};
  await getListJob(`/${id}`)
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      toast.error("Gagal mengambil data lowongan");
    });

  renderElement(data);

  const auth = await getUserInfo();
  if (["superadmin", "prodi", "cdc"].includes(auth.role)) {
    renderApprovalButton(data);
  } else if (auth.role === "mahasiswa" && data.status === "Tersedia") {
    if(!isDeadlineExceeded(data.deadline)){
      renderApplyButton();
    }
  }
});
