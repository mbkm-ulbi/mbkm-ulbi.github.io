import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import API from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
import micromodal from "https://cdn.jsdelivr.net/npm/micromodal@0.4.10/+esm";

document.addEventListener("DOMContentLoaded", async () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  let listRole = [];

  await API.getRoles()
    .then((res) => {
      listRole = res.data.data;
    })
    .catch((err) => {
      toast.error("Gagal memuat data penilaian");
    });

  console.log({ listRole });

  await loadTabContent(API.getListCompanies, renderContentCompany, renderCompanyList, "paginate-company", listRole);

  tabButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // Update tab styles
      tabButtons.forEach((btn) => btn.classList.remove("bg-orange-500", "text-white"));
      tabButtons.forEach((btn) => btn.classList.add("text-gray-600"));

      button.classList.add("bg-orange-500", "text-white");
      button.classList.remove("text-gray-600");

      // Hide all tab contents
      tabContents.forEach((content) => content.classList.add("hidden"));

      // Show the selected tab content
      const targetContent = document.getElementById(button.getAttribute("data-target"));
      targetContent.classList.remove("hidden");

      // Check which tab is active and render data
      const tabType = button.getAttribute("data-target");
      if (tabType === "perusahaan") {
        await loadTabContent(API.getListCompanies, renderContentCompany, renderCompanyList, "paginate-company", listRole);
      } else if (tabType === "dosen") {
        await loadTabContent(API.getListLecturer, renderContentDosen, renderLecturerList, "paginate-lecturer", listRole);
      } else if (tabType === "mahasiswa") {
        await loadTabContent(API.getListStudent, renderContentMahasiswa, renderMahasiswaList, "paginate-student", listRole);
      }
    });
  });
});

const loadTabContent = async (fetchFunction, renderContent, renderList, paginationId, listRole) => {
  let data = [];
  let totalAwal = 0;
  try {
    const res = await fetchFunction(`?page=1&limit=10`);
    data = res.data.data;
    totalAwal = res.data.count;
  } catch (err) {
    toast.error("Gagal memuat data");
  }
  renderContent(totalAwal);
  renderList(data, listRole);

  const pagination = document.getElementById(paginationId);
  if (pagination) {
    pagination.addEventListener("pagination-page-change", async (event) => {
      const { page } = event.detail; // Get the new page number
      try {
        const res = await fetchFunction(`?page=${page}&limit=10`);
        const newData = res?.data?.data || [];
        const total = res?.data?.count || 0;
        renderContent(total);
        renderList(newData, listRole); // Update the table with new data
      } catch (error) {
        console.error("Error loading pagination data:", error);
      }
    });
  }
};

const renderContentMahasiswa = (total = 0) => {
  const mahasiswa = document.getElementById("mahasiswa");

  render(
    mahasiswa,
    html`
      <p class="text-gray-700">Data User - Mahasiswa</p>
      <div class="px-4 py-4 space-y-4 rounded-md">
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div class="mb-2 font-semibold">Nama</div>
            <fo-select>
              <option>Semua</option>
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
        </div>
        <div>
          <ui-table>
            <table>
              <thead>
                <tr>
                  <th>TANGGAL DAFTAR</th>
                  <th>NAMA</th>
                  <th>PRODI</th>
                  <th>STATUS KERJA</th>
                  <th>IPK</th>
                  <th>STATUS AKUN</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody id="mahasiswa-list">
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
        <div><ui-pagination id="paginate-student" data-pagination-count=${total} data-pagination-limit="10" data-pagination-page="1" /></div>
      </div>
    `
  );
};
const renderContentDosen = (total = 0) => {
  const dosen = document.getElementById("dosen");
  render(
    dosen,
    html`
      <p class="text-gray-700">Data User - Dosen</p>
      <div class="px-4 py-4 space-y-4 rounded-md">
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div class="mb-2 font-semibold">Nama</div>
            <fo-select>
              <option>Semua</option>
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
        </div>
        <div>
          <ui-table>
            <table>
              <thead>
                <tr>
                  <th>TANGGAL DAFTAR</th>
                  <th>NAMA</th>
                  <th>PRODI</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody id="dosen-list">
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
        <div><ui-pagination id="paginate-lecturer" data-pagination-count=${total} data-pagination-limit="10" data-pagination-page="1" /></div>
      </div>
    `
  );
};
const renderContentCompany = (total = 0) => {
  const perusahaan = document.getElementById("perusahaan");
  render(
    perusahaan,
    html`
      <p class="text-gray-700">Data User - Perusahaan</p>
      <div class="px-4 py-4 space-y-4 rounded-md">
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div class="mb-2 font-semibold">Nama</div>
            <fo-select>
              <option>Semua</option>
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
        </div>
        <div>
          <ui-table>
            <table>
              <thead>
                <tr>
                  <th>TANGGAL DAFTAR</th>
                  <th>BENTUK</th>
                  <th>NAMA</th>
                  <th>BIDANG USAHA</th>
                  <th>JUMLAH LOWONGAN</th>
                  <th>STATUS AKUN</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody id="company-list">
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
        <div><ui-pagination id="paginate-company" data-pagination-count=${total} data-pagination-limit="10" data-pagination-page="1"></ui-pagination></div>
      </div>
    `
  );
};
const renderMahasiswaList = (data, listRole) => {
  const table = document.getElementById("mahasiswa-list");
  render(
    table,
    html`
      ${data.map(
        (item) => html`
          <tr>
            <td>${item?.created_at ?? "-"}</td>
            <td>${item?.name ?? "-"}</td>
            <td>${item?.program_study ?? "-"}</td>
            <td>${item?.magang ?? "-"}</td>
            <td>${item?.ipk ?? "-"}</td>
            <td>${item?.status ?? "-"}</td>
            <td>
              <div>
                <a data-dialog-trigger=${`detail-mahasiswa-` + item?.id}
                  ><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon
                ></a>
                <ui-dialog name=${`detail-mahasiswa-` + item?.id} className="w-[750px] h-auto p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Detail Mahasiswa</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full flex gap-4 text-justify">
                      <img src=${item?.profile_picture?.url} class="w-[150px] h-[150px]" alt="mahasiswa-image" />
                      <div class="w-full">
                        <div class="pb-2 flex gap-28">
                          <div>
                            <div class="text-xs font-bold">Nama Lengkap</div>
                            <div class="text-lg font-bold">${item?.name ?? "-"}</div>
                          </div>
                          <div>
                            <div class="text-xs font-bold">NIM</div>
                            <div class="text-xs">${item?.nim ?? "-"}</div>
                          </div>
                        </div>
                        <div class="border-b border-dashed border-gray-300"></div>
                        <div class="pb-2 flex gap-16">
                          <div class="space-y-2">
                            <div class="pt-2 flex gap-4 text-xs">
                              <div class="font-bold space-y-2">
                                <div>Prodi</div>
                                <div>Telepon</div>
                              </div>
                              <div class="space-y-2">
                                <div>${item?.program_study ?? "-"}</div>
                                <div>${item?.phone_number ?? "-"}</div>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2 flex gap-4 text-xs">
                            <div class="font-bold space-y-2">
                              <div>Email</div>
                              <div>IPK</div>
                            </div>
                            <div class="space-y-2">
                              <div>${item?.email ?? "-"}</div>
                              <div>${item?.ipk ?? "-"}</div>
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-4">
                          <div class="font-bold">Semester</div>
                          <div>${item?.semester ?? "-"}</div>
                        </div>
                        <form id=${`form-student-${item?.id || "default"}`}>
                          <div class="mt-4">
                            <div class="mb-2 text-lg font-bold">Role</div>
                            <fo-select
                              name="role_id"
                              id=${`role-student-${item?.id}`}
                              value=${item?.roles[0]?.id}
                              placeholder="Silahkan pilih disini"
                            ></fo-select>
                          </div>
                          <div class="p-4 flex justify-end gap-2">
                            <button type="submit" class="w-max flex gap-2 bg-orange-500 text-white px-4 py-2 rounded-md">SIMPAN</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </ui-dialog>
              </div>
            </td>
          </tr>
        `
      )}
    `
  );

  data.forEach((item) => {
    const form = document.getElementById(`form-student-${item?.id}`);

    if (form instanceof HTMLFormElement) {
      // Hapus semua event listener sebelumnya dengan mengganti elemen form baru
      const newForm = form.cloneNode(true);
      form.replaceWith(newForm);

      newForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        //@ts-ignore
        const formData = new FormData(newForm);
        console.log({ formData });
        formData.set("user_id", item?.id);

        try {
          await API.postRolesByUserId(formData);
          toast.success("Role berhasil diperbarui!");
          micromodal.close("detail-mahasiswa-" + item?.id);
          await loadTabContent(API.getListStudent, renderContentDosen, renderMahasiswaList, "paginate-student", listRole);
        } catch (error) {
          console.error("Error updating role:", error);
          toast.error("Terjadi kesalahan. Coba lagi nanti.");
        }
      });
    }
  });

  // **Inisialisasi Pilihan Role untuk Setiap `fo-select`**
  data.forEach((item) => {
    const foSelectElement = document.getElementById(`role-student-${item?.id}`);
    if (foSelectElement) {
      const defaultValue = foSelectElement.getAttribute("value");
      //@ts-ignore
      if (foSelectElement && foSelectElement.choices) {
        //@ts-ignore
        foSelectElement.choices.clearStore();

        listRole.forEach((option) => {
          //@ts-ignore
          foSelectElement.choices.setChoices(
            [
              {
                value: option?.id,
                label: option?.title,
                selected: defaultValue == option?.id,
              },
            ],
            "value",
            "label",
            false
          );
        });
        //@ts-ignore
        foSelectElement.handleDisabled();
        //@ts-ignore
        foSelectElement.handleError();
      }
    }
  });
};
const renderCompanyList = (data, listRole) => {
  const table = document.getElementById("company-list");
  console.log({ companyROle: listRole });
  render(
    table,
    html`
      ${data.map(
        (item) => html`
          <tr>
            <td>${item?.created_at ?? "-"}</td>
            <td>${item?.business_fields ?? "-"}</td>
            <td>${item?.company_name ?? "-"}</td>
            <td>${item?.phone ?? "-"}</td>
            <td>${item?.phone ?? "-"}</td>
            <td>${item?.status ?? "-"}</td>
            <td>
              <div>
                <a data-dialog-trigger=${`detail-company-` + item?.id}
                  ><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon
                ></a>
                <ui-dialog name=${`detail-company-` + item?.id} className="w-[750px] h-auto p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Detail Perusahaan</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full flex gap-4 text-justify">
                      <img src=${item?.created_at} class="w-[150px]" alt="logo-perusahaan" />
                      <div class="w-full">
                        <div class="pb-2 flex gap-28">
                          <div>
                            <div class="text-xs font-bold">Nama Perusahaan</div>
                            <div class="text-lg font-bold">${item?.company_name ?? "-"}</div>
                          </div>
                        </div>
                        <div class="border-b border-dashed border-gray-300"></div>
                        <div class="pb-2 flex gap-16">
                          <div class="space-y-2">
                            <div class="pt-2 flex gap-4 text-xs">
                              <div class="font-bold space-y-2">
                                <div>Telepon</div>
                                <div>Website</div>
                              </div>
                              <div class="space-y-2">
                                <div>${item?.company_phone_number ?? "-"}</div>
                                <div>${item?.company_website ?? "-"}</div>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2 flex gap-4 text-xs">
                            <div class="font-bold space-y-2">
                              <div>Ukuran Perusahaan</div>
                              <div>Deskripsi Perusahaan</div>
                            </div>
                            <div class="space-y-2">
                              <div>${item?.company_size ?? "-"}</div>
                              <div>${item?.company_profile_description ?? "-"}</div>
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-4">
                          <div class="font-bold">Alamat</div>
                          <div>${item?.company_address ?? "-"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ui-dialog>
              </div>
            </td>
          </tr>
        `
      )}
    `
  );

  // const foSelectElement  = document.getElementById("role");
  // // @ts-ignore
  // if(foSelectElement && foSelectElement.choices){
  //   // @ts-ignore
  //   foSelectElement.choices.clearStore();
  //   listRole.forEach((option) => {
  //     // @ts-ignore
  //     foSelectElement.choices.setChoices(
  //       [
  //         {
  //           value: option?.id,
  //           label: option?.title,
  //           selected: false,
  //         },
  //       ],
  //       "value",
  //       "label",
  //       false
  //     );
  //   });

  //   // Re-render or reset state if needed
  //   // @ts-ignore
  //   foSelectElement.handleDisabled();
  //   // @ts-ignore
  //   foSelectElement.handleError();
  // }
};

const renderLecturerList = (data, listRole) => {
  const table = document.getElementById("dosen-list");
  render(
    table,
    html`
      ${data.map(
        (item) => html`
          <tr>
            <td>${item?.created_at ?? "-"}</td>
            <td>${item?.name ?? "-"}</td>
            <td>${item?.program_study ?? "-"}</td>
            <td>${item?.role ?? "-"}</td>
            <td>${item?.status ?? "-"}</td>
            <td>
              <div>
                <a data-dialog-trigger=${`detail-lecturer-` + item?.id}
                  ><iconify-icon icon="solar:eye-bold" class="text-orange-500" height="16"></iconify-icon
                ></a>
                <ui-dialog name=${`detail-lecturer-` + item?.id} className="w-[750px] h-auto p-0">
                  <div>
                    <div class="w-full flex justify-between items-center bg-ulbiBlue p-4 rounded-t-md">
                      <div class="text-lg text-white font-bold">Detail Dosen</div>
                      <div data-dialog-close><iconify-icon icon="solar:close-circle-bold" height="22" class="text-white" noobserver></iconify-icon></div>
                    </div>
                    <div class="p-4 w-full flex gap-4 text-justify">
                      <img src=${item?.profile_picture?.url} class="w-[150px] h-[150px]" alt="logo-perusahaan" />
                      <div class="w-full">
                        <div class="pb-2 flex gap-28">
                          <div>
                            <div class="text-xs font-bold">Nama Dosen</div>
                            <div class="text-lg font-bold">${item?.name ?? "-"}</div>
                          </div>
                          <div>
                            <div class="text-xs font-bold">Program Studi</div>
                            <div class="text-lg font-bold">${item?.program_study ?? "-"}</div>
                          </div>
                        </div>
                        <div class="border-b border-dashed border-gray-300"></div>
                        <div class="pb-2 flex gap-16">
                          <div class="space-y-2">
                            <div class="pt-2 flex gap-4 text-xs">
                              <div class="font-bold space-y-2">
                                <div>Telepon</div>
                                <div>Email</div>
                              </div>
                              <div class="space-y-2">
                                <div>${item?.phone_number ?? "-"}</div>
                                <div>${item?.email ?? "-"}</div>
                              </div>
                            </div>
                          </div>
                          <div class="pt-2 flex gap-4 text-xs">
                            <div class="font-bold space-y-2">
                              <div>Fakultas</div>
                              <div>Tentang</div>
                            </div>
                            <div class="space-y-2">
                              <div>${item?.faculty ?? "-"}</div>
                              <div>${item?.profile_description ?? "-"}</div>
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-4">
                          <div class="font-bold">Kontak Darurat</div>
                          <div>${item?.emergency_contact ?? "-"}</div>
                        </div>
                        <form id=${`form-lecturer-${item?.id || "default"}`}>
                          <div class="mt-4">
                            <div class="mb-2 text-lg font-bold">Role</div>
                            <fo-select
                              name="role_id"
                              id=${`role-lecturer-${item?.id}`}
                              value=${item?.roles[0]?.id}
                              placeholder="Silahkan pilih disini"
                            ></fo-select>
                          </div>
                          <div class="p-4 flex justify-end gap-2">
                            <button type="submit" class="w-max flex gap-2 bg-orange-500 text-white px-4 py-2 rounded-md">SIMPAN</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </ui-dialog>
              </div>
            </td>
          </tr>
        `
      )}
    `
  );

  // **Menambahkan Event Listener untuk Setiap Form**
  data.forEach((item) => {
    const form = document.getElementById(`form-lecturer-${item?.id}`);
    if (form instanceof HTMLFormElement) {
      const newForm = form.cloneNode(true);
      form.replaceWith(newForm);

      newForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Mencegah reload halaman
        const formData = new FormData(form);
        console.log({ formData });
        formData.set("user_id", item?.id);

        // Mengirim data ke server
        try {
          await API.postRolesByUserId(formData);
          toast.success("Role berhasil diperbarui!");
          micromodal.close("detail-lecturer-" + item?.id);
          await loadTabContent(API.getListLecturer, renderContentDosen, renderLecturerList, "paginate-lecturer", listRole);
        } catch (error) {
          console.error("Error updating role:", error);
          toast.error("Terjadi kesalahan. Coba lagi nanti.");
        }
      });
    }
  });

  // **Inisialisasi Pilihan Role untuk Setiap `fo-select`**
  data.forEach((item) => {
    const foSelectElement = document.getElementById(`role-lecturer-${item?.id}`);
    const defaultValue = foSelectElement.getAttribute("value");
    if (defaultValue) {
      //@ts-ignore
      if (foSelectElement && foSelectElement.choices) {
        //@ts-ignore
        foSelectElement.choices.clearStore();

        listRole.forEach((option) => {
          //@ts-ignore
          foSelectElement.choices.setChoices(
            [
              {
                value: option?.id,
                label: option?.title,
                selected: defaultValue == option?.id,
              },
            ],
            "value",
            "label",
            false
          );
        });
        //@ts-ignore
        foSelectElement.handleDisabled();
        //@ts-ignore
        foSelectElement.handleError();
      }
    }
  });
};
