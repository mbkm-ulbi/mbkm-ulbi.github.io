import API, { getListCompanies, postApply } from "../../src/js/api/index.js";
import { getUserInfo } from "../../src/js/libraries/cookies.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getUrlParam } from "../../src/js/libraries/utilities.js";
import { toast } from "../../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";
import { slugUri } from "../../src/js/customs/settings.js";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";

const renderMyInfo = (auth) => {
  const myInfo = document.getElementById("my-info");
  render(
    myInfo,
    html` <div class="bg-white rounded-lg border flex p-4">
      <div class="flex-shrink-0">
        <img
          alt="Profile picture of a smiling person with a blue background"
          class="w-22 h-22 object-cover"
          height="100"
          src=${auth?.user?.profile_picture?.url}
          width="100"
        />
      </div>
      <div class="ml-4">
        <h2 class="text-lg font-semibold text-gray-800">${auth?.user?.name}</h2>
        <div class="flex items-center text-gray-600 mt-1 text-sm">
          <i class="fas fa-university text-orange-500 mr-2"> </i>
          <span> ${auth?.user?.faculty} </span>
        </div>
        <div class="flex items-center text-gray-600 mt-1 text-sm">
          <i class="fas fa-user text-orange-500 mr-2"> </i>
          <span> NIM: ${auth?.user?.nim} </span>
        </div>
        <div class="flex items-center text-gray-600 mt-1 text-sm">
          <i class="fas fa-file-alt text-orange-500 mr-2"> </i>
          <span> IPK ${auth?.user?.ipk ?? "-"} </span>
        </div>
      </div>
    </div>`
  );
};

const renderCompanyInfo = (company) => {
  const companyInfo = document.getElementById("company-info");
  render(
    companyInfo,
    html`
        <div class="bg-white rounded-lg border flex p-4">
                  <div class="flex-shrink-0">
                   <img alt="Profile picture of a smiling person with a blue background" class="w-22 h-22 object-cover" height="100" src=${
                     company?.job_vacancy_image?.url
                   } width="100"/>
                  </div>
                  <div class="ml-4">
                   <h2 class="text-lg font-semibold text-gray-800">
                    ${company.title}
                   </h2>
                   <div class="flex items-center text-gray-600 mt-1 text-sm">
                    <iconify-icon icon="solar:buildings-bold-duotone" class="text-ulbiOrange mr-2" noobserver></iconify-icon>

                    <span>
                    ${company.company}
                    </span>
                   </div>
                   <div class="flex items-center text-gray-600 mt-1 text-sm">
                    <iconify-icon icon="solar:map-point-bold-duotone" class="text-ulbiOrange mr-2" noobserver></iconify-icon>

                    </i>
                    <span>
                    ${company.location}
                    </span>
                   </div>
                   <div class="flex items-center text-gray-600 mt-1 text-sm">
                    <iconify-icon icon="solar:buildings-bold-duotone"  class="text-ulbiOrange mr-2" noobserver></iconify-icon>

                    <span>
                      Batas Akhir Pendaftaran: ${moment(company.deadline).format("DD MMMM YYYY")}
                    </span>
                   </div>
                  </div>
                 </div>
        `
  );
};
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();
  renderMyInfo(auth);
  if (auth) {
    //@ts-ignore
    document.getElementById("apply-job-form").elements.namedItem("email").value = auth.user.email;
    //@ts-ignore
    document.getElementById("apply-job-form").elements.namedItem("telepon").value = auth.user.phone_number;
    //@ts-ignore
    document.getElementById("apply-job-form").elements.namedItem("alamat").value = auth.user.address;
  }
  const param = getUrlParam();
  const companyId = param.get("id");
  await API.getListJob(`/${companyId}`).then((res) => {
    const company = res.data.data;
    renderCompanyInfo(company);
  });
});

const form = document.getElementById("apply-job-form");
if (form instanceof HTMLFormElement) {
  const auth = await getUserInfo();
  const param = getUrlParam();
  const id = param.get("id");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Ambil data dari forms
    const formData = new FormData(form);
    formData.append("users[]", auth?.user?.id);
    formData.append("jobs[]", id);
    console.log("dhs", formData.get("dhs"));
    console.log("surat_lamaran", formData.get("surat_lamaran"));
    console.log("cv", formData.get("cv"));
    console.log("surat_rekomendasi_prodi", formData.get("surat_rekomendasi_prodi"));
    // Validasi form sebelum melanjutkan
    if (!formValidation(form, formData)) return;

    try {
      form.querySelectorAll("button, [type='submit']").forEach((element) => {
        if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
          element.setAttribute("disabled", "true");
        }
      });

      await postApply(formData)
        .then((res) => {
          toast.success("Berhasil melamar pekerjaan");
          setTimeout(() => {
            window.location.assign(`${slugUri}lowongan`);
          }, 1000);
        })
        .catch((err) => {
          toast.error("Gagal melamar pekerjaan");
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
