/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data) => {
  let error = false;

  const json = Object.fromEntries(data.entries());
  console.log(json);

  if (!data.get("textInput")) {
    form.querySelectorAll("[name='textInput']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!data.get("password")) {
    form.querySelectorAll("[name='password']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!data.get("numberInput")) {
    form.querySelectorAll("[name='numberInput']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!data.get("select") || data.get("select") === "_clear") {
    form.querySelectorAll("[name='select']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!data.get("datepicker")) {
    form.querySelectorAll("[name='datepicker']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!data.get("timepicker")) {
    form.querySelectorAll("[name='timepicker']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!data.get("textArea")) {
    form.querySelectorAll("[name='textArea']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  const fileUpload = data.get("fileUpload");
  if (fileUpload instanceof File && fileUpload.size === 0) {
    form.querySelectorAll("[name='fileUpload']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  return !error;
};
