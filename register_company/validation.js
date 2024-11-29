/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidationOne = (form, data) => {
  let error = false;

  const username = data.get("username");
  const password = data.get("password");
  const confirmPassword = data.get("passwordConfirmation");
  const email = data.get("email");

  if(!username) {
    form.querySelectorAll("[name='username']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!password) {
    form.querySelectorAll("[name='password']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!confirmPassword) {
    form.querySelectorAll("[name='passwordConfirmation']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(password !== confirmPassword) {
    form.querySelectorAll("[name='password']").forEach((element) => element.setAttribute("error", "Passwords do not match"));
    form.querySelectorAll("[name='passwordConfirmation']").forEach((element) => element.setAttribute("error", "Passwords do not match"));
    error = true;
  }
  if(!email) {
    form.querySelectorAll("[name='email']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  
  return !error;

}


export const formValidationTwo = (form, data) => {
  let error = false;

  const verificationCode = data.get("verificationCode");
  if(!verificationCode){
    form.querySelectorAll("[name='verificationCode']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  return !error
}

export const formValidationThree = (form, data) => {
  let error = false;

  const companyName = data.get("companyName");
  const businessField = data.get("businessField");
  const companySize = data.get("companySize");
  const companyWebsite = data.get("companyWebsite");
  const companyLogo = data.get("companyLogo");
  const companyDescription = data.get("companyDescription");

  if(!companyName){
    form.querySelectorAll("[name='companyName']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!businessField){
    form.querySelectorAll("[name='businessField']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!companySize){
    form.querySelectorAll("[name='companySize']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!companyWebsite){
    form.querySelectorAll("[name='companyWebsite']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!companyLogo){
    form.querySelectorAll("[name='companyLogo']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!companyDescription){
    form.querySelectorAll("[name='companyDescription']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  return !error
}

export const formValidationFour = (form, data) => {
  let error = false;

  const fullName = data.get("fullName");
  const position = data.get("position");
  // const email = data.get("email");
  const companyPhoneNumber = data.get("companyPhoneNumber");

  if(!fullName){
    form.querySelectorAll("[name='fullName']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  if(!position){
    form.querySelectorAll("[name='position']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  // if(!email){
  //   form.querySelectorAll("[name='email']").forEach((element) => element.setAttribute("error", "This field is required"));
  //   error = true;
  // }
  if(!companyPhoneNumber){
    form.querySelectorAll("[name='companyPhoneNumber']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }
  return !error
}