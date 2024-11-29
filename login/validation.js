/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data) => {
  let error = false;

  const username = data.get("username");
  const password = data.get("password");
  // const role = data.get("role");
  // console.log(username, password, role);

  if (!username) {
    form.querySelectorAll("[name='username']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  if (!password) {
    form.querySelectorAll("[name='password']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  // if (!role) {
  //   form.querySelectorAll("[name='role']").forEach((element) => element.setAttribute("error", "This field is required"));
  //   error = true;
  // }
  return !error;
};
