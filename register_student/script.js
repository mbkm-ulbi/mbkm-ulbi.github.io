import { toast } from "../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";

const form = document.getElementById("form-form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    if (!formValidation(form, formData)) return;

    await fetch("/api/form", {
      method: "POST",
      body: formData,
    });

    toast.success("Success submit form");
  });
}

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
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      switchTab(index);
    });
  });

  // Tombol "Selanjutnya" dan "Sebelumnya"
  document.querySelectorAll("ui-button[data-tab-target]").forEach((button) => {
    button.addEventListener("click", function () {
      const targetIndex = parseInt(button.getAttribute("data-tab-target"));
      switchTab(targetIndex);
    });
  });
});
