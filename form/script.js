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
