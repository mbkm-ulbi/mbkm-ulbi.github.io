import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getAuth, getUserInfo } from "../../src/js/libraries/cookies.js";
import { getListJob } from "../../src/js/api/index.js";
import { getUrlParam } from "../../src/js/libraries/utilities.js";

const renderApprovalButton = () => {
  const approvlButton = document.getElementById("approval-lowongan");

  render(
    approvlButton,
    html`
      <div class="flex gap-4">
        <ui-button color="red">TOLAK</ui-button>
        <ui-button color="green">SETUJUI</ui-button>
      </div>
    `
  );
};

const renderApplyButton = () => {
  const approvlButton = document.getElementById("approval-lowongan");

  render(
    approvlButton,
    html`
      <div class="flex gap-4">
        <ui-button variant="outline_orange" type="button">Simpan</ui-button>
        <ui-button color="orange" type="button" href="lowongan/apply">Lamar</ui-button>
      </div>
    `
  );
};
const urlImage = "src/images/dummy_ulbi.png";


const renderElement=(data)=>{
  const lowongan = document.getElementById("lowongan-review");
  render(
    lowongan,
    html`
      <div class="space-y-4 overflow-hidden">
        <div class="p-4 flex flex-col gap-4 rounded-md shadow-md">
          <div class="flex justify-between items-center">
            <div class="text-md font-bold">Detail Postingan</div>
            <div class="flex gap-4" id="approval-lowongan">
              
            </div>
          </div>
          <div class="border-t border-gray-300 border-dashed"></div>
          <div class="p-4 flex flex-col gap-2 text-xs rounded-md border border-gray-300">
            <div class="flex justify-between items-center">
              <div>${data?.created_at}</div>
             <div>
                ${data.status === "Aktif"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${data.status}</ui-badge>`
                : data.status === "Perlu Ditinjau"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${data.status}</ui-badge>`
                : data.status === "Ditolak"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${data.status}</ui-badge>`
                : ""}
              </div>
            </div>
            <div class="flex flex-row gap-2 justify-start items-center">
              <div class="w-[120px] flex overflow-hidden rounded-l-lg">
                <img class="object-center object-contain" src=${data?.image ?data?.image : urlImage} height="[100px]" alt="image" />
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
            <div class="space-y-4">
              <h1 class="font-bold">Deskripsi Pekerjaan</h1>
             
              <div class="mt-5">
                 ${html`${data?.description}`}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  )
}
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams=getUrlParam()
  const id = urlParams.get('id')
  let data = {}
  await getListJob(`/${id}`).then((res)=>{
    data = res.data.data
  })
  
  renderElement(data)


  const auth = await getUserInfo();
  if (auth.role === "superadmin" || auth.role === "prodi" || auth.role === "cdc" || auth.role === "mitra") {
    renderApprovalButton();
  } else {
    renderApplyButton();
  }
});
