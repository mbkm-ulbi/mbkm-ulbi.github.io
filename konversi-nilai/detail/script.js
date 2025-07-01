import API from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";
import { getUrlParam } from "../../src/js/libraries/utilities.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { formValidation } from "./validation.js";
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'
import { getUserInfo } from "../../src/js/libraries/cookies.js";


const renderEvaluationDetail = async (data) => {
  const evaluationDetail = document.getElementById("content-evaluation");
  const users = data?.users[0];
  const jobs = data?.jobs[0];
  const surat_lamaran = data?.surat_lamaran;
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
          <div class="p-4 text-md font-bold">
          <ui-button type="button" variant="outline_orange" className="w-max flex gap-2" data-dialog-trigger=${`add-konversi-nilai`}>Tambah Konversi Nilai</ui-button>
          </div>
          <div class="px-4 flex gap-4">            
                <ui-dialog name=${`add-konversi-nilai`} className="w-[750px] h-auto p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Tambah Konversi Nilai</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full gap-4 text-justify">
                      
                    <form id=${'konversi_nilai_form'}>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Fakultas</div>
                        <fo-select value=${''} id=${'lecturer_id_'} name="lecturer_id" placeholder="Silahkan pilih disini"> </fo-select>
                        <fo-error name="lecturer_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Program Studi</div>
                        <fo-select value=${''} id=${'examiner_id_'} name="examiner_id" placeholder="Silahkan pilih disini"> </fo-select>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Mata Kuliah</div>
                        <fo-select value=${''} id=${'examiner_id_'} name="examiner_id" placeholder="Silahkan pilih disini"> </fo-select>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Grade</div>
                        <fo-input type="text" id="konversi_nilai_grade" name="konversi_nilai_grade"></fo-input>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Score</div>
                        <fo-input type="number" id="konversi_nilai_score" name="konversi_nilai_score"></fo-input>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4 flex justify-end gap-2">
                        <ui-button type="submit" variant="outline_orange" className="w-max flex gap-2">SIMPAN</ui-button>
                      </div>
                    </form>
                    </div>
                  </div>
                </ui-dialog>
          </div>
          <div class="px-4 gap-4">
            <ui-table>
              <table>
                <thead>
                  <tr>
                    <th style="text-align:left">MATA KULIAH</th>
                    <th style="text-align:left">GRADE</th>
                    <th style="text-align:left">SCORE</th>
                  </tr>
                </thead>
                <tbody id="tabelMataKuliah">
                </tbody>
              </table>
            </ui-table>
          </div>
          <div class="px-4 gap-4"><br><br><br></div>
          
        </div>
      </div>
    `
  );
};


const fetchMataKuliah = async (list) => {
  console.log(list)
  render(
    document.getElementById("tabelMataKuliah"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            <td>${item.mata_kuliah?.nama}</td>
            <td>${item.grade}</td>
            <td>${item.score}</td>
          </tr>
        `;
      })}
    `
  );
};

document.addEventListener("DOMContentLoaded", async () => {
  const param = getUrlParam();
  const evaluationId = param.get("id");
  async function getEvaluationDetail() {
    await API.getListKonversiNilai("/" + evaluationId)
      .then((res) => {
        const data = res.data.data;
        renderEvaluationDetail(data);
        setTimeout(function(){
          fetchMataKuliah(data?.konversi_nilai);
        }, 100)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal mengambil data penilaian");
      });
  }
  const addKonversiNilai = async (id) => {
    const form = document.getElementById("konversi_nilai_form");
    const formData = new FormData(form);
    await API.createKonversiNilai(formData, `/${id}/done`)
      .then((res) => {
        toast.success("Berhasil menambahkan konversi nilai");
        getEvaluationDetail();
      })
      .catch((err) => {
        toast.error("Gagal menyelesaikan magang");
      });
  };

  await getEvaluationDetail();
   
});
