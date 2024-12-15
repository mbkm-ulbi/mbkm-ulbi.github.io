import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { rekapLowonganMagangDummy, listLowonganMagangDummy } from "./dummyLowongan.js";
import { getTime, toMonetary } from "../src/js/libraries/utilities.js";
import { getAuth, getUserInfo } from "../src/js/libraries/cookies.js";
import { getListJob } from "../src/js/api/index.js";
import { toast } from "../src/js/libraries/notify.js";
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'

const fetchLowonganMagang = async () => {
  const rekap = await rekapLowonganMagangDummy();
  let arr = []
  render(
    document.getElementById("rekapLowonganMagang"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:case-round-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Lowongan</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Diterima</div>
          <div class="text-xl font-bold">${rekap.diterima}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Ditinjau</div>
          <div class="text-xl font-bold">${rekap.ditinjau}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Ditolak</div>
          <div class="text-xl font-bold">${rekap.ditolak}</div>
        </div>
      </div>
    `
  );
};

const fetchListLowongan = async () => {
  let list = [];
  const urlImage = "src/images/dummy_ulbi.png";
  await getListJob().then((res) => {
    list = res?.data?.data
  }).catch((err)=>{
    toast.error(err?.message)
  })

  render(document.getElementById("totalLowonganMagang"), html` Menampilkan ${toMonetary(list.length)} Lowongan `);

  render(
    document.getElementById("listLowonganMagang"),
    html`
      ${list.map(
        (item) => html`
          <div class="flex-none flex gap-2 rounded-lg border border-gray-300 overflow-hidden">
            <div class="w-[120px] flex overflow-hidden rounded-l-lg">
              <img class="object-center object-contain" src=${item?.job_vacancy_image?.url ? item?.job_vacancy_image?.url :urlImage} height="[100px]" alt="image" />
            </div>
            <div class="w-full p-4 flex flex-col gap-2 text-xs">
              <div class="flex justify-between items-center">
                <div>Diposting 2 Hari Yang Lalu</div>
                <div>
                  ${item.status === "Available"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                    : item.status === "Pending"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                    : item.status === "Not Available"
                    ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                    : ""}
                </div>
              </div>
              <div class="text-sm font-semibold">${item.title}</div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>${item.company}</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>${item.location}</div>
              </div>
              <div class="flex justify-start items-center gap-2">
                <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                <div>Waktu: ${item.created_at}</div>
              </div>
              <div class="flex justify-between items-center gap-2 p-absolute">
                <div class="flex justify-start items-center gap-2">
                  <iconify-icon icon="solar:user-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                  <div class="font-semibold">${item.applicants} Kandidat Mendaftar</div>
                </div>
                <div class="flex gap-2">
                  <ui-button variant="outline_orange" type="button">Simpan</ui-button>
                  <ui-button color="orange" type="button" href=${`lowongan/review/index.html?id=${item?.id}`}>Detail</ui-button>
                </div>
              </div>
            </div>
          </div>
        `
      )}
    `
  );

  // render default from list
  const detail = list[0];

  render(
    document.getElementById("detailLowonganMagang"),
    html`
      <div class="flex-none h-[800px] flex flex-col rounded-md border border-gray-300 text-xs">
        <div class="pt-4 px-4 flex justify-between items-center">
          <div>Diposting 2 Hari Yang Lalu</div>
          <div>  ${detail.status === "Available"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${detail.status}</ui-badge>`
                    : detail.status === "Pending"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${detail.status}</ui-badge>`
                    : detail.status === "Not Available"
                    ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${detail.status}</ui-badge>`
                    : ""}
            </div>
        </div>
        <div class="flex border-b border-gray-300">
          <div class="pl-2 w-[120px] flex overflow-hidden rounded-l-lg">
            <img class="object-center object-contain" src=${detail?.job_vacancy_image?.url ? detail?.job_vacancy_image?.url :urlImage} height="[100px]" alt="image" />
          </div>
          <div class="p-4 flex flex-col gap-1">
            <div class="text-xl font-semibold">${detail?.title}</div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>${detail?.company}</div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>${detail.location}</div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <iconify-icon icon="solar:calendar-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <div>Waktu: ${detail.created_at}</div>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto">
          <div>
            <img class="block mx-auto" src=${detail?.job_vacancy_image?.url ? detail?.job_vacancy_image?.url :urlImage} alt="image" />
          </div>
          <div class="space-y-3 m-3">
            <div>
              <fo-label label="Deskripsi Pekerjaan" className="text-sm text-gray-800"></fo-label>
            </div>
         <div class="max-w-3xl mx-auto p-6 mt-10">
         <div innerHTML=${detail?.description}></div>
            </div>
           
            
          </div>
        </div>
        <div class="p-4 flex flex-wrap justify-between border-t border-gray-300">
          <div><ui-button variant="outline_orange" type="button" href="">Simpan</ui-button></div>
          <div>
            <ui-button href=${`lowongan/apply/index.html?id=`+detail?.id} color="orange" type="button">Lamar</ui-button>
            <ui-dialog name="data-lamaran" className="w-[1000px] h-[2000px] p-0 overflow-auto">
              <div class="flex flex-col items-center gap-4">
                <div class="pb-2 p-4 w-full flex justify-between items-center border-b border-gray-300">
                  <div class="text-lg font-bold">Formulir Lamaran</div>
                  <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-gray-600" noobserver></iconify-icon></div>
                </div>
                <div class="px-4 w-full flex justify-between items-center">
                  <div class="h-[100px] w-[400px] flex gap-4 text-justify border border-gray-300 rounded-lg">
                    <img src="src/images/dummy_foto_kandidat.png" width="[100px]" alt="kandidat-image" />
                    <div class="pr-4 flex flex-col justify-evenly items-start">
                      <div class="text-md font-semibold">Darmaji Setiaji Ngahiji</div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:buildings-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>D3-Manajemen Bisnis</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:user-check-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>NIM: 000000000123</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:file-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>IPK: 3,5</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center"><img src="src/images/red_arrow.png" width="[100px]" alt="kandidat-image" /></div>
                  <div class="h-[100px] w-[400px] flex gap-4 text-justify border border-gray-300 rounded-lg">
                    <img src="src/images/dummy_ulbi.png" alt="kandidat-image" />
                    <div class="pr-4 flex flex-col justify-evenly items-start">
                      <div class="text-md font-semibold">Dosen Tetap</div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:buildings-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>PT.Pos Indonesia</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:map-point-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>Bandung, Jawa Barat</div>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <iconify-icon icon="solar:calendar-bold-duotone" height="16" class="text-ulbiOrange" noobserver></iconify-icon>
                        <div>Batas Akhir Pendaftaran: 01 Desember 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 w-full flex flex-col gap-4 justify-start items-center">
                  <div class="w-full">
                    <fo-label label="Email" className="text-sm text-gray-800"></fo-label>
                    <fo-input name="email" className="w-full" placeholder="darmaji@mail.com" disabled></fo-input>
                  </div>
                  <div class="w-full">
                    <fo-label label="No Telepon" className="text-sm text-gray-800"></fo-label>
                    <fo-input name="phone" className="w-full" placeholder="081234567890" disabled></fo-input>
                  </div>
                  <div class="w-full">
                    <fo-label label="Alamat" className="text-sm text-gray-800"></fo-label>
                    <fo-input
                      name="address"
                      className="w-full"
                      placeholder="Jl. Bersama Kamu Selamanya No.123, Kota Apa Saja, Jawa Utara 40000"
                      disabled
                    ></fo-input>
                  </div>
                </div>
                <div class="px-4 mb-4 w-full grid grid-cols-3 gap-4">
                  <div>
                    <fo-label label="Upload DHS"></fo-label>
                    <fo-file name="fileUpload" accept="application/pdf"></fo-file>
                    <fo-error name="fileUpload"></fo-error>
                  </div>
                  <div>
                    <fo-label label="Upload CV"></fo-label>
                    <fo-file name="fileUpload" accept="application/pdf"></fo-file>
                    <fo-error name="fileUpload"></fo-error>
                  </div>
                  <div>
                    <fo-label label="Upload Surat Lamaran"></fo-label>
                    <fo-file name="fileUpload" accept="application/pdf"></fo-file>
                    <fo-error name="fileUpload"></fo-error>
                  </div>
                </div>
                <div class="w-full border-b border-gray-300"></div>
                <div class="px-4 pb-4 w-full flex justify-between items-center gap-4">
                  <div class="w-full">
                    <ui-button color="red" data-dialog-close className="w-full">BATAL</ui-button>
                  </div>
                  <div class="w-full">
                    <ui-button data-dialog-trigger="pengajuan-berhasil" color="green" type="submit" className="w-full">KIRIM</ui-button>
                    <ui-dialog name="pengajuan-berhasil" className="w-[750px] h-[320px]">
                      <div class="flex flex-col text-center justify-center items-center gap-3">
                        <div class="text-lg font-bold">Lamaran Berhasil Diajukan</div>
                        <iconify-icon icon="solar:verified-check-bold-duotone" height="96" class="text-green-600" noobserver></iconify-icon>
                        <div class="text-sm font-semibold">Postingan Anda Akan Kami Tinjau Maksimal 7x24 Jam</div>
                        <div class="text-xs">
                          <p>Akun Perusahaan Anda Kini Dapat Melakukan Posting Lowongan Magang Pada Website MBKM ULBI</p>
                          <p>Silahkan Masuk Menggunakan Akun Yang Telah Anda Buat Untuk Melakukan Posting Lowongan Magang</p>
                        </div>
                        <div class="flex gap-3">
                          <ui-button data-dialog-close>SELESAI</ui-button>
                        </div>
                      </div>
                    </ui-dialog>
                  </div>
                </div>
              </div>
            </ui-dialog>
          </div>
        </div>
      </div>
    `
  );
};

const fetchDetailLowongan = async (id) => {
  // return await detailLowonganMagangDummy(id);
};
//-----------------

const filter = {
  keyword: "",
  periode: "",
  perusahaan: "",
  mataKuliah: "",
  kategori: [],
  status: "",
};

// filter form
const form = document.querySelector("#filter-form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

// show/hide filter

// const getJobMahasiswa = async () =>{
//   const res = await getListJob()
//  return res
// }

document.addEventListener("DOMContentLoaded", async function () {

 
  const auth = await getUserInfo();
  if (auth.role === "superadmin" || auth.role === "cdc" || auth.role === "prodi" || auth.role === "mitra") {
    renderSuperUser();
  } else {
    // const res = await getJobMahasiswa()
    // console.log(await getAuth())
    // console.log(res.data.data)
    renderUser();
    fetchLowonganMagang();
    fetchListLowongan();
    const filterSection = document.getElementById("filter-section");
    const toggleButton = document.getElementById("toggle-filter");
    const icon = toggleButton.querySelector("iconify-icon");
    const toggleText = document.getElementById("toggle-text");

    // Handle toggle visibility of the filter section
    toggleButton.addEventListener("click", function () {
      if (filterSection.classList.contains("hidden")) {
        filterSection.classList.remove("hidden");
        toggleText.textContent = "Tutup Filter";
        icon.setAttribute("icon", "solar:alt-arrow-up-outline");
      } else {
        filterSection.classList.add("hidden");
        toggleText.textContent = "Tampilkan Filter";
        icon.setAttribute("icon", "solar:alt-arrow-down-outline");
      }
    });
  }
});

const renderUser = () => {
  const contentLowongan = document.getElementById("content-lowongan");
  render(
    contentLowongan,
    html`
    <div class="mx-auto max-w-[90dvw] 2xl:max-w-7xl my-8 flex flex-col gap-8 text-gray-500">      
      <form id="filter-form" class="p-4 flex flex-col gap-3 bg-gray-300/10 rounded-md border border-gray-300">
        <fo-label className="mt-1" for="keyword" label="Cari Berdasarkan Perusahaan, Pekerjaan dan Program Studi"></fo-label>
        <div class="relative -mt-3">
          <fo-input name="keyword" className="py-4" placeholder="Silahkan ketik pencarian Anda disini..."></fo-input>
          <button type="submit" class="bg-orange-500 text-sm font-bold text-white px-4 py-2 rounded-md absolute top-1/2 right-2 transform -translate-y-1/2">
            Cari
          </button>
        </div>
        <div class="p-0 w-full">
          <div id="filter-section" class="hidden my-4 text-xs transition-all duration-300">
            <!-- Bagian filter -->
            <div class="w-full grid grid-cols-3 gap-4">
              <div>
                <div class="mb-2 font-semibold">Periode:</div>
                <fo-select className="w-full px-4 py-2">                 
                  <option>Januari 2024</option>
                  <option>Februari 2024</option>
                  <option>Maret 2024</option>
                </fo-select>
              </div>
              <div>
                <div class="mb-2 font-semibold">Perusahaan:</div>
                <fo-select className="w-full px-4 py-2">                  
                  <option>PT. Pos Indonesia</option>
                </fo-select>
              </div>
              <div>
                <div class="mb-2 font-semibold">Matakuliah:</div>
                <fo-select className="w-full px-4 py-2">                  
                  <option>Accounting</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </fo-select>
              </div>
            </div>    
            <div class="w-full grid grid-cols-3 gap-4">
              <div>
                <div class="my-2 font-semibold">Kategori:</div>
                <div class="flex flex-wrap items-center gap-3">
                  <fo-checkbox name="umum" label="Umum" checked></fo-checkbox>
                  <fo-checkbox name="privat" label="Privat"></fo-checkbox>      
                </div>
              </div>
              <div>
                <div class="my-2 font-semibold">Status:</div>
                <div class="flex flex-wrap items-center gap-3">
                  <fo-radio name="semua" value="semua" label="Semua" checked></fo-radio>
                  <fo-radio name="tersedia" value="tersedia" label="Tersedia"></fo-radio>
                  <fo-radio name="terbatas" value="terbatas" label="Terbatas"></fo-radio>
                </div>
              </div>
            </div>
          </div>                    
        </div>
        <!-- Tombol Toggle -->
        <div class="flex justify-center items-center gap-2 font-semibold text-xs cursor-pointer" id="toggle-filter">
          <iconify-icon icon="solar:alt-arrow-down-outline" class="text-gray-500" height="16"></iconify-icon>
          <span id="toggle-text">Tampilkan Filter</span>
        </div>
        <!--end of filter section-->
      </form>
    </form>  
      <div class="flex justify-between items-center">
        <div id="totalLowonganMagang" class="text-sm font-semibold">Total: ... Lowongan Magang</div>
        <div class="flex gap-3">
          <div class="flex gap-3 items-center">
            <fo-label for="select" label="Perusahaan"></fo-label>
            <fo-select name="select" placeholder="Choose one..." clearable>
              <option value="ptposindonesia">PT. Pos Indonesia</Inp></option>
              <option value="pttelkom">PT. Telkom</option>
            </fo-select>
            <fo-error name="select"></fo-error>
          </div>
          <div class="flex gap-3 items-center">
            <fo-label for="select" label="Matakuliah"></fo-label>
            <fo-select name="select" placeholder="Choose one..." clearable>
              <option value="semua">Semua</option>
              <option value="finance">Finance</option>
            </fo-select>
            <fo-error name="select"></fo-error>
          </div>
        </div>
      </div>      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 -mt-6">
        <div id="listLowonganMagang" class="flex flex-col gap-4 max-h-[800px] overflow-y-auto w-full pr-3">
          <div class="flex-none w-full h-[200px] bg-gray-200 rounded animate-pulse"></div>
          <div class="flex-none w-full h-[200px] bg-gray-200 rounded animate-pulse"></div>
          <div class="flex-none w-full h-[200px] bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div id="detailLowonganMagang">
          <div class="flex-none w-full h-[500px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
    `
  );
};

const renderSuperUser = async () => {
  let list = [];
  const urlImage = "src/images/dummy_ulbi.png";
  await getListJob().then((res) => {
    list = res?.data?.data
  }).catch((err)=>{
    toast.error(err?.message)
  })
  const contentLowongan = document.getElementById("content-lowongan");
  render(
    contentLowongan,
    html`
    <div class="space-y-4">
      <div class="px-12 py-4 rounded-md shadow-md ">
        <div id="rekapJumlahLowongan" class="flex justify-between">
          <div class="flex items-center gap-2">
            <iconify-icon icon="solar:user-hands-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
            <span class="text-lg text-ulbiBlue font-bold">Lowongan</span>
          </div>
          <div class="flex flex-col justify-center items-center">
            <div class="text-xs text-gray-500 font-semibold">Total</div>
            <div class="text-xl font-bold">100</div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <div class="text-xs text-gray-500 font-semibold">Diterima</div>
            <div class="text-xl font-bold">50</div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <div class="text-xs text-gray-500 font-semibold">Ditinjau</div>
            <div class="text-xl font-bold">30</div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <div class="text-xs text-gray-500 font-semibold">Ditolak</div>
            <div class="text-xl font-bold">20</div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-semibold">Semua Lowongan</h1>
            <a class="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer" href="lowongan/create">BUAT POSTINGAN BARU</a>
          </div>
          <div class="flex space-x-4 mb-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700" for="company">Perusahaan</label>
              <fo-select id="company">
                <option>ULBI</option>
              </fo-select>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700" for="status">Status Lowongan</label>
              <fo-select id="status">
                <option>Semua</option>
              </fo-select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${list?.map((item, index)=>html`
            <div class="bg-white rounded-lg shadow-md flex">
              <div
                class="p-6 rounded-l-lg flex items-center justify-center w-[120px]"
              >
              <img class="object-center object-contain" src=${item?.job_vacancy_image?.url || urlImage} height="[100px]" alt="image" />
              
              </div>

              <div class="p-6 flex-1 relative">
                <div class="flex justify-between items-center">
                  <p class="text-gray-500 text-sm">Diposting ${getTime(item?.created_at)}</p>
                  <div>
                    ${item.status === "Available"
                    ? html`<ui-badge class="bg-green-600/25 text-green-600" dot>${item.status}</ui-badge>`
                    : item.status === "Pending"
                    ? html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${item.status}</ui-badge>`
                    : item.status === "Not Available"
                    ? html`<ui-badge class="bg-red-600/25 text-red-600" dot>${item.status}</ui-badge>`
                    : ""}
                  </div>
                </div>
                <h2 class="text-xl font-semibold mt-2">${item?.title}</h2>
                <div class="mt-4">
                  <p class="flex items-center text-gray-700 text-sm">
                    <iconify-icon class="fas fa-building mr-2 text-red-500"> </iconify-icon>
                      ${item?.company}
                  </p>
                  <p class="flex items-center text-gray-700 text-sm mt-2">
                    <iconify-icon class="fas fa-map-marker-alt mr-2 text-red-500"> </iconify-icon>
                      ${item?.location}
                  </p>
                  <p class="flex items-center text-gray-700 text-sm mt-2">
                    <iconify-icon class="fas fa-calendar-alt mr-2 text-red-500"> </iconify-icon>
                    Batas Akhir Pendaftaran: ${moment(item?.deadline).format('DD MMMM YYYY')}
                  </p>
                  <p class="flex items-center text-gray-700 text-sm mt-2">
                    <iconify-icon class="fas fa-user-friends mr-2 text-red-500"> </iconify-icon>
                    Postingan Dari ${item?.company}
                  </p>
                </div>
                <div class="absolute bottom-6 right-6 flex space-x-2">
                  <a class="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm hover:bg-orange-100" href=${`lowongan/review/index.html?id=${item?.id}`}> Detail </a>
                  <a class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"  href=${`lowongan/kurasi/index.html?id=${item?.id}`}> Tinjau </a>
                </div>
              </div>
            </div>
            `)}
          </div>
          <div class="mt-4 flex justify-between items-center">
            <p class="text-sm text-gray-500">Menampilkan ${list.length} Lowongan</p>
            <div class="flex space-x-2">
              <ui-pagination data-pagination-count=${list.length} data-pagination-limit="10" data-pagination-page="1"></ui-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  );
};
