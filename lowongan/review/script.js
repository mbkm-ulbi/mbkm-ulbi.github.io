import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getAuth } from "../../src/js/libraries/cookies.js";

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
  const auth = await getAuth();
  const parseAuth = JSON.parse(auth);
  if (parseAuth.role === "superadmin" || parseAuth.role === "prodi" || parseAuth.role === "cdc" || parseAuth.role === "perusahaan") {
    renderApprovalButton();
  } else {
    renderApplyButton();
  }
});
