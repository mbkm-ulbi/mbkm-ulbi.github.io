import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getAuth, getFlashMessage } from "../src/js/libraries/cookies.js";
import { toast } from "../src/js/libraries/notify.js";
import { listPenilaian, dummy, dummyDataNew } from "./dummyBeranda.js";

const flashMessage = await getFlashMessage();
if (flashMessage) toast.success(flashMessage);

const fetchListPenilaian = async () => {
  const list = await listPenilaian();

  render(
    document.getElementById("penilaian"),
    html`
      ${list.map(
        (item) => html`
          <div class="p-4 flex flex-col gap-3 rounded-lg bg-gray-200/50">
            <div class="w-full flex justify-between items-center">
              <div class="text-md">Penilaian Dari Perusahaan</div>
              <div class="flex items-center gap-3">
                <div class="text-green-500">${item.score}</div>
                <div class="flex gap-0 text-xs font-bold text-white text-center">
                  <div class="px-4 py-2 bg-blue-900 rounded-l-md">${item.grade}</div>
                  <div class="px-4 py-2 bg-red-600 rounded-r-md">${item.gradeDescription}</div>
                </div>
              </div>
            </div>
            <div class="flex gap-4 text-xs">
              <div><span class="font-bold">Dinilai Oleh:</span> ${item.ratedBy}</div>
              <div><span class="font-bold">Dinilai Pada Tanggal:</span> ${item.date}</div>
            </div>
          </div>
        `
      )}
    `
  );
};



const renderSuperAdmin =  () =>{
  const content = document.getElementById("content-beranda")
  render(
    content,
    html`
    <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
            <!-- Card 1 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Mitra</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">6,500</div>
                <div class="mt-2 text-sm flex">
                    <span class="me-1 text-orange-500">2%</span>Decrease From Target <iconify-icon
                        icon="solar:arrow-down-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
            </div>
            <!-- Card 2 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Lowongan</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">6,500</div>
                <div class="mt-2 text-sm flex">
                    <span class="me-1 text-orange-500">2%</span>Decrease From Target <iconify-icon
                        icon="solar:arrow-down-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
            </div>
            <!-- Card 3 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Mahasiswa</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">6,500</div>
                <div class="mt-2 text-sm flex">
                    <span class="me-1 text-orange-500">2%</span>Decrease From Target <iconify-icon
                        icon="solar:arrow-down-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
            </div>
            <!-- Card 4 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Alumni</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">6,500</div>
                <div class="mt-2 text-sm flex">
                    <span class="me-1 text-orange-500">2%</span>Decrease From Target <iconify-icon
                        icon="solar:arrow-down-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
            </div>
            <!-- Card 5 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Penerimaan</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">6,500</div>
                <div class="mt-2 text-sm flex">
                    <span class="me-1 text-orange-500">2%</span>Decrease From Target <iconify-icon
                        icon="solar:arrow-down-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
            </div>
        </div>
        <div class="mt-6">
            <p class="text-xl font-bold">Persentase Penerimaan Mahasiswa Berdasarkan Prodi</p>
        </div>
        <div class="flex space-x-8">
            <!-- Line Chart -->
            <div class="bg-white p-4 rounded-lg shadow w-2/3">
                <canvas id="lineChart"></canvas>
            </div>
            <!-- Pie Chart -->
            <div class="bg-white p-4 rounded-lg shadow w-1/3">
                <canvas id="pieChart"></canvas>
                <!-- Legend content -->
            </div>
        </div>
        <p class="text-xl font-bold mt-4">Persentase Keikutsertaan Mahasiswa Berdasarkan Prodi</p>
        <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full" id="persentase-jurusan">
        </div>
        <p class="text-xl font-bold mt-4">Data Terbaru</p>
        <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full" id="data-terbaru">
           
        </div>`
  )
  
}

const renderUser = () =>{
  const content = document.getElementById("content-beranda")
  render(
    content,
    html` <div class="space-y-4" >
      <div class="grid grid-cols-2 gap-4">
        <div class="py-4 space-y-4 border border-gray-300 rounded-md shadow-md">
          <div class="px-4 flex justify-between">
            <div class="text-lg font-bold">Status Magang</div>
            <iconify-icon icon="solar:info-circle-bold" class="text-orange-500" height="20"></iconify-icon>
          </div>
          <div class="border-t border-gray-300"></div>
          <div class="m-4 flex flex-row gap-2 text-xs border border-gray-300 rounded-md">
            <div><img src="src/images/dummy_pos_ind.png" alt="ptpos" height="200" class="w-full rounded-t-md" /></div>
            <div class="p-4">
              <div class="text-sm font-semibold">Global Finance Accounting Internship</div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>PT. Pos Indonesia</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>Bandung, Jawa Barat</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>Batas Akhir Pendaftaran: 06 September 2024</div>
              </div>
            </div>
          </div>
          <div class="px-4 flex justify-between items-center">
            <div class="text-xs">
              <p><i>Diterima Pada Tanggal 20 September 2024</i></p>
              <p><i>Periode 3 Bulan (1 Agustus - 31 Oktober 2024)</i></p>
            </div>
            <ui-button color="orange" href="lowongan/">LIHAT LOWONGAN</ui-button>
          </div>
        </div>
        <div class="py-4 space-y-4 border border-gray-300 rounded-md shadow-md">
          <div class="px-4 flex justify-between">
            <div class="text-lg font-bold">Kelengkapan Profil</div>
            <iconify-icon icon="solar:info-circle-bold" class="text-orange-500" height="20"></iconify-icon>
          </div>
          <div class="border-t border-gray-300"></div>
          <div class="px-4 flex justify-between items-center">
            <span class="text-lg">Mahasiswa</span>
          </div>
          <div class="px-4 grid grid-cols-3 gap-2 text-xs">
            <div class="flex gap-2">
              <iconify-icon icon="solar:check-circle-bold-duotone" class="text-green-500" height="16"></iconify-icon>
              <span>Informasi Dasar</span>
            </div>
            <div class="flex gap-2">
              <iconify-icon icon="solar:check-circle-bold-duotone" class="text-green-500" height="16"></iconify-icon>
              <span>Upload CV</span>
            </div>
            <div class="flex gap-2">
              <iconify-icon icon="solar:close-circle-bold-duotone" class="text-red-500" height="16"></iconify-icon>
              <span>Upload DHS</span>
            </div>
            <div class="flex gap-2">
              <iconify-icon icon="solar:close-circle-bold-duotone" class="text-red-500" height="16"></iconify-icon>
              <span>Informasi Kontak</span>
            </div>
            <div class="flex gap-2">
              <iconify-icon icon="solar:check-circle-bold-duotone" class="text-green-500" height="16"></iconify-icon>
              <span>Upload Lamaran</span>
            </div>
            <div class="flex gap-2">
              <iconify-icon icon="solar:close-circle-bold-duotone" class="text-red-500" height="16"></iconify-icon>
              <span>Upload Foto Profil</span>
            </div>
          </div>
          <div class="px-4"><ui-button color="orange">PERBAHARUI PROFIL</ui-button></div>
        </div>
        <div class="py-4 space-y-4 border border-gray-300 rounded-md shadow-md">
          <div class="px-4 flex justify-between">
            <div class="text-lg font-bold">Penilaian</div>
            <iconify-icon icon="solar:info-circle-bold" class="text-orange-500" height="20"></iconify-icon>
          </div>
          <div class="border-t border-gray-300"></div>
          <div id="penilaian" class="px-4 flex flex-col gap-4 max-h-[500px] overflow-y-auto w-full">
            <div class="flex-none w-full h-[100px] bg-gray-200 rounded animate-pulse"></div>
            <div class="flex-none w-full h-[100px] bg-gray-200 rounded animate-pulse"></div>
            <div class="flex-none w-full h-[100px] bg-gray-200 rounded animate-pulse"></div>
            <div class="flex-none w-full h-[100px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div class="py-4 space-y-4 border border-gray-300 rounded-md shadow-md">
          <div class="px-4 flex justify-between">
            <div class="text-lg font-bold">Laporan</div>
            <iconify-icon icon="solar:info-circle-bold" class="text-orange-500" height="20"></iconify-icon>
          </div>
          <div class="border-t border-gray-300"></div>
          <div class="px-4 space-y-4">
            <div
              class="p-4 w-full h-[260px] flex flex-col overflow-scroll gap-2 bg-gray-200/50 border border-dashed border-gray-300 rounded-md text-xs text-justify"
            >
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
            <span class="text-xs"><i>Terakhir diperbaharui: 24 September 2024 - 19.21</i></span>
            <div class="flex gap-4 text-xs">
              <div class="flex gap-2 items-center">
                <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
                <div>Mahasiswa</div>
              </div>
              <div class="flex gap-2 items-center">
                <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
                <div>Perusahaan</div>
              </div>
              <div class="flex gap-2 items-center">
                <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
                <div>Dosen Wali</div>
              </div>
              <div class="flex gap-2 items-center">
                <iconify-icon icon="solar:danger-circle-bold" height="22" class="text-red-500" noobserver></iconify-icon>
                <div>Prodi</div>
              </div>
            </div>
            <div class="flex gap-4">
              <ui-button variant="outline_orange" className="mt-4">PREVIEW LAPORAN</ui-button>
              <ui-button color="orange" className="mt-4">LANJUTKAN LAPORAN</ui-button>
            </div>
          </div>
        </div>
      </div>
      <div class="py-4 space-y-4 border border-gray-300 rounded-md shadow-md">
        <div class="px-4 flex justify-between">
          <div class="text-lg font-bold">Notifikasi/Aktivitas</div>
          <iconify-icon icon="solar:info-circle-bold" class="text-orange-500" height="20"></iconify-icon>
        </div>
        <div class="border-t border-gray-300"></div>
        <div class="p-4 space-y-4 text-gray-500 text-xs text-center">
          <div class="p-4 flex justify-between items-center border border-gray-300 rounded-md">
            <div class="text-left">
              <div class="text-gray-500 font-bold">24 September 2024 -14:30</div>
              <div>Selamat! Prodi Telah Menyetujui Permohonan Magang Anda</div>
            </div>
            <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="12"></iconify-icon>
          </div>
          <div class="p-4 flex justify-between items-center border border-gray-300 rounded-md">
            <div class="text-left">
              <div class="text-gray-500 font-bold">24 September 2024 -14:30</div>
              <div>Anda Telah Melamar di PT. Pos Indonesia sebagai Senior Akuntan</div>
            </div>
            <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="12"></iconify-icon>
          </div>
        </div>
      </div>
    </div>`
  )
}

const fetchJurusan = async () => {
  const response = dummy;
  const persentase = document.getElementById("persentase-jurusan");
  render(
    persentase,
    html`
      ${response.map(
        (item) => html`
          <div class="bg-white rounded-lg shadow-md p-4 flex-1">
            <h2 class="text-orange-500 text-xl font-semibold mb-4">${item?.label}</h2>
            <div class="space-y-4">
              ${item?.jurusan.map(
                (jurusan) => html`
                  <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div class="flex items-center">
                      <!-- Menggunakan class 'chart' alih-alih ID -->
                      <canvas class="chart" style="max-height: 70px; max-width: 70px;"></canvas>
                      <div class="ml-4">
                        <p class="text-sm text-gray-500">${item?.label}</p>
                        <p class="text-lg font-medium">${jurusan}</p>
                      </div>
                    </div>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                  </div>
                `
              )}
            </div>
          </div>
        `
      )}
    `
  );
};
const fetchNewData = () => {
  const response = dummyDataNew;
  const dataTerbaru = document.getElementById("data-terbaru");
  render(
    dataTerbaru,
    html` ${response.map(
      (item) => html`
        <div class="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 class="text-orange-500 text-lg font-bold mb-4">${item?.label}</h2>
          <div class="space-y-4">
            ${item?.companys.map(
              (company) => html`
                <div class="flex items-center">
                  <img
                    alt="Company logo"
                    class="w-10 h-10 rounded-full"
                    height="40"
                    src=${company.images}
                    width="40"
                  />
                  <div class="ml-4">
                    <p class="text-black font-semibold">${company?.name}</p>
                    <p class="text-gray-500">${company?.position}</p>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}`
  );
};

document.addEventListener("DOMContentLoaded", async()=>{
  const auth = await getAuth()
  const parseAuth = JSON.parse(auth)
  if(parseAuth.role === "superadmin" || parseAuth.role === "cdc" || parseAuth.role === "prodi" || parseAuth.role === "perusahaan" || parseAuth.role === "dosen"){
    renderSuperAdmin()
    fetchJurusan()
    fetchNewData()
    const createDoughnutChart = (canvas) => {
      const ctx = canvas.getContext('2d');
      //@ts-ignore
      new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['Submitted', 'Rejected'],
              datasets: [{
                  data: [50, 50],
                  backgroundColor: ['#00277F', '#667391'],
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                  legend: {
                      display: false, // Hide the legend with "Submitted" and "Rejected" labels
                  }
              }
          }
      });
  };

  const createLineChart = () => {
      //@ts-ignore
      const lineCtx = document.getElementById('lineChart').getContext('2d');
      //@ts-ignore
      new Chart(lineCtx, {
          type: 'line',
          data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                  {
                      label: 'Submitted',
                      data: [10, 20, 30, 40, 23, 60, 100, 80, 90, 22, 110, 212],
                      borderColor: '#00277F',
                      fill: false
                  },
                  {
                      label: 'Approved',
                      data: [5, 15, 25, 15, 45, 30, 65, 75, 100, 80, 105, 200],
                      borderColor: '#4DC247',
                      fill: false
                  },
                  {
                      label: 'Rejected',
                      data: [100, 50, 22, 32, 42, 52, 21, 3, 123, 3, 3, 112],
                      borderColor: '#EA5329',
                      fill: false
                  }
              ]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  };

  const createPieChart = () => {
      //@ts-ignore
      const pieCtx = document.getElementById('pieChart').getContext('2d');
      //@ts-ignore
      new Chart(pieCtx, {
          type: 'pie',
          data: {
              labels: ['Submitted', 'Approved', 'Rejected'],
              datasets: [{
                  data: [500, 250, 250],
                  backgroundColor: ['#00277F', '#4DC247', '#EA5329']
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true
          }
      });
  };

  // Execute chart creation
  document.querySelectorAll('.chart').forEach(createDoughnutChart);
  createLineChart();
  createPieChart();
  } else {
    renderUser()
    fetchListPenilaian()
  }
})