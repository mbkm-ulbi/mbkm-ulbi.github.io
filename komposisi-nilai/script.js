import API from "../src/js/api/index.js";
import { slugUri } from "../src/js/customs/settings.js";
import { getUserInfo } from "../src/js/libraries/cookies.js";
import { toast } from "../src/js/libraries/notify.js";
import { formValidation } from "./validation.js";

document.addEventListener("DOMContentLoaded", async function () {
  const auth = await getUserInfo();
  console.log(auth?.user);
  const getInitialValue = async()=>{
    await API.getSettingBobotNilai()
    .then((res) => {
      const bobot_nilai_perusahaan = document.getElementById("bobot_nilai_perusahaan")?.querySelector("input");
      // @ts-ignore
      bobot_nilai_perusahaan.value = res.data.data.bobot_nilai_perusahaan;

      const bobot_nilai_pembimbing = document.getElementById("bobot_nilai_pembimbing")?.querySelector("input");
      // @ts-ignore
      bobot_nilai_pembimbing.value = res.data.data.bobot_nilai_pembimbing;

      const bobot_nilai_penguji = document.getElementById("bobot_nilai_penguji")?.querySelector("input");
      // @ts-ignore
      bobot_nilai_penguji.value = res.data.data.bobot_nilai_penguji;
    })
    .catch((err) => {
      toast.error("Gagal mengambil data setting bobot nilai");
    });
  }
 
  await getInitialValue()
  const form = document.getElementById("create-komposisi-nilai");
  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      if (!formValidation(form, formData)) return;
      try {
        form.querySelectorAll("button, [type='submit']").forEach((element) => {
          if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
            element.setAttribute("disabled", "true");
          }
        });
        await API.updateSettingBobotNilai(formData)
          .then(async(res) => {
            toast.success("Berhasil mengubah komposisi nilai");
            await getInitialValue()
            // setTimeout(() => {
            //     window.location.assign(`${slugUri}komposisi-nilai`);
            // }, 500);
          })
          .catch((err) => {
            toast.error("Gagal mengubah komposisi nilai");
          });
      } catch (error) {
        console.error("ERROR:", error);
        console.log(error.message);
        // Tampilkan pesan error kepada pengguna
        toast.error(error.message);
      } finally {
        form.querySelectorAll("button, [type='submit']").forEach((element) => {
          if (element instanceof HTMLButtonElement || element instanceof HTMLElement) {
            element.removeAttribute("disabled");
          }
        });
      }
    });
  }
});
