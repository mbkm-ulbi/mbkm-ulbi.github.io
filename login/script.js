import { timeout } from "../src/js/libraries/utilities.js";
import { setAuth, setFlashMessage } from "../src/js/libraries/cookies.js";
import { formValidation } from "./validation.js";
import { slugUri } from "../src/js/customs/settings.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";
import { dummyOptions } from "./dummyOptions.js";

const form = document.getElementById("login-form");
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log({form})
    if (!formValidation(form, formData)) return;

    form.querySelectorAll("ui-button").forEach((element) => element.setAttribute("disabled", ""));

    const email = formData.get("email");
    const role = formData.get("role");

    await timeout(300);
    const token = {
      email,
      role,
    };
    await setAuth(JSON.stringify(token));

    await setFlashMessage("Login Success");
    window.location.assign(`${slugUri}beranda`);
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

document.addEventListener("DOMContentLoaded", () => {
  getListDropdown();
});
