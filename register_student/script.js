import API from "../src/js/api/index.js";
import { slugUri } from "../src/js/customs/settings.js";
import { toast } from "../src/js/libraries/notify.js";
import { formatError } from "../src/js/libraries/utilities.js";
import { formValidation, formValidation2, formValidation3, formValidation4 } from "./validation.js";



document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll("[data-tabs-target]");
  const tabContents = document.querySelectorAll('[role="tabpanel"]');
  console.log('wawdaw',tabs)
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

  const formDataState = {
    role: 'student',
    type: "email,"
  };

  // Tombol "Selanjutnya" dan "Sebelumnya"
  document.querySelectorAll("ui-button[data-tab-target]").forEach((button) => {
    button.addEventListener("click", function () {
      const targetIndex = parseInt(button.getAttribute("data-tab-target"));
      const buttonType = button.getAttribute("type");
      const form = document.getElementById(`register-form-${targetIndex}`);
      console.log("TargetIndex:", targetIndex);
      if(targetIndex === 0){
        switchTab(targetIndex);
      }
      if (form instanceof HTMLFormElement) {
        if(buttonType === "submit"){
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const submitButton = form.querySelector("[type='submit']");
            //@ts-ignore
            if (submitButton) submitButton.disabled = true;

            const formData = new FormData(form);
            try{
              if(targetIndex === 1){
                if (!formValidation(form, formData)) return;
              } else if(targetIndex === 2){
                if (!formValidation2(form, formData)) return;
              } else if(targetIndex === 3){
                if(!formValidation3(form, formData)) return;
              } else if (targetIndex === 4){
                if(!formValidation4(form, formData)) return;
                let data = new FormData();
                data.append("role", formDataState.role);
                data.append("type", formDataState.type);
                data.append("username", formDataState.username);
                data.append("password", formDataState.password);
                data.append("email", formDataState.email);
                data.append("nim", formDataState.nim);
                data.append("name", formDataState.fullName)
                data.append('program_study',formDataState.prodi);
                data.append("faculty", formDataState.faculty);
                data.append("semester", formDataState.semester);
                data.append("profile_picture", formDataState.fileUpload);
                data.append("deskripsi", formDataState.deskripsi || "");
                data.append("social_media", formData.get("socialMedia"));
                data.append("phone_number", formData.get("phoneNumber"));
  
                await API.postRegister(data).then((res)=>{
                  toast.success(res.data.message)
                  window.location.assign(`${slugUri}login`);
                }).catch((err)=>{
                  const errorsMessage = formatError(err.response.data.errors);
                  toast.error(errorsMessage);
                })
              }
              for (let [key, value] of formData.entries()) {
                formDataState[key] = value;
          } 
          console.log("Updated form data state:", formDataState);
          switchTab(targetIndex);
            }catch(error){
              console.error("Form submission error:", error);
            }finally{
              //@ts-ignore
              if (submitButton) submitButton.disabled = false;
            }
          
      
          }, { once: true })
        } else if(buttonType === "button"){
          switchTab(targetIndex);
        }
       
      }
    });
  });

});
