import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getAuth, getFlashMessage, getUserInfo } from "../src/js/libraries/cookies.js";
import { toast } from "../src/js/libraries/notify.js";
import { listPenilaian, dummy, dummyDataNew } from "./dummyBeranda.js";
import API from "../src/js/api/index.js";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
import { NO_IMAGE, ULBI_LOGO } from "../src/js/libraries/constants.js";

const flashMessage = await getFlashMessage();
if (flashMessage) toast.success(flashMessage);

const fetchListPenilaian = async (data) => {
  const evaluations = data?.evaluations;
  
  render(
    document.getElementById("penilaian"),
    evaluations? html`
    <div class="p-4 flex flex-col gap-3 rounded-lg bg-gray-200/50">
      <div class="w-full flex justify-between items-center">
        <div class="text-md">Penilaian Dari Perusahaan</div>
        <div class="flex items-center gap-3">
          <div class="text-green-500">${evaluations?.company_grade_score ?? "-"}</div>
          <div class="flex gap-0 text-xs font-bold text-white text-center">
            <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.company_grade ?? "-"}</div>
            <div class="px-4 py-2 bg-red-600 rounded-r-md">${"-"}</div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 text-xs">
        <div><span class="font-bold">Dinilai Oleh:</span> ${"-"}</div>
        <div>
          <span class="font-bold">Dinilai Pada Tanggal:</span> ${evaluations?.company_grade_date
            ? moment(evaluations?.company_grade_date).format("DD MMMM YYYY")
            : "-"}
        </div>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-3 rounded-lg bg-gray-200/50">
      <div class="w-full flex justify-between items-center">
        <div class="text-md">Penilaian Dari Dosen/Wali</div>
        <div class="flex items-center gap-3">
          <div class="text-green-500">${evaluations?.lecturer_grade_score ?? "-"}</div>
          <div class="flex gap-0 text-xs font-bold text-white text-center">
            <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.lecturer_grade ?? "-"}</div>
            <div class="px-4 py-2 bg-red-600 rounded-r-md">${"-"}</div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 text-xs">
        <div><span class="font-bold">Dinilai Oleh:</span> ${"-"}</div>
        <div>
          <span class="font-bold">Dinilai Pada Tanggal:</span> ${evaluations?.lecturer_grade_date
            ? moment(evaluations?.lecturer_grade_date).format("DD MMMM YYYY")
            : "-"}
        </div>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-3 rounded-lg bg-gray-200/50">
      <div class="w-full flex justify-between items-center">
        <div class="text-md">Penilaian Dari Prodi</div>
        <div class="flex items-center gap-3">
          <div class="text-green-500">${evaluations?.prodi_grade_score ?? "-"}</div>
          <div class="flex gap-0 text-xs font-bold text-white text-center">
            <div class="px-4 py-2 bg-blue-900 rounded-l-md">${evaluations?.prodi_grade ?? "-"}</div>
            <div class="px-4 py-2 bg-red-600 rounded-r-md">${"-"}</div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 text-xs">
        <div><span class="font-bold">Dinilai Oleh:</span> ${"-"}</div>
        <div>
          <span class="font-bold">Dinilai Pada Tanggal:</span> ${evaluations?.prodi_grade_date
            ? moment(evaluations?.prodi_grade_date).format("DD MMMM YYYY")
            : "-"}
        </div>
      </div>
    </div>
  ` : renderEvaluationsNotFound()
    
  );
};

const renderSuperAdmin = (data) => {
  const content = document.getElementById("content-beranda");
  render(
    content,
    html` <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
        <!-- Card 1 -->
        <div class="bg-white rounded-lg shadow p-6 flex-1">
          <div class="flex justify-between items-center">
            <span class="text-orange-500 font-semibold">Jumlah Mitra</span>
            <iconify-icon icon="solar:alt-arrow-right-bold" class="text-orange-500" height="20"></iconify-icon>
          </div>
          <div class="mt-4 text-4xl font-bold text-gray-700">${data?.total_company}</div>
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
      <p class="text-xl font-bold mt-4">Data Terbaru</p>
      <div class="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full" id="data-terbaru"></div>`
  );
};

const renderJobNotFound = () =>{
  return html`<div class="space-y-4">
        <div class="rounded-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
           <div class="w-full p-1 flex gap-1 justify-center items-center flex-col">
           <img src="src/images/job.svg" class="w-[20rem]"></img>
           <div class="text-md mb-10">Anda belum terdaftar magang. Silahkan lamar magang!</div>
           </div>
          </div>
        </div>
       </div>`
}

const renderEvaluationsNotFound = () =>{
  return html`<div class="space-y-4">
        <div class="rounded-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
           <div class="w-full p-1 flex gap-1 justify-center items-center flex-col">
           <img src="src/images/grades.svg" class="w-[20rem]"></img>
           <div class="text-md mb-10">Belum ada penilaian yang diberikan</div>
           </div>
          </div>
        </div>
       </div>`
}

const renderReportNotFound = () =>{
  return html`<div class="space-y-4">
        <div class="rounded-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
           <div class="w-full p-1 flex gap-1 justify-center items-center flex-col">
           <img src="src/images/document.svg" class="w-[20rem]"></img>
           <div class="text-md mb-10">Belum ada laporan yang diunggah</div>
           </div>
          </div>
        </div>
       </div>`
}
const renderUser = (data) => {
  const content = document.getElementById("content-beranda");
  const jobs = data?.jobs ? data?.jobs[0] : null;
  const reports = data?.reports;
  render(
    content,
    html` <div class="space-y-4">
      <div class="grid grid-cols-1 gap-4">
        <div class="py-4 space-y-4 border border-gray-300 rounded-md shadow-md">
          <div class="px-4 flex justify-between">
            <div class="text-lg font-bold">Status Magang</div>
            <iconify-icon icon="solar:info-circle-bold" class="text-orange-500" height="20"></iconify-icon>
          </div>
          <div class="border-t border-gray-300"></div>
        ${!jobs ? renderJobNotFound() : html`<div class="m-4 flex flex-row gap-2 text-xs border border-gray-300 rounded-md">
            <img src=${jobs?.job_vacancy_image?.url} alt="lowongan" class="w-[150px] rounded-t-md" />
            <div class="p-4">
              <div class="text-sm font-semibold">${jobs?.title}</div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>${jobs?.company}</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>${jobs?.location}</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>Batas Akhir Pendaftaran: ${moment(jobs?.deadline).format("DD MMMM YYYY")}</div>
              </div>
            </div>
          </div>
          <div class="px-4 flex justify-between items-center">
            <div class="text-xs">
              <p><i>Periode ${jobs?.duration}</i></p>
            </div>
            <ui-button color="orange" href=${`lowongan/review/index.html?id=` + jobs?.id}>LIHAT LOWONGAN</ui-button>
          </div>`}

          
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
          ${!reports ? renderReportNotFound() : html` <div class="px-4 space-y-4">
            <div class="w-full ">
              <fo-label className="font-bold text-md" label="File Laporan"></fo-label>
              <fo-uploaded fileurl=${reports?.file_laporan?.url} filename=${reports?.file_laporan?.name} className="mb-2"></fo-uploaded>
              <fo-error name="fileUpload"></fo-error>
            </div>
            <div class="flex justify-end gap-4">
              <ui-button color="orange" href="laporan/" className="mt-4">LANJUTKAN LAPORAN</ui-button>
            </div>
          </div>`}
         
        </div>
      </div>
    </div>`
  );
};

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
const fetchNewData = (data) => {
  data = data.latest_data
  console.log({data})
  const response = dummyDataNew;
  const dataTerbaru = document.getElementById("data-terbaru");
  render(
    dataTerbaru,
    html`
      <div class="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 class="text-orange-500 text-lg font-bold mb-4">Lowongan</h2>
          <div class="space-y-4">
            ${data?.jobs.map(
              (jobs) => html`
                <div class="flex items-center">
                  <img alt="Lowongan logo" class="w-10 h-10 rounded-full bg-cover bg-center" src=${jobs?.job_vacancy_image?.url ?? NO_IMAGE}  />
                  <div class="ml-4">
                    <p class="text-black font-semibold">${jobs?.company}</p>
                    <p class="text-gray-500">${jobs?.title}</p>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
           <div class="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 class="text-orange-500 text-lg font-bold mb-4">Perusahaan</h2>
          <div class="space-y-4">
            ${data?.companies.map(
              (companies) => html`
                <div class="flex items-center">
                  <img alt="Perusahaan logo" class="w-10 h-10 rounded-full" height="40" src=${companies?.company_logo ?? NO_IMAGE} width="40" />
                  <div class="ml-4">
                    <p class="text-black font-semibold">${companies?.company_name}</p>
                    <p class="text-gray-500">${companies?.company_website}</p>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
           <div class="bg-white rounded-lg shadow-md p-6 flex-1">
          <h2 class="text-orange-500 text-lg font-bold mb-4">Mahasiswa</h2>
          <div class="space-y-4">
            ${data?.apply_job_students.map(
              (apply_job_students) => html`
                <div class="flex items-center">
                  <img alt="Company logo" class="w-10 h-10 rounded-full" height="40" src=${apply_job_students?.users[0]?.profile_picture?.url ?? NO_IMAGE} width="40" />
                  <div class="ml-4">
                    <p class="text-black font-semibold">${apply_job_students?.users[0]?.name}</p>
                    <p class="text-gray-500">${apply_job_students?.users[0]?.faculty}</p>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
    `
  );
};

async function getDataDashboard() {
  let data = {};
  await API.getDashbooard()
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      toast.error("Gagal mengambil data");
    });
  return data;
}

async function getDataDashboardUser(userId) {
  let data = {};
  await await API.getListCandidate("/user/" + userId + "/last")
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      toast.error("Gagal mengambil data");
    });
  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();
  if (auth.role === "superadmin" || auth.role === "cdc" || auth.role === "prodi" || auth.role === "mitra" || auth.role === "dosen") {
    const data = await getDataDashboard();
    renderSuperAdmin(data);
    // fetchJurusan();
    fetchNewData(data);
    const createDoughnutChart = (canvas) => {
      const ctx = canvas.getContext("2d");
      //@ts-ignore
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Submitted", "Rejected"],
          datasets: [
            {
              data: [50, 50],
              backgroundColor: ["#00277F", "#667391"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false, // Hide the legend with "Submitted" and "Rejected" labels
            },
          },
        },
      });
    };

    const createLineChart = () => {
      //@ts-ignore
      const lineCtx = document.getElementById("lineChart").getContext("2d");
      //@ts-ignore
      new Chart(lineCtx, {
        type: "line",
        data: {
          labels: data?.chart_data?.labels,
          datasets: data?.chart_data?.datasets.map((item)=>({
            label: item.label,
            data: item.data,
            borderColor: item.label === "Melamar" ? "#00277F" : item?.label === "Disetujui" ? "#4DC247" : item?.label === "Aktif" ? "#FFA500" : item?.label === "Selesai" ? "#EA5329" : "#667391",
            fill: false,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    const createPieChart = () => {
      //@ts-ignore
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      //@ts-ignore
      new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Submitted", "Approved", "Rejected"],
          datasets: [
            {
              data: [500, 250, 250],
              backgroundColor: ["#00277F", "#4DC247", "#EA5329"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    };

    // Execute chart creation
    document.querySelectorAll(".chart").forEach(createDoughnutChart);
    createLineChart();
    // createPieChart();
  } else {
    const data = await getDataDashboardUser(auth.user.id);
    renderUser(data);
    fetchListPenilaian(data);
  }
});
