import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { listKandidatDummy, rekapKandidatDummy } from "./dummyKandidat.js";
import { getAuth, getUserInfo } from "../src/js/libraries/cookies.js";
import API, { getListCandidate } from "../src/js/api/index.js";
import { toast } from "../src/js/libraries/notify.js";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
import badgeStatus from "../src/js/libraries/badgeStatus.js";
import micromodal from "https://cdn.jsdelivr.net/npm/micromodal@0.4.10/+esm";

const fetchKandidat = async () => {
  const rekap = await rekapKandidatDummy();

  render(
    document.getElementById("rekapJumlahKandidat"),
    html`
      <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-2">
          <iconify-icon icon="solar:user-hands-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
          <span class="text-lg text-ulbiBlue font-bold">Kandidat</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Total</div>
          <div class="text-xl font-bold">${rekap.total}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Aktif Magang</div>
          <div class="text-xl font-bold">${rekap.aktifMagang}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Pelamar Magang</div>
          <div class="text-xl font-bold">${rekap.pelamarMagang}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Aktif Kerja</div>
          <div class="text-xl font-bold">${rekap.aktifKerja}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Aktif Kerja</div>
          <div class="text-xl font-bold">${rekap.pelamarKerja}</div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="text-xs text-gray-500 font-semibold">Selesai</div>
          <div class="text-xl font-bold">${rekap.selesai}</div>
        </div>
      </div>
    `
  );
};

const fetchTabelKandidat = async (list, fetchDataKandidat, setApplyJobId) => {
  const handleDoneJob = async (id) => {
    await API.postApply(null, `/${id}/done`)
      .then((res) => {
        toast.success("Berhasil menyelesaikan magang");
        micromodal.close(`detail-kandidat-` + id);
        fetchDataKandidat();
      })
      .catch((err) => {
        toast.error("Gagal menyelesaikan magang");
      });
  };

  const handleSetStorage = (id) => {
    setApplyJobId(id);
  };
  render(
    document.getElementById("tabelKandidat"),
    html`
      ${list.map((item, index) => {
        return html`
          <tr>
            <td>${moment(item.created_at).format("DD MMMM YYYY hh:mm")}</td>
            <td>${item.users[0]?.name}</td>
            <td>${item.jobs[0]?.job_type}</td>
            <td>${item.jobs[0]?.company}</td>
            <td>${item.jobs[0]?.title}</td>
            <td>${item.users[0]?.program_study}</td>
            <td>${html`${badgeStatus(item.status)}`}</td>
            <td class="flex space-x-4">
              <div>
                <a data-dialog-trigger=${`detail-kandidat-` + item?.id}
                  ><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16" onclick=${() => handleSetStorage(item?.id)}></iconify-icon
                ></a>
                <ui-dialog name=${`detail-kandidat-` + item?.id} className="w-[750px] h-auto p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Detail Kandidat</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full flex gap-4 text-justify">
                      <img src=${item?.users[0]?.profile_picture?.url} class="w-[150px]" alt="kandidat-image" />
                      <div class="w-full">
                        <div class="pb-2 flex gap-28">
                          <div>
                            <div class="text-xs font-bold">Nama Lengkap</div>
                            <div class="text-lg font-bold">${item?.users[0]?.name}</div>
                          </div>
                          <div>
                            <div class="text-xs font-bold">NIM</div>
                            <div class="text-xs">${item?.users[0]?.nim}</div>
                          </div>
                        </div>
                        <div class="border-b border-dashed border-gray-300"></div>
                        <div class="pb-2 flex gap-16">
                          <div class="space-y-2">
                            <div class="pt-2 flex gap-4 text-xs">
                              <div class="font-bold space-y-2">
                                <div>Telepon</div>
                                <div>Prodi</div>
                              </div>
                              <div class="space-y-2">
                                <div>${item?.users[0]?.phone_number}</div>
                                <div>${item?.users[0]?.program_study}</div>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2 flex gap-4 text-xs">
                            <div class="font-bold space-y-2">
                              <div>Email</div>
                              <div>IPK</div>
                            </div>
                            <div class="space-y-2">
                              <div>${item?.users[0]?.email}</div>
                              <div>${item?.users[0]?.ipk}</div>
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-4">
                          <div class="font-bold">Alamat</div>
                          <div>${item?.users[0]?.address}</div>
                        </div>
                      </div>
                    </div>

                    <div class="p-4 text-lg font-bold">Melamar Magang</div>
                    <div class="px-4 flex gap-14">
                      <div>
                        <div class="pt-2 flex gap-16 text-xs">
                          <div class="font-bold space-y-2">
                            <div>Perusahaan</div>
                            <div>Tanggal</div>
                          </div>
                          <div class="space-y-2">
                            <div>${item?.jobs[0]?.company}</div>
                            <div>${moment(item?.created_at).format("DD MMMM YYYY hh:mm")}</div>
                          </div>
                        </div>
                      </div>
                      <div class="pt-2 flex gap-16 text-xs">
                        <div class="font-bold space-y-2">
                          <div>Posisi</div>
                          <div>Masa Kerja</div>
                        </div>
                        <div class="space-y-2">
                          <div>${item?.jobs[0]?.title}</div>
                          <div>${item?.jobs[0]?.duration}</div>
                        </div>
                      </div>
                    </div>
                    <div class="p-4 flex gap-4">
                      <div class="font-bold">Alamat</div>
                      <div>${item?.jobs[0]?.location}</div>
                    </div>
                    <form id=${'lecturer_form_' + item?.id}>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Dosen Pembimbing</div>
                        <fo-select value=${item?.responsible_lecturer_id} id=${'lecturer_id_' + item?.id} name="lecturer_id" placeholder="Silahkan pilih disini"> </fo-select>
                        <fo-error name="lecturer_id"></fo-error>
                      </div>
                      <div class="p-4">
                        <div class="mb-2 text-lg font-bold">Dosen Penguji</div>
                        <fo-select value=${item?.examiner_lecturer_id} id=${'examiner_id_' + item?.id} name="examiner_id" placeholder="Silahkan pilih disini"> </fo-select>
                        <fo-error name="examiner_id"></fo-error>
                      </div>
                      <div class="p-4 flex justify-end gap-2">
                        <ui-button type="submit" variant="outline_orange" className="w-max flex gap-2">SIMPAN</ui-button>
                        ${item?.status === "Aktif"
                          ? html`<ui-button onclick=${() => handleDoneJob(item?.id)} type="button" className="w-max flex gap-2" data-dialog-close>
                              SELESAIKAN MASA KERJA</ui-button
                            >`
                          : ""}
                      </div>
                    </form>
                  </div>
                </ui-dialog>
              </div>
            </td>
          </tr>
        `;
      })}
    `
  );
};

//-----------------

const renderKandidatAdmin = (total) => {
  const contentKandidat = document.getElementById("content-kandidat");
  render(
    contentKandidat,
    html`
      <div class="space-y-4">
        <div class="px-12 py-4 rounded-md shadow-md">
          <div id="rekapJumlahKandidat" class="flex justify-between">
            <div class="flex items-center gap-2">
              <iconify-icon icon="solar:user-hands-bold" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
              <span class="text-lg text-ulbiBlue font-bold">Kandidat</span>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Total</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Aktif Magang</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Pelamar Magang</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Aktif Kerja</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Pelamar Kerja</div>
              <div class="text-xl font-bold">...</div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div class="text-xs text-gray-500 font-semibold">Selesai</div>
              <div class="text-xl font-bold">...</div>
            </div>
          </div>
        </div>
        <div class="px-4 py-4 space-y-4 rounded-md shadow-md">
          <div class="grid grid-cols-6 gap-2 text-xs">
            <div>
              <div class="mb-2 font-semibold">Nama</div>
              <fo-select>
                <option>Semua</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Perusahaan</div>
              <fo-select>
                <option>Semua</option>
                <option>ULBI</option>
                <option>PT. Pos Indonesia</option>
                <option>Bank Negara Indonesia</option>
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
              <div class="mb-2 font-semibold">Prodi</div>
              <fo-select>
                <option>Semua</option>
                <option>D3-Akuntansi</option>
              </fo-select>
            </div>
            <div>
              <div class="mb-2 font-semibold">Status</div>
              <fo-select>
                <option>Semua</option>
                <option>Aktif</option>
                <option>Melamar</option>
                <option>Selesai</option>
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
                    <th>TANGGAL</th>
                    <th>NAMA</th>
                    <th>TIPE</th>
                    <th>PERUSAHAAN</th>
                    <th>POSISI</th>
                    <th>PRODI</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="tabelKandidat">
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
          <div><ui-pagination id="pagination" data-pagination-count=${total} data-pagination-limit=${10} data-pagination-page=${1} /></div>
        </div>
      </div>
    `
  );
};

const renderKandidatMahasiswa = async (dataLamaran, getMyJob) => {
  const contentKandidat = document.getElementById("content-kandidat");
  let data = {};
  await API.getUsers().then((res) => {
    data = res?.data?.user;
  });
  const dataLamaranFindActive = dataLamaran.find((item) => item.status === "Aktif");
  // const dataLamaranFilterSelesai = dataLamaran.filter((item)=> item.status === "Selesai")
  const defaultImage = "src/images/dummy_ulbi.png";
  const handleToActive = async (id) => {
    await API.postApply(null, `/${id}/activate`)
      .then(async (res) => {
        toast.success("Berhasil mengaktifkan magang");
        await getMyJob();
      })
      .catch((err) => {
        toast.error("Gagal mengaktifkan magang");
      });
  };
  render(
    contentKandidat,
    html`
      <div class="space-y-4">
        <div class="rounded-md shadow-md">
          <div class="flex flex-col text-center justify-center items-center gap-4">
            <div class="pb-2 w-full flex justify-start items-center border-b border-gray-300">
              <div class="test-md p-4 font-bold">Kandidat</div>
            </div>
            <div class="w-full p-4 flex gap-4 text-justify border-b border-dashed border-gray-300">
              <img src=${data?.profile_picture?.preview} width="[250px]" alt="kandidat-image" />
              <div class="w-full">
                <div class="pb-2 flex gap-96">
                  <div>
                    <div class="text-xs font-bold">Nama Lengkap</div>
                    <div class="text-md font-bold">${data?.name}</div>
                  </div>
                  <div>
                    <div class="text-xs font-bold">NIM</div>
                    <div class="text-xs">${data?.nim}</div>
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
                        <div>${data?.phone_number}</div>
                        <div>${data?.program_study}</div>
                        <div>${data?.address}</div>
                      </div>
                    </div>
                  </div>
                  <div class="pt-2 flex gap-16 text-xs">
                    <div class="font-bold space-y-2">
                      <div>Email</div>
                      <div>IPK</div>
                    </div>
                    <div class="space-y-2">
                      <div>${data?.email}</div>
                      <div>${data?.ipk}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ${dataLamaranFindActive
              ? html`<div class="w-full p-4 text-justify mb-5">
                  <div class="test-md p-2 font-bold">Magang Aktif</div>
                  <div class="grid grid-cols-2 gap-5 ">
                    <div class="pb-2 flex gap-5">
                      <div style="width: 100px;">
                        <img src=${dataLamaranFindActive?.jobs[0]?.job_vacancy_image?.url ?? defaultImage} style="height: 100px;" />
                      </div>
                      <div class="mr-10">
                        <div class="pt-2 flex gap-16 text-xs">
                          <div class="font-bold space-y-2">
                            <div>Perusahaan</div>
                            <div>Posisi</div>
                            <div>Alamat</div>
                          </div>
                          <div class="space-y-2">
                            <div>${dataLamaranFindActive?.jobs[0]?.company}</div>
                            <div>${dataLamaranFindActive?.jobs[0]?.title}</div>
                            <div>${dataLamaranFindActive?.jobs[0]?.location}</div>
                          </div>
                        </div>
                      </div>
                      <div class="pt-2 flex gap-16 text-xs">
                        <div class="font-bold space-y-2">
                          <div class="flex justify-between gap-5">
                            <div>Status</div>
                            <div>${html`${badgeStatus(dataLamaranFindActive.status)}`}</div>
                          </div>
                          ${!dataLamaranFindActive && dataLamaranFindActive.status === "Disetujui"
                            ? html`<div>
                                <ui-button id=${`active-button`} onclick=${() => handleToActive(dataLamaranFindActive?.id)} className="w-max flex gap-1 p-2"
                                  >Jadikan Magang Aktif</ui-button
                                >
                              </div>`
                            : ""}
                        </div>
                        <div class="space-y-2"></div>
                      </div>
                    </div>
                  </div>
                </div>`
              : ""}

            <div class="w-full p-4 text-justify mb-5">
              <div class="test-md p-2 font-bold">Daftar Magang yang Dilamar</div>
              <div class="grid grid-cols-2 gap-5 ">
                ${dataLamaran.map(
                  (item, index) =>
                    html`
                      <div class="pb-2 flex gap-5">
                        <div style="width: 100px;">
                          <img src=${item?.jobs[0]?.job_vacancy_image?.url ?? defaultImage} style="height: 100px;" />
                        </div>
                        <div class="mr-10">
                          <div class="pt-2 flex gap-16 text-xs">
                            <div class="font-bold space-y-2">
                              <div>Perusahaan</div>
                              <div>Posisi</div>
                              <div>Alamat</div>
                            </div>
                            <div class="space-y-2">
                              <div>${item?.jobs[0]?.company}</div>
                              <div>${item?.jobs[0]?.title}</div>
                              <div>${item?.jobs[0]?.location}</div>
                            </div>
                          </div>
                        </div>
                        <div class="pt-2 flex gap-16 text-xs">
                          <div class="font-bold space-y-2">
                            <div class="flex justify-between gap-5">
                              <div>Status</div>
                              <div>${html`${badgeStatus(item.status)}`}</div>
                            </div>
                            ${!dataLamaranFindActive && item.status === "Disetujui"
                              ? html`<div>
                                  <ui-button id=${`active-button`} onclick=${() => handleToActive(item?.id)} className="w-max flex gap-1 p-2"
                                    >Jadikan Magang Aktif</ui-button
                                  >
                                </div>`
                              : ""}
                          </div>
                          <div class="space-y-2"></div>
                        </div>
                      </div>
                    `
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  );
};
document.addEventListener("DOMContentLoaded", async () => {
  const auth = await getUserInfo();

  if (auth.role === "mahasiswa") {
    async function getMyJob() {
      try {
        const res = await API.getListCandidate(`/user/${auth.user.id}`);
        const dataLamaran = res.data.data;
        renderKandidatMahasiswa(dataLamaran, getMyJob);
      } catch (err) {
        toast.error("Gagal mengambil data lamaran");
      }
    }
    await getMyJob();
  } else {
    let apply_job_id = null;

    const setApplyJobId = (id) => {
      console.log({ id }); // Debugging id
      apply_job_id = id;
      if (apply_job_id) {
        getListDropdown();
      }
    };

    async function fetchDataKandidat(page = 1, perPage = 10) {
      try {
        const res = await API.getListCandidate(`?page=${page}&per_page=${perPage}`);
        const dataCandidates = res.data.data;
        //fix this why not working total = res.data.count
        const total = res?.data?.count;
        await renderKandidatAdmin(total);

        fetchTabelKandidat(dataCandidates, fetchDataKandidat, setApplyJobId);
      } catch (err) {
        toast.error("Gagal mengambil data kandidat");
      }
    }

    await fetchDataKandidat();

    function renderSelectDosen(elemId, Options){
      const foSelectElement = document.getElementById(elemId);
      const defaultValue = foSelectElement?.getAttribute("value");
      console.log(defaultValue)

      // @ts-ignore
      if (foSelectElement && foSelectElement.choices) {
        // @ts-ignore
        foSelectElement.choices.clearStore();
        Options.forEach((option) => {
          // @ts-ignore
          // console.log(option)
          if(option){
            foSelectElement.choices.setChoices(
              [
                {
                  value: option?.id,
                  label: option?.name,
                  selected: option?.id == defaultValue,
                },
              ],
              "value",
              "label",
              false
            );
          }
        });

        // Re-render or reset state if needed
        // @ts-ignore
        foSelectElement.handleDisabled();
        // @ts-ignore
        foSelectElement.handleError();
      }
    }

    let lecturerList = [];
    const getListDropdown = async () => {
      try {
        const res = await API.getListLecturer(`?apply_job_id=${apply_job_id}&per_page=100`);
        lecturerList = res.data.data;
      } catch (err) {
        toast.error("Gagal mengambil data dosen");
        return;
      }

      renderSelectDosen("lecturer_id_" + apply_job_id, lecturerList)
      renderSelectDosen("examiner_id_" + apply_job_id, lecturerList)
      initForm(apply_job_id)
    };

    let forms = [];
    function initForm(id){
      console.log(forms[id])
      if(!forms[id]){
        forms[id] = document.getElementById("lecturer_form_" + id);
        const form = forms[id];
        console.log(form)
        console.log(form instanceof HTMLFormElement)
        if (form instanceof HTMLFormElement) {
          form.removeEventListener("submit", () => {});
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
    
            try {
              await API.postApply(formData, `/${apply_job_id}/set-lecturer`);
              toast.success("Berhasil menambahkan dosen pembimbing");
              await fetchDataKandidat(); // Memuat ulang data kandidat
            } catch (err) {
              toast.error("Gagal menambahkan dosen pembimbing");
            } finally {
              form.querySelectorAll("button, [type='submit']").forEach((element) => {
                if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
                  element.removeAttribute("disabled");
                }
              });
            }
          });
        }
      }
    }

    // Event listener untuk pagination
    const paginationElement = document.getElementById("pagination"); // Asumsikan ID elemen pagination
    if (paginationElement) {
      paginationElement.addEventListener("pagination-page-change", async (event) => {
        const { page } = event.detail; // Mengambil nomor halaman dari event
        await fetchDataKandidat(page);
      });
    }
  }
});
