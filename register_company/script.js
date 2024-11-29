import API from "../src/js/api/index.js";
import { slugUri } from "../src/js/customs/settings.js";
import { toast } from "../src/js/libraries/notify.js";
import { formValidationFour, formValidationOne, formValidationThree, formValidationTwo } from "./validation.js";


document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("[data-tabs-target]");
  const tabContents = document.querySelectorAll('[role="tabpanel"]');

  let activeTabIndex = 0; // Menyimpan indeks tab yang aktif

  function switchTab(index) {
    if (index >= 0 && index < tabs.length) {
      // Nonaktifkan semua tab dan sembunyikan konten
      tabs.forEach((tab, i) => {
        tab.classList.remove("text-blue-800", "border-b-2", "border-blue-800");
        tab.classList.add("text-gray-500");
        tab.setAttribute("aria-selected", "false");
        tabContents[i].classList.add("hidden");
      });

      // Aktifkan tab baru dan tampilkan konten
      tabs[index].classList.remove("text-gray-500");
      tabs[index].classList.add("text-blue-800", "border-b-2", "border-blue-800");
      tabs[index].setAttribute("aria-selected", "true");
      tabContents[index].classList.remove("hidden");

      activeTabIndex = index; // Update tab aktif saat ini
    }
  }

  // Setel tab pertama sebagai aktif secara default
  switchTab(0); // Memastikan bahwa tab pertama diaktifkan saat halaman dimuat pertama kali

  // Tambahkan event listener untuk klik pada tombol tab
  // tabs.forEach((tab, index) => {
  //   tab.addEventListener("click", function () {
  //     switchTab(index);
  //   });
  // });

  let formDataState = {
    role: 'company',
    type: "email,"
  };

  // Tombol "Selanjutnya" dan "Sebelumnya"
  document.querySelectorAll("ui-button[data-tab-target]").forEach((button) => {
    button.addEventListener("click", function () {
      const targetIndex = parseInt(button.getAttribute("data-tab-target"));
      const buttonType = button.getAttribute("type");
      const form = document.getElementById(`register-form-${targetIndex}`);
      if (form instanceof HTMLFormElement) {
        if(buttonType === "submit"){
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            if(targetIndex === 1){
              if (!formValidationOne(form, formData)) return;
            } else if(targetIndex === 2){
              if (!formValidationTwo(form, formData)) return;
            } else if(targetIndex === 3){
              if(!formValidationThree(form, formData)) return;
            } else if (targetIndex === 4){
              if(!formValidationFour(form, formData)) return;
              let data = new FormData();
              data.append("role", formDataState.role);
              data.append("type", formDataState.type);
              data.append("username", formDataState.username);
              data.append("password", formDataState.password);
              data.append("email", formDataState.email);
              data.append('company_name', formDataState.companyName);
              data.append('business_field', formDataState.businessField);
              data.append('company_size', formDataState.companySize);
              data.append("company_address", formDataState.companyAddress);
              data.append('company_website', formDataState.companyWebsite);
              data.append('company_logo', formDataState.companyLogo);
              data.append('company_description', formDataState.companyDescription);
              data.append("name", formData.get("fullName"));
              data.append("position", formData.get("position"));
              data.append("company_phone_number", formData.get("companyPhoneNumber"));
              data.append("profile_picture", formDataState.companyLogo)
              await API.postRegister(data).then((res)=>{
                toast.success(res.data.message)
                window.location.assign(`${slugUri}login`);
              }).catch((err)=>{
                toast.error(err.message);
              })
            }
            for (let [key, value] of formData.entries()) {
                  formDataState[key] = value;
            } 
            console.log("Updated form data state:", formDataState);
            switchTab(targetIndex);
          });
        } else if(buttonType === "button"){
          switchTab(targetIndex);
        }
       
      }
    });
  });
});
