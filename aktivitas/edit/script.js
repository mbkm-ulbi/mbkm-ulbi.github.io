// import { getListCompanies } from "../../src/js/api";

import API, { postLogin, getMonthlyLogById } from "../../src/js/api/index.js";
import { slugUri } from "../../src/js/customs/settings.js";
import { getAuth, getUserInfo } from "../../src/js/libraries/cookies.js";
import { getTime, getUrlParam, isDeadlineExceeded } from "../../src/js/libraries/utilities.js";
import { toast } from "../../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

const renderEditPage = async () => {
  const editAktivitas = document.getElementById("edit-aktivitas");

  const urlParams = getUrlParam();
  const id = urlParams.get("id");
  let data = {};
  await getMonthlyLogById(`/${id}`)
    .then((res) => {
      data = res.data.data;
      console.log(data)
    })
    .catch((err) => {
      toast.error("Gagal mengambil data aktivitas");
    });

  render(
    editAktivitas,
    html`<div class="space-y-4">
    <input type="hidden" name="id" value=${data.id}>
    <div class="p-4 flex flex-col gap-4 rounded-md shadow-md">
      <div class="text-md font-bold">Edit Aktivitas</div>
      <div class="border-t border-gray-300 border-dashed"></div>
      <div id="select-company" class="flex flex-col gap-2"></div>
      <div>
        <fo-label for="start_date" label="Tanggal Mulai"></fo-label>
        <div class="grid grid-cols-3">
          <fo-input type="date" id="start_date" name="start_date" value=${data.start_date}></fo-input>
          <fo-error name="start_date"></fo-error>
        </div>
      </div>
      <div>
        <fo-label for="end_date" label="Tanggal Selesai"></fo-label>
        <div class="grid grid-cols-3">
          <fo-input type="date" id="end_date" name="end_date" value=${data.end_date}></fo-input>
          <fo-error name="end_date"></fo-error>
        </div>
      </div>
        <div class="">
        <fo-label for="hasil" label="Hasil"></fo-label>
        <fo-textarea id="hasil" name="hasil" value="${data.hasil}"></fo-textarea>
      </div>
      <div class="">
        <fo-label for="content" label="Deskripsi Aktivitas"></fo-label>
        <fo-textarea id="content" name="content" value="${data.content}"></fo-textarea>
      </div>
      <div class="flex justify-between items-center">
        <ui-button color="red" href="aktivitas/">BATAL</ui-button>
        <ui-button variant="default" type="submit">KIRIM</ui-button>
      </div>
    </div>  
  </div>`
  );
};

document.addEventListener("DOMContentLoaded", async function () {
  const auth = await getUserInfo();
  console.log(auth?.user)
  
  // Render Edit Page
  renderEditPage();

  //Form submit
  const form = document.getElementById("edit-aktivitas");

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
        await API.updateMonthlyLogs(formData)
          .then((res) => {
            toast.success("Berhasil edit aktivitas");
            // const succesAlert = document.getElementById("launcher");
            // succesAlert.click();
            setTimeout(() => {
              window.location.assign(`${slugUri}aktivitas`);
            }, 500);
          })
          .catch((err) => {
            toast.error("Gagal edit aktivitas");
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
