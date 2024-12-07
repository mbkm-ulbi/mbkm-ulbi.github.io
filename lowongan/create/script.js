// import { getListCompanies } from "../../src/js/api";

import API, { postLogin } from "../../src/js/api/index.js";
import { slugUri } from "../../src/js/customs/settings.js";
import { getUserInfo } from "../../src/js/libraries/cookies.js";
import { toast } from "../../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";




const renderSelectCompany =async  () =>{
  const companySelect = document.getElementById("select-company");
  
  render(
    companySelect,
    html`
            <div>
              <fo-label for="company" label="Perusahaan"></fo-label>
              <fo-select  id="company" name="company" placeholder="Silahkan pilih disini">
              </fo-select>
              <fo-error name="company"></fo-error>

            </div>
            <div class="flex border border-gray-300 rounded-md">
              <div class="pl-2 w-[120px] flex overflow-hidden rounded-l-lg">
                <img class="object-center object-contain" src="src/images/dummy_pos_ind.png" height="[100px]" alt="image" />
              </div>
              <div class="p-4 flex flex-col gap-1">
                <div class="text-md font-semibold">PT. Pos Indonesia</div>
                <div class="flex justify-start items-center gap-2">
                  <iconify-icon icon="solar:buildings-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                  <div class="text-xs">PT. Pos Indonesia</div>
                </div>
                <div class="flex justify-start items-center gap-2">
                  <iconify-icon icon="solar:map-point-bold-duotone" height="22" class="text-ulbiOrange" noobserver></iconify-icon>
                  <div class="text-xs">Bandung, Jawa Barat</div>
                </div>
              </div>
            </div>
            <div>
              <fo-label label="Upload Gambar Lowongan"></fo-label>
              <fo-file className="min-h-24" name="job_vacancy_image" accept="image/*"></fo-file>
              <fo-error name="job_vacancy_image"></fo-error>
            </div>
    `
  );
  
}

document.addEventListener("DOMContentLoaded", async function () {
  const auth = await getUserInfo()
  if(auth.role === "prodi" || auth.role === "cdc"){
    await renderSelectCompany()
  }
  const foSelectElement = document.getElementById("company");
let Options = []

  const getListDropdown = async () => {

  await API.getListCompanies().then(res => {
    Options = res.data.data
  }).catch((err)=>{
    toast.error("Gagal mengambil data perusahaan")
  })

  // @ts-ignore
  if (foSelectElement && foSelectElement.choices) {
    
    // @ts-ignore
    // foSelectElement.choices.clearStore();
    // @ts-ignore
    Options.map((option) => {
      // @ts-ignore
      foSelectElement.choices.setChoices([{ value: option?.id, label: option?.company_name, location: option?.company_address ,selected: false }], "value", "label", false);

    });

    // Re-render or reset state if needed
    // @ts-ignore
    foSelectElement.handleDisabled();
    // @ts-ignore
    foSelectElement.handleError();
  }
};
 
getListDropdown();
  // foSelectElement.addEventListener("change", (e)=>{
  //   //@ts-ignore
  //   const selectedOption = foSelectElement.choices.getValue(true); // Mendapatkan data pilihan aktif
  //   const finded = Options.find((item)=> item.id === selectedOption)
  //   console.log(finded);
  // })
  //@ts-ignore
  ClassicEditor
  .create(document.querySelector('#description'))
  .then(editor => {
      console.log('Editor berhasil diinisialisasi', editor);
  })
  .catch(error => {
      console.error('Terjadi kesalahan saat inisialisasi editor:', error);
  });

// Tangkap tombol untuk menambahkan input benefit baru
const addBenefitButton = document.getElementById("add-benefit");

// Tangkap container tempat input benefit berada
const benefitContainer = document.getElementById("benefit-container");

// Fungsi untuk menambahkan input benefit baru
addBenefitButton.addEventListener("click", function () {
  // Hitung jumlah input fo-input yang sudah ada
  const currentIndex = benefitContainer.querySelectorAll("fo-input").length;

  // Buat elemen fo-input baru
  const newBenefitInput = document.createElement("fo-input");

  // Setel atribut yang dibutuhkan
  newBenefitInput.setAttribute("name", `benefit-${currentIndex + 1}`); // Nama unik berdasarkan indeks
  newBenefitInput.setAttribute("placeholder", "Benefit Tambahan");
  newBenefitInput.setAttribute("value", "");

  // Tambahkan input baru ke dalam benefitContainer
  benefitContainer.appendChild(newBenefitInput);
});

  // const addSubjectButton = document.getElementById("add-subject");

  // // Tangkap container tempat input subject berada
  // const subjectContainer = document.getElementById("subject-container");

  // // Fungsi untuk menambahkan input subject baru
  // addSubjectButton.addEventListener("click", function () {
  //   // Buat elemen fo-input baru
  //   const newSubjectInput = document.createElement("fo-input");

  //   // Setel atribut yang dibutuhkan
  //   newSubjectInput.setAttribute("name", `subject-${Date.now()}`); // Nama unik berdasarkan waktu
  //   newSubjectInput.setAttribute("placeholder", "Mata Kuliah Tambahan");
  //   newSubjectInput.setAttribute("value", "");

  //   // Tambahkan input baru ke dalam subjectContainer
  //   subjectContainer.appendChild(newSubjectInput);
  // });

  //Form submit
  const form = document.getElementById("create-job");


  if (form instanceof HTMLFormElement){
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const company = Options.find((item)=> item.id == formData.get('company'))
      formData.set('company', company?.company_name)
      formData.append("location", company?.company_address); 
      
      //Ubah benefit menjadi string coma seperti ini "benefit1,benefit2,benefit3"
      const benefitInputs = benefitContainer.querySelectorAll("fo-input");
      //@ts-ignore
      const benefits = Array.from(benefitInputs).map((input,index) => (
        formData.get(`benefit-${index+1}`)
      ));
      console.log('benefits',benefits.join(","))
      const benefitString = benefits.join(", ").toString()
      formData.append("benefits", benefitString ); // Gabungkan manfaat dengan koma
      // Validasi form sebelum melanjutkan
      if (!formValidation(form, formData)) return;
      try{
        form.querySelectorAll("button, [type='submit']").forEach((element) => {
          if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
            element.setAttribute("disabled", "true");
          }
        });
        await API.postJob(formData).then((res)=>{
          toast.success("Berhasil membuat lowongan")
          window.location.assign(`${slugUri}lowongan`);

        }).catch((err)=>{
          toast.error("Gagal membuat lowongan")
        });
      }catch(error){
        console.error("Login error:", error);
        console.log(error.message)
        // Tampilkan pesan error kepada pengguna
        toast.error(error.message);
      }finally{
        form.querySelectorAll("button, [type='submit']").forEach((element) => {
          if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
            element.removeAttribute("disabled");
          }
        });
      }
     
    })
  }
});



