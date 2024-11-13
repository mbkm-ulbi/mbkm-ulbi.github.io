import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getFlashMessage } from "../src/js/libraries/cookies.js";
import { toast } from "../src/js/libraries/notify.js";
import { listPenilaian } from "./dummyBeranda.js";

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

fetchListPenilaian();
