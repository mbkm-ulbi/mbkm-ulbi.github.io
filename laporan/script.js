import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapLaporanDummy } from "../kandidat/dummyKandidat.js";
import { getAuth, getUserInfo } from "../src/js/libraries/cookies.js";

const fetchLaporan = async () => {
  const rekap = await rekapLaporanDummy();

  render(
    document.getElementById("rekapLaporan"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:documents-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Laporan</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Laporan Selesai</div>
          <div class="text-xl font-bold">${rekap.laporanSelesai}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Laporan Berjalan</div>
          <div class="text-xl font-bold">${rekap.laporanBerjalan}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Laporan Perlu Ditinjau</div>
          <div class="text-xl font-bold">${rekap.laporanDitinjau}</div>
        </div>
      </div>
    `
  );
};

const fetchTabelLaporan = async () => {
  const list = await listKandidatDummy();

  render(
    document.getElementById("tabelLaporan"),
    html`
      ${list.map((item) => {
        return html`
          <tr>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.company}</td>
            <td>${item.position}</td>
            <td>${item.studyProgramme}</td>
            <td>${item.period}</td>
            <td>
              ${item.reportStatus === "Selesai"
                ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.reportStatus}</ui-badge>`
                : item.reportStatus === "Perlu Ditinjau"
                ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.reportStatus}</ui-badge>`
                : item.reportStatus === "Berjalan"
                ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.reportStatus}</ui-badge>`
                : ""}
            </td>
            <td class="flex space-x-4">
              <div>
                <ui-link href="laporan/laporanMagang"><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon></ui-link>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

const renderLaporan = () =>{
  const contentLaporan = document.getElementById("content-laporan");
  render(
    contentLaporan,
    html`
     <div class="space-y-4">
        <div class="px-12 py-4 rounded-md shadow-md">
          <div id="rekapLaporan" class="flex justify-between">
            <div class="flex items-center gap-2">
              <iconify-icon icon="solar:documents-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <span class="text-lg text-ulbiBlue font-bold">Laporan</span>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Total</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Laporan Selesai</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Laporan Berjalan</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Laporan Perlu Ditinjau</div>
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
                    <th>NAMA</th>
                    <th>TIPE</th>
                    <th>PERUSAHAAN</th>
                    <th>POSISI</th>
                    <th>PRODI</th>
                    <th>PERIODE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="tabelLaporan">
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


const renderLaporanMahasiswa = () =>{
  const contentLaporan = document.getElementById("content-laporan");
  render(
    contentLaporan,
    html`
    <div class="space-y-4">
        <div class="rounded-md shadow-md">
        
        <div class="flex flex-col text-center justify-center items-center gap-4">
        <div class="pb-2 w-full flex justify-start items-center border-b border-gray-300">
          <div class="test-md p-4 font-bold">Laporan Magang</div>
        </div>
        <div class="w-full p-4 flex gap-4 text-justify">
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

        <div class="p-4 w-full h-[30rem] bg-gray-100 flex flex-col overflow-scroll gap-2 border border-dashed border-gray-300 rounded-md text-xs text-justify">
           <h1 class="text-xl font-bold mb-4">LAPORAN KEGIATAN MAGANG MAHASISWA</h1>
        <p class="mb-2"><span class="font-semibold">Nama Mahasiswa:</span> Ahmad Yusran</p>
        <p class="mb-2"><span class="font-semibold">NIM:</span> 123456789</p>
        <p class="mb-2"><span class="font-semibold">Program Studi:</span> Akuntansi</p>
        <p class="mb-2"><span class="font-semibold">Perusahaan:</span> PT ABC Sejahtera</p>
        <p class="mb-2"><span class="font-semibold">Departemen:</span> Keuangan</p>
        <p class="mb-4"><span class="font-semibold">Periode Magang:</span> 1 Agustus 2024 – 31 Agustus 2024</p>

        <h2 class="text-lg font-bold mb-4">RINCIAN KEGIATAN MAGANG</h2>

        <div class="mb-6">
            <p class="font-semibold mb-2">Hari/Tanggal: Senin, 1 Agustus 2024</p>
            <ul class="list-disc list-inside">
                <li>Pengarahan Awal Dari Supervisor Terkait Tugas-Tugas Selama Magang.</li>
                <li>Pengenalan Software Akuntansi Yang Digunakan Oleh Perusahaan (Accurate).</li>
                <li>Memeriksa Kelengkapan Dokumen Untuk Pengajuan Reimbursement Karyawan.</li>
                <li>Menginput Data Transaksi Kas Kecil (Petty Cash) Ke Dalam Sistem.</li>
            </ul>
        </div>

        <div class="mb-6">
            <p class="font-semibold mb-2">Hari/Tanggal: Selasa, 2 Agustus 2024</p>
            <ul class="list-disc list-inside">
                <li>Melakukan Pengarsipan Dokumen Keuangan Secara Manual Dan Digital.</li>
                <li>Memproses Pengajuan Dana Untuk Kebutuhan Operasional Perusahaan.</li>
                <li>Membantu Dalam Proses Rekonsiliasi Bank Harian Dengan Supervisor.</li>
                <li>Mengecek Bukti Transaksi Pembelian Barang Perusahaan.</li>
            </ul>
        </div>

        <div class="mb-6">
            <p class="font-semibold mb-2">Hari/Tanggal: Rabu, 3 Agustus 2024</p>
            <ul class="list-disc list-inside">
                <li>Menyusun Laporan Pengeluaran Harian Dari Transaksi Kas Kecil.</li>
                <li>Menginput Data Transaksi Pemasukan Dari Customer Ke Dalam Sistem.</li>
                <li>Mengecek Dan Memastikan Kelengkapan Bukti Transaksi Pembayaran Vendor.</li>
                <li>Mendiskusikan Masalah Pada Sistem Pelaporan Keuangan Dengan Supervisor.</li>
            </ul>
        </div>
        </div>

        <div class="mt-2 w-full flex flex-col gap-3 items-center">
          <div class="flex items-center justify-between space-x-4 p-4 text-xs">
            <div class="flex gap-2 items-center">
              <iconify-icon icon="solar:check-circle-bold" height="22" class="text-green-500" noobserver></iconify-icon>
              <div>Selesai Dibuat Oleh Mahasiswa</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
              <div>Selesai Diperiksa Oleh Perusahaan</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
              <div>Selesai Diperiksa Oleh Dosen Wali</div>
            </div>
            <div class="flex gap-2 items-center">
              <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
              <div>Selesai Diperiksa Oleh Prodi</div>
            </div>
            <div class="flex gap-2 items-center">
            <ui-button className="w-max flex gap-2">
              <iconify-icon icon="solar:download-square-bold" height="22" class="text-white" noobserver></iconify-icon>
              DOWNLOAD
            </ui-button>
            </div>
            <div class="flex gap-2 items-center">
               <ui-button color="orange">EDIT LAPORAN</ui-button>
            </div>
               <div class="flex gap-2 items-center">
               <ui-button color="orange" disabled>KIRIM LAPORAN</ui-button>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
        
    `)
}
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();
  if(auth.role === "cdc" || auth.role === "superadmin" || auth.role === "prodi" || auth.role === "dosen" || auth.role === "mitra"){
    renderLaporan();
    fetchLaporan();
    fetchTabelLaporan();
  } else if(auth.role === "mahasiswa"){
    renderLaporanMahasiswa()
  }
})

