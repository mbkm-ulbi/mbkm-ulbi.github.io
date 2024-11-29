// import { getListCompanies } from "../../src/js/api";

import API from "../../src/js/api/index.js";



const getListDropdown = async () => {
  const foSelectElement = document.getElementById("perusahaan-select");
  
  // await API.getListCompanies().then(res => {
  //   Options = res.data.data
  // }).catch((err)=>{
  //   console.log(err)
  // })
  // @ts-ignore
  if (foSelectElement.choicesInstance) {
  // @ts-ignore
    foSelectElement.choicesInstance.destroy();
  }

  // @ts-ignore
  if (foSelectElement && foSelectElement.choices) {
    // @ts-ignore
    // foSelectElement.choices.clearStore();
    // @ts-ignore
    let Options = [
      {
        "id": 1,
        "company_name": "KARISMA TECH",
        "business_fields": "TECH",
        "company_size": 300,
        "company_website": "https://www.google.com/",
        "company_profile_description": "lorem ipsum dolor sit amet",
        "company_phone_number": "+628123499999",
        "company_address": "jl rajawali jogja",
        "created_at": "2024-11-25 14:14:25",
        "updated_at": "2024-11-25 14:14:25",
        "deleted_at": null,
        "user_id": 23,
        "created_by_id": 23,
        "media": null
      },
      {
        "id": 2,
        "company_name": "KARISMA TECH",
        "business_fields": "TECH",
        "company_size": 300,
        "company_website": "https://www.google.com/",
        "company_profile_description": "lorem ipsum dolor sit amet",
        "company_phone_number": "+628123499999",
        "company_address": "jl rajawali jogja",
        "created_at": "2024-11-26 09:24:19",
        "updated_at": "2024-11-26 09:24:19",
        "deleted_at": null,
        "user_id": 24,
        "created_by_id": 24,
        "media": null
      },
      {
        "id": 3,
        "company_name": "KARISMA TECH",
        "business_fields": "TECH",
        "company_size": 300,
        "company_website": "https://www.google.com/",
        "company_profile_description": "lorem ipsum dolor sit amet",
        "company_phone_number": "+628123499999",
        "company_address": "jl rajawali jogja",
        "created_at": "2024-11-27 06:50:25",
        "updated_at": "2024-11-27 06:50:25",
        "deleted_at": null,
        "user_id": 25,
        "created_by_id": 25,
        "media": null
      }
    ]
    Options.map((option) => {
      console.log('nameee',option?.id)
      // @ts-ignore
      foSelectElement.choices.setChoices([{ value: option?.id, label: option?.company_name, selected: false }], "value", "label", false);

    });

    // Re-render or reset state if needed
    // @ts-ignore
    foSelectElement.handleDisabled();
    // @ts-ignore
    foSelectElement.handleError();
  }
};

document.addEventListener("DOMContentLoaded", async function () {

  // await getListDropdown()
  

  // Tangkap tombol tambah benefit
  const addBenefitButton = document.getElementById("add-benefit");

  // Tangkap container tempat input benefit berada
  const benefitContainer = document.getElementById("benefit-container");

  // Fungsi untuk menambahkan input benefit baru
  addBenefitButton.addEventListener("click", function () {
    // Buat elemen fo-input baru
    const newBenefitInput = document.createElement("fo-input");

    // Setel atribut yang dibutuhkan
    newBenefitInput.setAttribute("name", `benefit-${Date.now()}`); // Nama unik berdasarkan waktu
    newBenefitInput.setAttribute("placeholder", "Benefit Tambahan");
    newBenefitInput.setAttribute("value", "");

    // Tambahkan input baru ke dalam benefitContainer
    benefitContainer.appendChild(newBenefitInput);
  });

  const addSubjectButton = document.getElementById("add-subject");

  // Tangkap container tempat input subject berada
  const subjectContainer = document.getElementById("subject-container");

  // Fungsi untuk menambahkan input subject baru
  addSubjectButton.addEventListener("click", function () {
    // Buat elemen fo-input baru
    const newSubjectInput = document.createElement("fo-input");

    // Setel atribut yang dibutuhkan
    newSubjectInput.setAttribute("name", `subject-${Date.now()}`); // Nama unik berdasarkan waktu
    newSubjectInput.setAttribute("placeholder", "Mata Kuliah Tambahan");
    newSubjectInput.setAttribute("value", "");

    // Tambahkan input baru ke dalam subjectContainer
    subjectContainer.appendChild(newSubjectInput);
  });
});



