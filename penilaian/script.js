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
          <span class="text-lg text-ulbiBlue font-bold">Penilaian</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Sudah Dinilai</div>
          <div class="text-xl font-bold">${rekap.sudahDinilai}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Belum Dinilai</div>
          <div class="text-xl font-bold">${rekap.belumDinilai}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Draft</div>
          <div class="text-xl font-bold">${rekap.draft}</div>
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
            <td>${item.type}</td>
            <td>${item.company_personnel?.name}</td>
            <td>${item.position}</td>
            <td>${item.studyProgramme}</td>
            <td>${item.grade}</td>
            <td>
              ${item.status === "Sudah Dinilai"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                : item.status === "Draft"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                : item.status === "Belum Dinilai"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <a href="/penilaian/penilaianKandidat"><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></a>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------


const renderPenilaian = () =>{
  const penilaian = document.getElementById("content-penilaian");
  render(
    penilaian,
    html`
       <div class="space-y-4">
        <div class="px-12 py-4 rounded-md shadow-md">
          <div id="rekapPenilaian" class="flex justify-between">
            <div class="flex items-center gap-2">
              <iconify-icon icon="solar:medal-star-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <span class="text-lg text-ulbiBlue font-bold">Penilaian</span>
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
                    <th>NILAI</th>
                    <th>PENILAIAN</th>
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
          <div><ui-pagination /></div>
        </div>
      </div>
    `
  )
}
const renderPenilaianMahasiswa = async () =>{
  const penilaian = document.getElementById("content-penilaian");
  let data = {}
  await API.getUsers().then((res)=>{
    data = res?.data
  })
  render(
    penilaian,
    html`
     <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="p-4 text-lg font-bold">Penilaian Kandidat</div>
          <div class="border-b border-gray-300"></div>
          <div class="p-4 flex gap-4">
            <img src=${data?.user?.profile_picture?.url} class="w-[150px]"  alt="kandidat-image" />
            <div class="w-full">
              <div class="pb-2 flex gap-96">
                <div>
                  <div class="text-xs font-bold">Nama Lengkap</div>
                  <div class="text-md font-bold">${data?.user?.name}</div>
                </div>
                <div>
                  <div class="text-xs font-bold">NIM</div>
                  <div class="text-xs">${data?.user?.nim}</div>
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
                      <div>${data?.user?.phone_number}</div>
                      <div>${data?.user?.program_study}</div>
                      <div>${data?.user?.address}</div>
                    </div>
                  </div>
                </div>
                <div class="pt-2 flex gap-16 text-xs">
                  <div class="font-bold space-y-2">
                    <div>Email</div>
                    <div>IPK</div>
                  </div>
                  <div class="space-y-2">
                    <div>${data?.user?.email}</div>
                    <div>${data?.user?.ipk}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="py-1 border-b border-dashed border-gray-300"></div>
          <div>
            <div class="p-4 text-md font-bold">Informasi Magang</div>
            <div class="px-4 pb-2 flex gap-14">
              <div>
                <div class="pt-2 flex gap-16 text-xs">
                  <div class="font-bold space-y-2">
                    <div>Perusahaan</div>
                    <div>Tanggal</div>
                    <div>Alamat</div>
                  </div>
                  <div class="space-y-2">
                    <div>${data?.job?.company}</div>
                    <div>${moment(data?.job?.created_at)?.format("DD MMMM YYYY hh:mm")}</div>
                    <div>${data?.job?.location}</div>
                  </div>
                </div>
              </div>
              <div class="pt-2 flex gap-16 text-xs">
                <div class="font-bold space-y-2">
                  <div>Posisi</div>
                  <div>Masa Kerja</div>
                </div>
                <div class="space-y-2">
                  <div>${data?.job?.title}</div>
                  <div>${data?.job?.duration}</div>
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="py-1 border-b border-dashed border-gray-300"></div>
          <div class="p-4 text-md font-bold">Laporan Kandidat</div>
          <div class="px-4 flex gap-4">
            <div class="w-full">
              <fo-uploaded
                fileurl="https://google.com"
                filename="Laporan Magang_Darmaji Setiadi Ngahiji_Juli_Agustus_September_2024.pdf"
                className="mb-2"
              ></fo-uploaded>
              <fo-error name="fileUpload"></fo-error>
            </div>
            <ui-button className="w-max flex gap-2" data-dialog-trigger="lihat-laporan">
              <iconify-icon icon="solar:documents-bold" height="22" class="text-white" noobserver></iconify-icon>
              LIHAT LAPORAN
            </ui-button>
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
                <div class="px-4 py-2 bg-blue-900 rounded-l-md">C</div>
                <div class="px-4 py-2 bg-red-600 rounded-r-md">Cukup</div>
              </div>
            </div>
            <div class="flex gap-8 items-center">
              <span class="w-32 text-xs font-bold">Perhitungan Nilai</span>
              <div class="text-xs">100 + 70 + 10 /3 = 60</div>
            </div>
            <div class="mb-4 w-full flex flex-col border border-gray-300 rounded-md">
              <div class="p-4 flex justify-between items-center bg-gray-200/50 font-bold border-b border-gray-300">
                <div class="flex items-center font-semibold">
                  <div class="w-60">Penilaian Dari Perusahaan</div>
                  <div class="w-12">100</div>
                  <div class="flex gap-0 text-xs font-bold text-white text-center">
                    <div class="px-4 py-2 bg-blue-900 rounded-l-md">A</div>
                    <div class="px-4 py-2 bg-red-600 rounded-r-md">Sangat Baik</div>
                  </div>
                </div>
                <div class="flex gap-4 text-xs">
                  <div><span class="font-bold">Dinilai oleh: </span>Budi Santoso</div>
                  <div><span class="font-bold">Dinilai pada tanggal: </span>31 Agustus 2024</div>
                </div>
              </div>
              <div class="p-4 text-xs">
                <p>
                  Ahmad Yusran menunjukkan kinerja luar biasa selama masa magangnya. Ia cepat memahami proses keuangan dan software akuntansi yang digunakan,
                  serta mampu menyelesaikan tugas-tugas dengan sangat teliti dan tepat waktu. Ahmad proaktif, memiliki inisiatif tinggi, dan selalu memberikan
                  solusi yang efektif dalam berbagai situasi. Kemampuan komunikasinya baik, ia mudah beradaptasi dalam tim, dan selalu menunjukkan etos kerja
                  yang positif. Ahmad sangat bertanggung jawab, disiplin, dan memiliki integritas yang tinggi. Kami sangat puas dengan kontribusinya dan
                  merekomendasikannya untuk peran yang lebih menantang di masa depan.
                </p>
              </div>
              <div class="p-4 flex items-center font-semibold border-t border-gray-300">
                <div class="w-60">Penilaian Dari Dosen Wali</div>
                <div class="w-12">70</div>
                <div class="flex gap-0 text-xs font-bold text-white text-center">
                  <div class="px-4 py-2 bg-blue-900 rounded-l-md">B</div>
                  <div class="px-4 py-2 bg-red-600 rounded-r-md">Baik</div>
                </div>
              </div>
              <div class="p-4 flex items-center font-semibold border-t border-gray-300">
                <div class="w-60">Penilaian Dari Prodi</div>
                <div class="w-12">10</div>
                <div class="flex gap-0 text-xs font-bold text-white text-center">
                  <div class="px-4 py-2 bg-blue-900 rounded-l-md">D</div>
                  <div class="px-4 py-2 bg-red-600 rounded-r-md">Kurang</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  )
}
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();
  if(auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra"){
    let dataEvaluation = []
    await API.getListEvaluations().then((res)=>{
      dataEvaluation = res?.data.data
    }).catch((err)=>toast.error("Gagal memuat data penilaian"))
    renderPenilaian();
    fetchPenilaian();
    fetchTabelPenilaian(dataEvaluation);
  } else if (auth.role === "mahasiswa"){
    renderPenilaianMahasiswa()
  }
});