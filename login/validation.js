/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data) => {
  let error = false;

  const email = data.get("email");
  const password = data.get("password");
  const role = data.get("role");
  console.log(email, password, role);

  if (!email) {
    form.querySelectorAll("[name='email']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!password) {
    form.querySelectorAll("[name='password']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!role) {
    form.querySelectorAll("[name='role']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  return !error;
};
