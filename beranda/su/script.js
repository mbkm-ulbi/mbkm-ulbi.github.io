import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { dummy, dummyDataNew } from "./dummyData.js";

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
                    src="https://storage.googleapis.com/a1aa/image/UDRaapR0ngYTC5djI3MqCBHLCdZOJlveOWwlVS91HYKScl4JA.jpg"
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
fetchNewData();
fetchJurusan();
