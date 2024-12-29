import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getAuth, getFlashMessage, getUserInfo } from "../src/js/libraries/cookies.js";
import { toast } from "../src/js/libraries/notify.js";
import { listPenilaian, dummy, dummyDataNew } from "./dummyBeranda.js";
import API from "../src/js/api/index.js";

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



const renderSuperAdmin =  (data) =>{
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
                <div  class="mt-4 text-4xl font-bold text-gray-700">${data?.total_company}</div>
                
            </div>
            <!-- Card 2 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Lowongan</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">${data?.total_job}</div>
                
            </div>
            <!-- Card 3 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Mahasiswa</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">${data?.total_student}</div>
                
            </div>
            <!-- Card 5 -->
            <div class="bg-white rounded-lg shadow p-6 flex-1">
                <div class="flex justify-between items-center">
                    <span class="text-orange-500 font-semibold">Jumlah Aktif Magang</span>
                    <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
                </div>
                <div class="mt-4 text-4xl font-bold text-gray-700">${data?.total_aktif_magang}</div>
                
            </div>
        </div>
        <div class="mt-6">
            <p class="text-xl font-bold">Persentase Penerimaan Mahasiswa Berdasarkan Prodi</p>
        </div>
        <div class="flex space-x-8">
            <!-- Line Chart -->
            <div class="bg-white p-4 rounded-lg shadow w-full">
                <canvas id="lineChart"></canvas>
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
    html` 
    <div class="space-y-4" >
      <div class="grid grid-cols-1 gap-4">
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
           <div class="w-full ">
              <fo-label className="font-bold text-md" label="Laporan Mahasiswa"></fo-label>
              <fo-uploaded fileurl=${'belum ada'} filename=${'belum ada'} className="mb-2"></fo-uploaded>
              <fo-error name="fileUpload"></fo-error>
            </div>
            <div class="flex justify-end gap-4">
              <ui-button color="orange" href="laporan/" className="mt-4">LANJUTKAN LAPORAN</ui-button>
            </div>
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

async function getDataDashboard(){
  let data = {}
  await API.getDashbooard().then((res) => {
    data = res.data
  }).catch((err) => {
    toast.error("Gagal mengambil data")
  })
  return data
}

document.addEventListener("DOMContentLoaded", async()=>{
  const auth = await getUserInfo()
  if(auth.role === "superadmin" || auth.role === "cdc" || auth.role === "prodi" || auth.role === "mitra" || auth.role === "dosen"){
    const data = await getDataDashboard()
    renderSuperAdmin(data)
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