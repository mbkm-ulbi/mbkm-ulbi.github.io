import API from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";
import { getUrlParam } from "../../src/js/libraries/utilities.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { formValidation } from "./validation.js";
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'
import { getUserInfo } from "../../src/js/libraries/cookies.js";


const renderEvaluationDetail = async (data) => {
  const evaluationDetail = document.getElementById("content-evaluation");
  const users = data?.apply_job?.users[0];
  const jobs = data?.apply_job?.jobs[0];
  const surat_lamaran = data?.apply_job?.surat_lamaran;
  const auth = await getUserInfo();
  const {role} = auth
  render(
    evaluationDetail,
    html`
      <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="p-4 text-lg font-bold">Konversi Nilai</div>
          <div class="border-b border-gray-300"></div>
          <div class="p-4 flex gap-4">
            <img src=${users?.profile_picture?.url ? users?.profile_picture?.url : 'https://mbkm.ulbi.ac.id/src/images/avatar_7.png'} class="w-[150px]" alt="image" />
            <div class="w-full">
              <div class="pb-2 flex gap-96">
                <div>
                  <div class="text-xs font-bold">Nama Lengkap</div>
                  <div class="text-md font-bold">${users.name}</div>
                </div>
                <div>
                  <div class="text-xs font-bold">NIM</div>
                  <div class="text-xs">${users.nim}</div>
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
                      <div>${users.phone_number}</div>
                      <div>${users?.program_study}</div>
                      <div>${users?.address}</div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 flex gap-16 text-xs">
                  <div class="font-bold space-y-2">
                    <div>Email</div>
                    <div>IPK</div>
                  </div>
                  <div class="space-y-2">
                    <div>${users.email}</div>
                    <div>${users?.ipk}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 text-md font-bold">Selesai Magang</div>
          <div class="flex flex-col text-center justify-center items-center gap-4">
            <div class="w-full p-4 flex gap-4 text-justify">
              <img src=${jobs.job_vacancy_image?.url} class="w-[150px]" alt="kandidat-image" />
              <div class="w-full">
                <div class="pb-2 flex gap-96">
                  <div>
                    <div class="text-xs font-bold">Perusahaan</div>
                    <div class="text-md font-bold">${jobs.company}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold">Posisi</div>
                    <div class="text-xs">${jobs.title}</div>
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
                        <div>${jobs.benefits}</div>
                        <div>${jobs.duration}</div>
                        <div>${jobs.job_type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Lokasi</div>
                    </div>
                    <div class="space-y-2">
                      <div>${jobs.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="py-1 border-b border-dashed border-gray-300"></div>
          <div class="p-4 text-md font-bold">Detail Konversi Nilai</div>
          <div class="px-4 flex gap-4">
            

            
          </div>
          
        </div>
      </div>
    `
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  const param = getUrlParam();
  const evaluationId = param.get("id");
  async function getEvaluationDetail() {
    await API.getListEvaluations("/" + evaluationId)
      .then((res) => {
        const data = res.data.data;
        renderEvaluationDetail(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal mengambil data penilaian");
      });
  }
  await getEvaluationDetail();
    let arrayRoleEvaluation = ['company', 'prodi', 'lecturer', 'examiner']
    for (let index = 0; index < arrayRoleEvaluation.length; index++) {
      const element = arrayRoleEvaluation[index];
      const form = document.getElementById(element + "-evaluation-form");
      if (form instanceof HTMLFormElement) {
          form.addEventListener("submit", async (event) => {
              event.preventDefault();
              const formData = new FormData(form);
              formData.append("apply_job_id", evaluationId);
              formData.append("is_examiner", element === "examiner" ? "1" : "0");
  
              await API.createEvaluation(formData).then(async (res) => {
                  toast.success("Berhasil menambahkan penilaian");
                  await getEvaluationDetail();
              }).catch((err) => {
                  toast.error("Gagal menambahkan penilaian");
              });
          });
      }
    }
   
});
