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
                      <div data-dialog-close id="btn_close_dialog"><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full gap-4 text-justify">
                      
                    <form id=${'konversi_nilai_form'}>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Program Studi</div>
                        <fo-select value=${''} id="program_studi_id" name="program_studi_id" placeholder="Silahkan pilih disini" onchange="fetchMataKuliah()"> </fo-select>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Mata Kuliah</div>
                        <fo-select value=${''} id="mata_kuliah_id" name="mata_kuliah_id" placeholder="Silahkan pilih disini"> </fo-select>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Grade</div>
                        <fo-input type="text" id="konversi_nilai_grade" name="grade"></fo-input>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Score</div>
                        <fo-input type="number" id="konversi_nilai_score" name="score"></fo-input>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4 flex justify-end gap-2">
                        <ui-button type="button" variant="outline_orange" className="w-max flex gap-2" onclick=${() => addKonversiNilai()}>SIMPAN</ui-button>
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
  
  window.addKonversiNilai = async () => {
    const id = param.get("id");
    const form = document.getElementById("konversi_nilai_form");
    const formData = new FormData(form);
    formData.append('apply_job_id', id);
    const dialogElement = document.getElementById('btn_close_dialog');
    await API.createKonversiNilai(formData, ``)
      .then((res) => {
        toast.success("Berhasil menambahkan konversi nilai");
        getEvaluationDetail();
        dialogElement.click()
      })
      .catch((err) => {
        toast.error("Gagal menambahkan konversi nilai");
      });
  };

  let programStudiList = [];
  let mataKuliahList = [];
  const getListDropdown = async () => {
    try {
      const res = await API.getListProgramStudi(`?per_page=100`);
      programStudiList = res.data.data;
    } catch (err) {
      toast.error("Gagal mengambil data program studi");
      return;
    }

    renderSelectForm("program_studi_id", programStudiList, 'prodi')
    
  };

  window.fetchMataKuliah = async () => {
    try {
      const prodiId = document.getElementsByName("program_studi_id")[1]?.value;
      const res = await API.getListMataKuliah(`?prodi_id=${prodiId}&per_page=100`);
      mataKuliahList = res.data.data;
    } catch (err) {
      toast.error("Gagal mengambil data mata kuliah");
      return;
    }

    renderSelectForm("mata_kuliah_id", mataKuliahList, 'matkul')

  }

  function renderSelectForm(elemId, Options, type){
    const foSelectElement = document.getElementById(elemId);
    const defaultValue = foSelectElement?.getAttribute("value");
    console.log(defaultValue)

    // @ts-ignore
    if (foSelectElement && foSelectElement.choices) {
      // @ts-ignore
      foSelectElement.choices.clearStore();
      Options.forEach((option) => {
        // @ts-ignore
        // console.log(option)
        if(option){
          foSelectElement.choices.setChoices(
            [
              {
                value: type == 'prodi' ? option?.kode_program_studi : option?.id,
                label: type == 'prodi' ? option?.nama_program_studi : option?.nama,
                selected: option?.id == defaultValue,
              },
            ],
            "value",
            "label",
            false
          );
        }
      });

      // Re-render or reset state if needed
      // @ts-ignore
      foSelectElement.handleDisabled();
      // @ts-ignore
      foSelectElement.handleError();
    }
  }

  await getEvaluationDetail();
  await getListDropdown();
   
});
