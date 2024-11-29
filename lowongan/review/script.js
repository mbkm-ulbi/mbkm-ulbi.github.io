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
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams=getUrlParam()
  const id = urlParams.get('id')
  await  getListJob(`/${id}`)
  const auth = await getUserInfo();
  if (auth.role === "superadmin" || auth.role === "prodi" || auth.role === "cdc" || auth.role === "mitra") {
    renderApprovalButton();
  } else {
    renderApplyButton();
  }
});
