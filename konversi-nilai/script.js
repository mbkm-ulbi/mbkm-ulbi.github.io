import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapPenilaianDummy } from "../kandidat/dummyKandidat.js";
import { getAuth, getUserInfo } from "../src/js/libraries/cookies.js";
import API from "../src/js/api/index.js";
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'
import { toast } from "../src/js/libraries/notify.js";


const fetchPenilaian = async () => {
  const rekap = await rekapPenilaianDummy();

  render(
    document.getElementById("rekapPenilaian"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:medal-star-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Konversi Nilai</span>
        </div>
      </div>
    `
  );
};

const fetchTabelPenilaian = async (list) => {

  render(
    document.getElementById("tabelPenilaian"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            <td>${moment(item.created_at).format("DD MMMM YYYY hh:mm")}</td>
            <td>${item.apply_job.users[0].name}</td>
            <td>${item.apply_job?.jobs[0]?.job_type}</td>
            <td>${item.apply_job?.jobs[0]?.company}</td>
            <td>${item.apply_job?.jobs[0]?.title}</td>
            <td>${item.apply_job.users[0].program_study}</td>
            <td>
              ${item.status === "Sudah Dinilai"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>Belum Ada Konversi</ui-badge>`
                : item.status === "Draft"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                : item.status === "Belum Dinilai"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <a href=${"/konversi-nilai/detail/index.html?id="+item?.apply_job_id}><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></a>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------


const renderPenilaian = (total) =>{
  const penilaian = document.getElementById("content-konversi-nilai");
  
  render(
    penilaian,
    html`
       <div class="space-y-4">
        <div class="px-12 py-4 rounded-md shadow-md">
          <div id="rekapPenilaian" class="flex justify-between">
            <div class="flex items-center gap-2">
              <iconify-icon icon="solar:medal-star-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <span class="text-lg text-ulbiBlue font-bold">Konversi Nilai</span>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Total</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Sudah Dinilai</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Belum Dinilai</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Draft</div>
              <div class="text-xl font-bold">...</div>
            </div>
          </div>
        </div>
        <div class="px-4 py-4 space-y-4 rounded-md shadow-md">
          <div class="grid grid-cols-5 gap-2 text-xs">
            <div>
              <div class="mb-2 font-semibold">Nama</div>
              <fo-select>
                <option>Semua</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Tipe</div>
              <fo-select>
                <option>Semua</option>
                <option>Magang</option>
                <option>Kerja</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Nilai</div>
              <fo-select>
                <option>Semua</option>
                <option>A+</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Status</div>
              <fo-select>
                <option>Semua</option>
                <option>Belum Dinilai</option>
                <option>Draft</option>
                <option>Sudah Dinilai</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Tanggal</div>
              <fo-select>
                <option>Terbaru</option>
              </fo-select>
            </div>
          </div>
          <div>
            <ui-table>
              <table>
                <thead>
                  <tr>
                    <th>TANGGAL SELESAI</th>
                    <th>NAMA</th>
                    <th>TIPE</th>
                    <th>PERUSAHAAN</th>
                    <th>POSISI</th>
                    <th>PRODI</th>
                    <th>STATUS KONVERSI</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="tabelPenilaian">
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="99" class="text-center">
                      <div class="bg-gray-200 h-8 animate-pulse rounded"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </ui-table>
          </div>
          <div><ui-pagination data-pagination-count=${total} data-pagination-limit=${10} data-pagination-page=${1}/></div>
        </div>
      </div>
    `
  )
}
const renderPenilaianMahasiswa = async (data) =>{
  const penilaian = document.getElementById("content-konversi-nilai");
  const users = data?.users[0];
  const jobs = data?.jobs[0];
  const reports = data?.reports?.file_laporan;
  const evaluations = data?.evaluations


  render(
    penilaian,
    html`
     <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="p-4 text-lg font-bold">Konversi Nilai</div>
          <div class="border-b border-gray-300"></div>
          <div class="p-4 flex gap-4">
            <img src=${users?.profile_picture?.url} class="w-[150px]"  alt="kandidat-image" />
            <div class="w-full">
              <div class="pb-2 flex gap-96">
                <div>
                  <div class="text-xs font-bold">Nama Lengkap</div>
                  <div class="text-md font-bold">${users?.name}</div>
                </div>
                <div>
                  <div class="text-xs font-bold">NIM</div>
                  <div class="text-xs">${users?.nim}</div>
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
                      <div>${users?.phone_number}</div>
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
                    <div>${users?.email}</div>
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
              <fo-uploaded
                fileurl=${reports?.url}
                filename=${reports?.name}
                className="mb-2"
              ></fo-uploaded>
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
                <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.grade || "-"}</div>
                <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
              </div>
            </div>
            <div class="flex gap-8 items-center">
              <span class="w-32 text-xs font-bold">Perhitungan Nilai</span>
              <div class="text-xs">${evaluations?.nilai_akhir?.perhitungan_nilai_text}</div>
            </div>
            <div class="mb-4 w-full flex flex-col border border-gray-300 rounded-md">
              <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border-b border-gray-300">
                <div class="flex items-center font-semibold">
                  <div class="w-60">Penilaian Dari Perusahaan</div>
                  <div class="w-12">${evaluations?.company_grade_score || "-"}</div>
                  
                  <div class="flex gap-0 text-xs font-bold text-white text-center">
                    <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.company_grade || "-"}</div>
                    <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                  </div>
                  
                </div>
                <div class="flex gap-4 text-xs">
                  <div><span class="font-bold">Bobot Nilai: </span>${evaluations?.bobot_nilai?.bobot_nilai_perusahaan}</div>
                  
                  <div><span class="font-bold">Dinilai pada tanggal: </span>${evaluations?.company_grade_date ? moment(evaluations?.company_grade_date).format("DD MMMM YYYY") : '-'}</div>
                </div>
              </div>
              <div class="p-4 text-xs">
                <p>
                 ${evaluations?.company_grade_description || "-"}
                </p>
              </div>
              <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border-b border-gray-300">
                <div class="flex items-center font-semibold">
                  <div class="w-60">Penilaian Dari Dosen Wali</div>
                  <div class="w-12">${evaluations?.lecturer_grade_score || "-"}</div>
                  <div class="flex gap-0 text-xs font-bold text-white text-center">
                    <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.lecturer_grade || "-"}</div>
                    <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                  </div>
                </div>
                <div class="flex gap-4 text-xs">
                  <div><span class="font-bold">Bobot Nilai: </span>${evaluations?.bobot_nilai?.bobot_nilai_pembimbing}</div>
                  
                  <div><span class="font-bold">Dinilai pada tanggal: </span>${evaluations?.lecturer_grade_date ? moment(evaluations?.lecturer_grade_date).format("DD MMMM YYYY") : '-'}</div>
                </div>
              </div>
              <div class="p-4 text-xs">
                <p>
                 ${evaluations?.lecturer_grade_description || "-"}
                </p>
              </div>
               <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border-b border-gray-300">
                <div class="flex items-center font-semibold">
                  <div class="w-60">Penilaian Dari Dosen Penguji</div>
                  <div class="w-12">${evaluations?.examiner_grade_score || "-"}</div>
                  <div class="flex gap-0 text-xs font-bold text-white text-center">
                    <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.examiner_grade || "-"}</div>
                    <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                  </div>
                </div>
                <div class="flex gap-4 text-xs">
                  <div><span class="font-bold">Bobot Nilai: </span>${evaluations?.bobot_nilai?.bobot_nilai_penguji}</div>
                  
                  <div><span class="font-bold">Dinilai pada tanggal: </span>${evaluations?.examiner_grade_date ? moment(evaluations?.examiner_grade_date).format("DD MMMM YYYY") : '-'}</div>
                </div>
              </div>
              <div class="p-4 text-xs">
                <p>
                 ${evaluations?.examiner_grade_description || "-"}
                </p>
              </div>
              <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border-b border-gray-300">
                <div class="flex items-center font-semibold">
                  <div class="w-60">Nilai Akhir</div>
                  <div class="w-12">${evaluations?.nilai_akhir?.grade != '-' ? evaluations?.nilai_akhir?.total_score : "-"}</div>
                  <div class="flex gap-0 text-xs font-bold text-white text-center">
                    <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.nilai_akhir?.grade}</div>
                    <div class="px-4 py-2 bg-red-600 rounded-r-md">-</div>
                  </div>
                </div>
                <div class="flex gap-4 text-xs">
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  )
}
const renderNotEligible = () => {
  const contentLaporan = document.getElementById("content-konversi-nilai");
  render(
    contentLaporan,
    html`
       <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
           <div class="w-full p-1 flex gap-1 justify-center items-center flex-col">
           <img src="src/images/grades.svg" class="w-[40rem]"></img>
           <div class="text-md mb-10">Belum ada penilaian yang diberikan</div>
           </div>
          </div>
        </div>
       </div>
    `
  )
}
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();

  if (auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra") {
    let dataEvaluation = [];
    let total = 0
    // Mendapatkan data awal pada halaman 1
    await API.getListEvaluations(`?page=1&per_page=10`)
      .then((res) => {
        dataEvaluation = res?.data?.data;
        total = res?.data?.count;
      })
      .catch((err) =>{
        console.error(err);
         toast.error("Gagal memuat data penilaian")});

    // Render awal
    renderPenilaian(total);
    fetchPenilaian();
    fetchTabelPenilaian(dataEvaluation);

    // Menangani pagination page change
    const pagination = document.querySelector("ui-pagination");
    if (pagination) {
      pagination.addEventListener("pagination-page-change", async (event) => {
        const { page } = event.detail; // Mendapatkan halaman baru dari event
        try {
          const res = await API.getListEvaluations(`?page=${page}&per_page=10`);
          const newData = res?.data?.data || [];
          fetchTabelPenilaian(newData); // Memperbarui tabel dengan data baru
        } catch (error) {
          console.error("Gagal memuat data penilaian:", error);
          toast.error("Gagal memuat data penilaian");
        }
      });
    }
  } else if (auth.role === "mahasiswa") {
    await API.getListCandidate(`/user/${auth.user.id}/last`)
      .then((res) => {
        const dataLamaran = res?.data?.data || {};
        if (Object.keys(dataLamaran).length > 0 && typeof dataLamaran === "object") {
          renderPenilaianMahasiswa(dataLamaran);
        } else {
          renderNotEligible();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat data penilaian");
      });
  }
});
