import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { getUserInfo } from "../../src/js/libraries/cookies.js";
import API from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";


document.addEventListener('DOMContentLoaded', async function() {
      const auth = await getUserInfo();
    if(auth.role === "superadmin"){
        let data = []
        await API.getRoles(`?page=1&limit=10`).then((res)=>{
            data = res.data.data
        }).catch((err)=>{
            toast.error("Gagal memuat data penilaian")
        })
        renderTableRole()
        renderListRole(data)

        const pagination = document.querySelector("ui-pagination");
        if (pagination) {
            pagination.addEventListener("pagination-page-change", async (event) => {
              const { page } = event.detail; // Mendapatkan halaman baru dari event
              try {
                const res = await  API.getRoles(`?page=${page}&per_page=10`);
                const newData = res?.data?.data || [];
                renderListRole(newData); // Memperbarui tabel dengan data baru
              } catch (error) {
                console.error("Gagal memuat data penilaian:", error);
                toast.error("Gagal memuat data penilaian");
              }
            });
          }
    }
})


const renderTableRole = () =>{
  const penilaian = document.getElementById("content-role");
  render(
    penilaian,
    html`
       <div class="space-y-4">
        <div class="px-4 py-4 space-y-4 rounded-md shadow-md">
         <p class="text-gray-700">Data Role</p>
          <div>
            <ui-table>
              <table>
                <thead>
                  <tr>
                    <th>KODE</th>
                    <th>NAMA</th>
                  </tr>
                </thead>
                <tbody id="table-role">
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
          <div><ui-pagination data-pagination-count=${10000} data-pagination-limit=${10} data-pagination-page=${1}/></div>
        </div>
      </div>
    `
  )
}

const renderListRole = (data) =>{
    const role = document.getElementById("table-role");
    render(
        role,
        html`
        ${data?.map((item)=>{
            return html`
            <tr>
                <td>${item?.id}</td>
                <td>${item?.title}</td>
            </tr>
            `
        })}
        `
    )
}