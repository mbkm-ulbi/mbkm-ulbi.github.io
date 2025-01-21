
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import API from "../../src/js/api/index.js";
import { toast } from "../../src/js/libraries/notify.js";


document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // Remove active styles from all buttons
            tabButtons.forEach(btn => btn.classList.remove('bg-orange-500', 'text-white'));
            tabButtons.forEach(btn => btn.classList.add('text-gray-600'));

            // Add active styles to the clicked button
            button.classList.add('bg-orange-500', 'text-white');
            button.classList.remove('text-gray-600');

            // Hide all contents
            tabContents.forEach(content => content.classList.add('hidden'));

            // Show the content corresponding to the clicked button
            const targetContent = document.getElementById(button.getAttribute('data-target'));
            targetContent.classList.remove('hidden');

            // Check if the clicked tab is "perusahaan"
            if (button.getAttribute('data-target') === 'perusahaan') {
                // Fetch data and render the company list
                let data = [];
                try {
                    const res = await API.getListCompanies(`?page=1&limit=10`);
                    data = res.data.data;
                } catch (err) {
                    toast.error("Gagal memuat data perusahaan");
                }
                renderCompanyList(data);
            } else if(button.getAttribute('data-target') === 'dosen') {
                // Fetch data and render the user list
                let data = [];
                try {
                    const res = await API.getListLecturer(`?page=1&limit=10`);
                    data = res.data.data;
                } catch (err) {
                    toast.error("Gagal memuat data pengguna");
                }
                renderLecturerList(data);
            }
        });
    });
});


const renderCompanyList = (data) =>{
    const table = document.getElementById("company-list");
    render(
        table,
        html`
            ${data.map((item) => html`
                <tr>
                    <td>${item?.created_at ?? "-"}</td>
                    <td>${item?.business_fields ?? "-"}</td>
                    <td>${item?.company_name ?? "-"}</td>
                    <td>${item?.phone ?? "-"}</td>
                    <td>${item?.phone ?? "-"}</td>
                    <td>${item?.status ?? "-"}</td>
                    <td>
                        -
                    </td>
                </tr>
            `)}
        `
    )
}

const renderLecturerList = (data) =>{
    const table = document.getElementById("dosen-list");
    render(
        table,
        html`
            ${data.map((item) => html`
                <tr>
                    <td>${item?.created_at ?? "-"}</td>
                    <td>${item?.name ?? "-"}</td>
                    <td>${item?.status ?? "-"}</td>
                    <td>
                        -
                    </td>
                </tr>
            `)}
        `
    )
}