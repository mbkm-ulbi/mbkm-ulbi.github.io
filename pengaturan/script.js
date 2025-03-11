// import { getListCompanies } from "../../src/js/api";

import API from "../../src/js/api/index.js";
import { slugUri } from "../../src/js/customs/settings.js";
import { getAuth, getUserInfo } from "../../src/js/libraries/cookies.js";
import { getTime, getUrlParam, isDeadlineExceeded } from "../../src/js/libraries/utilities.js";
import { toast } from "../../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

const renderEditPage = async () => {
  const auth = await getUserInfo();
  const pengaturan = document.getElementById("pengaturan");

  const urlParams = getUrlParam();
  const id = urlParams.get("id");
  let data = {};
  await API.getSettingBobotNilai()  
    .then((res) => {
      data = res.data.data;
      console.log(data)
    })
    .catch((err) => {
      toast.error("Gagal mengambil data aktivitas");
    });

  render(
    pengaturan,
    auth.role == 'prodi' ?
    html`<div class="space-y-4">
    <input type="hidden" name="id" value=${data?.id}>
    <div class="p-4 flex flex-col gap-4 rounded-md shadow-md">
      <div class="text-md font-bold">Pengaturan</div>
      <div class="border-t border-gray-300 border-dashed"></div>
      <div class="text-sm font-bold">Bobot Nilai</div>
      <div id="select-company" class="flex flex-col gap-2"></div>
      <div>
        <fo-label for="bobot_nilai_perusahaan" label="Perusahaan (%)"></fo-label>
        <div class="grid grid-cols-3">
          <fo-input type="number" id="bobot_nilai_perusahaan" name="bobot_nilai_perusahaan" value=${data?.bobot_nilai_perusahaan}></fo-input>
          <fo-error name="bobot_nilai_perusahaan"></fo-error>
        </div>
      </div>
      <div>
        <fo-label for="bobot_nilai_pembimbing" label="Pembimbing (%)"></fo-label>
        <div class="grid grid-cols-3">
          <fo-input type="number" id="bobot_nilai_pembimbing" name="bobot_nilai_pembimbing" value=${data?.bobot_nilai_pembimbing}></fo-input>
          <fo-error name="bobot_nilai_pembimbing"></fo-error>
        </div>
      </div>
      <div>
        <fo-label for="bobot_nilai_penguji" label="Penguji (%)"></fo-label>
        <div class="grid grid-cols-3">
          <fo-input type="number" id="bobot_nilai_penguji" name="bobot_nilai_penguji" value=${data?.bobot_nilai_penguji}></fo-input>
          <fo-error name="bobot_nilai_penguji"></fo-error>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <ui-button variant="default" type="submit">SIMPAN</ui-button>
      </div>
    </div>  
  </div>` : ''
  );
};

document.addEventListener("DOMContentLoaded", async function () {
  const auth = await getUserInfo();
  console.log(auth?.user)
  
  // Render Edit Page
  renderEditPage();

  //Form submit
  const form = document.getElementById("pengaturan");

  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      if (!formValidation(form, formData)) return;
      try {
        form.querySelectorAll("button, [type='submit']").forEach((element) => {
          if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
            element.setAttribute("disabled", "true");
          }
        });
        await API.updateSettingBobotNilai(formData)
          .then((res) => {
            toast.success("Berhasil edit pengaturan");
            // const succesAlert = document.getElementById("launcher");
            // succesAlert.click();
            setTimeout(() => {
              window.location.assign(`${slugUri}pengaturan`);
            }, 500);
          })
          .catch((err) => {
            toast.error("Gagal edit pengaturan");
          });
      } catch (error) {
        console.error("Login error:", error);
        console.log(error.message);
        // Tampilkan pesan error kepada pengguna
        toast.error(error.message);
      } finally {
        form.querySelectorAll("button, [type='submit']").forEach((element) => {
          if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
            element.removeAttribute("disabled");
          }
        });
      }
    });
  }
});
