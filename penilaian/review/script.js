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
          <div class="p-4 text-lg font-bold">Penilaian Kandidat</div>
          <div class="border-b border-gray-300"></div>
          <div class="p-4 flex gap-4">
            <img src=${users?.profile_picture?.url} class="w-[150px]" alt="kandidat-image" />
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
          <div class="p-4 text-md font-bold">Laporan Kandidat</div>
          <div class="px-4 flex gap-4">
            <div class="w-full">
              <fo-uploaded fileurl=${surat_lamaran?.url} filename=${surat_lamaran?.file_name} className="mb-2"></fo-uploaded>
              <fo-error name="fileUpload"></fo-error>
            </div>

            <ui-dialog name="lihat-laporan">
              <div class="flex flex-col text-center justify-center items-center gap-4">
                <div class="pb-2 w-full flex justify-between items-center border-b border-gray-300">
                  <div class="test-md font-bold">Laporan Magang</div>
                  <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-red-600" noobserver></iconify-icon></div>
                </div>
                <div class="w-full flex gap-4 text-justify">
                  <img src="src/images/dummy_foto_kandidat.png" width="[250px]" alt="kandidat-image" />
                  <div class="w-full">
                    <div class="pb-2 flex gap-96">
                      <div>
                        <div class="text-xs font-bold">Nama Lengkap</div>
                        <div class="text-md font-bold">Darmaji Setiaji Ngahiji</div>
                      </div>
                      <div>
                        <div class="text-xs font-bold">NIM</div>
                        <div class="text-xs">000000000123</div>
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
                            <div>08123456789</div>
                            <div>D3-Manajemen Bisnis</div>
                            <div>Jl. Bersama Kamu Selamanya No. 123, Kota Apa Saja, Jawa Utara 40000</div>
                          </div>
                        </div>
                      </div>
                      <div class="pt-2 flex gap-16 text-xs">
                        <div class="font-bold space-y-2">
                          <div>Email</div>
                          <div>IPK</div>
                        </div>
                        <div class="space-y-2">
                          <div>darmaji@mail.com</div>
                          <div>3.5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-4 w-full h-[260px] flex flex-col overflow-scroll gap-2 border border-dashed border-gray-300 rounded-md text-xs text-justify">
                  <h1 class="font-bold">LAPORAN KEGIATAN MAGANG MAHASISWA</h1>
                  <div class="details">
                    <p>Nama Mahasiswa: Ahmad Yusran</p>
                    <p>NIM: 123456789</p>
                    <p>Program Studi: Akuntansi</p>
                    <p>Perusahaan: PT ABC Sejahtera</p>
                    <p>Departemen: Keuangan</p>
                    <p>Periode Magang: 1 Agustus 2024 – 31 Agustus 2024</p>
                  </div>
                  <h2 class="font-bold">RINCIAN KEGIATAN MAGANG</h2>
                  <div class="activities">
                    <h3>Senin, 1 Agustus 2024</h3>
                    <ul>
                      <li>Pengarahan Awal Dari Supervisor Terkait Tugas-Tugas Selama Magang.</li>
                      <li>Pengenalan Software Akuntansi Yang Digunakan Oleh Perusahaan (Accurate).</li>
                      <li>Memeriksa Kelengkapan Dokumen Untuk Pengajuan Reimbursement Karyawan.</li>
                      <li>Menginput Data Transaksi Kas Kecil (Petty Cash) Ke Dalam Sistem.</li>
                    </ul>
                    <h3>Selasa, 2 Agustus 2024</h3>
                    <ul>
                      <li>Melakukan Pengarsipan Dokumen Keuangan Secara Manual Dan Digital.</li>
                      <li>Mempersiapkan Pengajuan Dana Untuk Kebutuhan Operasional Perusahaan.</li>
                      <li>Membantu Dalam Proses Rekonsiliasi Bank Harian Dengan Supervisor.</li>
                      <li>Mengecek Bukti Transaksi Pembelian Barang Perusahaan.</li>
                    </ul>
                  </div>
                </div>

                <div class="mt-2 w-full flex justify-between items-center">
                  <div class="flex gap-4 text-xs">
                    <div class="flex gap-2 items-center">
                      <iconify-icon icon="solar:check-circle-bold" height="22" class="text-green-500" noobserver></iconify-icon>
                      <div>Selesai Dibuat Oleh Mahasiswa</div>
                    </div>
                    <div class="flex gap-2 items-center">
                      <iconify-icon icon="solar:check-circle-bold" height="22" class="text-green-500" noobserver></iconify-icon>
                      <div>Disetujui Oleh Perusahaan</div>
                    </div>
                    <div class="flex gap-2 items-center">
                      <iconify-icon icon="solar:check-circle-bold" height="22" class="text-green-500" noobserver></iconify-icon>
                      <div>Disetujui Oleh Dosen Wali</div>
                    </div>
                    <div class="flex gap-2 items-center">
                      <iconify-icon icon="solar:check-circle-bold" height="22" class="text-green-500" noobserver></iconify-icon>
                      <div>Disetujui Oleh Prodi</div>
                    </div>
                  </div>
                  <ui-button className="w-max flex gap-2">
                    <iconify-icon icon="solar:download-square-bold" height="22" class="text-white" noobserver></iconify-icon>
                    DOWNLOAD
                  </ui-button>
                </div>
              </div>
            </ui-dialog>
          </div>
          <div class="py-1 border-b border-dashed border-gray-300"></div>
          <div class="p-4 text-md font-bold">Penilaian Kandidat</div>
          <div class="px-4 flex flex-col gap-4">
            <div class="flex gap-8 items-center">
              <span class="w-32 text-xs font-bold">Nilai Akhir</span>
              <div class="flex gap-0 text-xs font-bold text-white text-center">
                <div class="px-4 py-2 bg-blue-900 rounded-l-md">${data.grade}</div>
                <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
              </div>
            </div>
            <div class="flex gap-8 items-center">
              <span class="w-32 text-xs font-bold">Perhitungan Nilai</span>
              <div class="text-xs">100 + 70 + 10 /3 = 60</div>
            </div>
            <div class="mb-4 w-full flex flex-col border border-gray-300 rounded-md">
            
              <form id="evaluation-form">
              <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border border-gray-300">
                  <div class="flex items-center font-semibold">
                    <div class="w-60">Penilaian Dari Perusahaan</div>
                    ${data.company_grade? html`<div class="w-12">${data.company_grade_score}</div>
                    <div class="flex gap-0 text-xs font-bold text-white text-center">
                      <div class="px-4 py-2 bg-blue-900 rounded-l-md">${data.company_grade}</div>
                      <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                    </div>`:''}
                    
                  </div>
                  ${data.company_grade_date ? html`  <div class="flex gap-4 text-xs">
                    <div><span class="font-bold">Dinilai oleh: </span>-</div>
                    <div><span class="font-bold">Dinilai pada tanggal: </span>${moment(data?.company_grade_date).format("DD MMMM YYYY")}</div>
                  </div>`: ''}
                
                </div>
                ${data.company_grade_description
                  ? html`<div class="p-4 text-xs">
                      <p>
                        ${data.company_grade_description}
                      </p>
                    </div>`
                  : html`
                      <div class="p-4 grid grid-cols-2 gap-x-6 gap-y-3 w-full">
                        <div>
                          <fo-label for="grade_score" label="Nilai Angka"></fo-label>
                          <fo-input name="grade_score" placeholder="90" type="number"></fo-input>
                          <fo-error name="grade_score"></fo-error>
                        </div>
                         <div>
                          <fo-label for="grade" label="Nilai Huruf"></fo-label>
                          <fo-input name="grade" placeholder="A" type="text"></fo-input>
                          <fo-error name="grade"></fo-error>
                        </div>
                      </div>
                      <div class="p-4 w-full">
                        <div>
                          <fo-label for="grade_description" label="Deskripsi"></fo-label>
                          <textarea name="grade_description" class="w-full h-24 border border-gray-300 rounded-md p-2"></textarea>
                          <fo-error name="grade_description"></fo-error>
                        </div>
                      </div>
                      <div class="p-4 flex justify-end">
                        <ui-button type="submit">Simpan</ui-button>
                      </div>
                    `}
                <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border border-gray-300">
                  <div class="flex items-center font-semibold">
                    <div class="w-60">Penilaian Dari Dosen</div>
                    ${data.lecturer_grade? html`<div class="w-12">${data.lecturer_grade_score}</div>
                    <div class="flex gap-0 text-xs font-bold text-white text-center">
                      <div class="px-4 py-2 bg-blue-900 rounded-l-md">${data.lecturer_grade}</div>
                      <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                    </div>`:''}
                    
                  </div>
                  ${data.lecturer_grade_date ? html`  <div class="flex gap-4 text-xs">
                    <div><span class="font-bold">Dinilai oleh: </span>-</div>
                    <div><span class="font-bold">Dinilai pada tanggal: </span>${moment(data?.lecturer_grade_date).format("DD MMMM YYYY")}</div>
                  </div>`: ''}
                
                </div>
                ${data.lecturer_grade_description
                  ? html`<div class="p-4 text-xs">
                      <p>
                        ${data.lecturer_grade_description}
                      </p>
                    </div>`
                  : html`
                      <div class="p-4 grid grid-cols-2 gap-x-6 gap-y-3 w-full">
                        <div>
                          <fo-label for="grade_score" label="Nilai Angka"></fo-label>
                          <fo-input name="grade_score" placeholder="90" type="number"></fo-input>
                          <fo-error name="grade_score"></fo-error>
                        </div>
                         <div>
                          <fo-label for="grade" label="Nilai Huruf"></fo-label>
                          <fo-input name="grade" placeholder="A" type="text"></fo-input>
                          <fo-error name="grade"></fo-error>
                        </div>
                      </div>
                      <div class="p-4 w-full">
                        <div>
                          <fo-label for="grade_description" label="Deskripsi"></fo-label>
                          <textarea name="grade_description" class="w-full h-24 border border-gray-300 rounded-md p-2"></textarea>
                          <fo-error name="grade_description"></fo-error>
                        </div>
                      </div>
                      <div class="p-4 flex justify-end">
                        <ui-button type="submit">Simpan</ui-button>
                      </div>
                    `}
                <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border border-gray-300">
                  <div class="flex items-center font-semibold">
                    <div class="w-60">Penilaian Dari Prodi</div>
                    ${data.prodi_grade? html`<div class="w-12">${data.prodi_grade_score}</div>
                    <div class="flex gap-0 text-xs font-bold text-white text-center">
                      <div class="px-4 py-2 bg-blue-900 rounded-l-md">${data.prodi_grade}</div>
                      <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                    </div>`:''}
                    
                  </div>
                  ${data.prodi_grade_date ? html`  <div class="flex gap-4 text-xs">
                    <div><span class="font-bold">Dinilai oleh: </span>-</div>
                    <div><span class="font-bold">Dinilai pada tanggal: </span>${moment(data?.prodi_grade_date).format("DD MMMM YYYY")}</div>
                  </div>`: ''}
                
                </div>
                ${data.prodi_grade_description
                  ? html`<div class="p-4 text-xs">
                      <p>
                        ${data.prodi_grade_description}
                      </p>
                    </div>`
                  : html`
                      <div class="p-4 grid grid-cols-2 gap-x-6 gap-y-3 w-full">
                        <div>
                          <fo-label for="grade_score" label="Nilai Angka"></fo-label>
                          <fo-input name="grade_score" placeholder="90" type="number"></fo-input>
                          <fo-error name="grade_score"></fo-error>
                        </div>
                         <div>
                          <fo-label for="grade" label="Nilai Huruf"></fo-label>
                          <fo-input name="grade" placeholder="A" type="text"></fo-input>
                          <fo-error name="grade"></fo-error>
                        </div>
                      </div>
                      <div class="p-4 w-full">
                        <div>
                          <fo-label for="grade_description" label="Deskripsi"></fo-label>
                          <textarea name="grade_description" class="w-full h-24 border border-gray-300 rounded-md p-2"></textarea>
                          <fo-error name="grade_description"></fo-error>
                        </div>
                      </div>
                      <div class="p-4 flex justify-end">
                        <ui-button type="submit">Simpan</ui-button>
                      </div>
                    `}
                    </form>
            </div>
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

    const form = document.getElementById("evaluation-form");
    if (form instanceof HTMLFormElement) {
        form.addEventListener("submit", async (event) => {
            alert("submit");
            event.preventDefault();
            const formData = new FormData(form);
            formData.append("apply_job_id", evaluationId);
            // if(!formValidation(form, formData)) return;
            console.log(formData.get("grade"));
            console.log(formData.get("grade_score"));
            console.log(formData.get("grade_description"));
            console.log(formData.get("apply_job_id"));

            await API.createEvaluation(formData).then(async (res) => {
                toast.success("Berhasil menambahkan penilaian");
                await getEvaluationDetail();
            }).catch((err) => {
                toast.error("Gagal menambahkan penilaian");
            });
        });
    }
});