import { setAuth, setFlashMessage, setUserInfo } from "../src/js/libraries/cookies.js";
import { formValidation } from "./validation.js";
import { slugUri } from "../src/js/customs/settings.js";
import { dummyOptions } from "./dummyOptions.js";
import { postLogin } from "../src/js/api/index.js";
import { toast } from "../src/js/libraries/notify.js";

const form = document.getElementById("login-form");

// Pastikan elemen adalah sebuah HTMLFormElement
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Ambil data dari form
    const formData = new FormData(form);

    // Validasi form sebelum melanjutkan
    if (!formValidation(form, formData)) return;

    try {
      // Disable semua tombol di form untuk mencegah submit ganda
      form.querySelectorAll("button, [type='submit']").forEach((element) => {
        if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
          element.setAttribute("disabled", "true");
        }
      });

      // Kirim data login ke API
      const response = await postLogin(formData);
      const { token, role, user } = response.data;

      // Simpan informasi otentikasi
      await setAuth(token);

      const userInfo = {
        role: role.toLowerCase(),
        user,
      };

      // Simpan userInfo ke cookie
      await setUserInfo(userInfo);

      // Tampilkan pesan sukses dan arahkan pengguna
      await setFlashMessage("Login Success");
      window.location.assign(`${slugUri}beranda`);
    } catch (error) {
      console.error("Login error:", error);
      console.log(error.message)
      // Tampilkan pesan error kepada pengguna
      toast.error(error.message);
    } finally {
      // Re-enable semua tombol di form
      form.querySelectorAll("button, [type='submit']").forEach((element) => {
        if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
          element.removeAttribute("disabled");
        }
      });
    }
  });
}

const getListDropdown = async () => {
  const foSelectElement = document.getElementById("role");
  // @ts-ignore
  if (foSelectElement && foSelectElement.choices) {
    // @ts-ignore
    // foSelectElement.choices.clearStore();

    // @ts-ignore
    dummyOptions.forEach((option) => {
      
      // @ts-ignore
      foSelectElement.choices.setChoices([{ value: option.value, label: option.label, selected: false }], "value", "label", false);
    });

    // Re-render or reset state if needed
    // @ts-ignore
    foSelectElement.handleDisabled();
    // @ts-ignore
    foSelectElement.handleError();
  }
};

document.addEventListener("DOMContentLoaded", async() => {

  getListDropdown();
});
