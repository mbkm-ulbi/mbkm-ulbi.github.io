/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data) => {
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
};

export const formValidation2 = (form, data) => {
  let error = false;

  const verificationCode = data.get("verificationCode");
  if(!verificationCode){
    form.querySelectorAll("[name='verificationCode']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true;
  }

  return !error
}

export const formValidation3 = (form, data) => {
  let error = false;

  const nim = data.get("nim");
  const fullName = data.get("fullName");
  const prodi = data.get("prodi");
  const faculty = data.get("faculty");
  const semester = data.get("semester");
  const fileUpload = data.get("fileUpload");
  const deskripsi = data.get("deskripsi");

  if(!nim){
    form.querySelectorAll("[name='nim']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  if(!fullName){
    form.querySelectorAll("[name='fullName']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  if(!prodi){
    form.querySelectorAll("[name='prodi']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  if(!faculty){
    form.querySelectorAll("[name='faculty']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  if(!semester){
    form.querySelectorAll("[name='semester']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  if(!fileUpload){
    form.querySelectorAll("[name='fileUpload']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  if(!deskripsi){
    form.querySelectorAll("[name='deskripsi']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  return !error
}

export const formValidation4 = (form, data) => {
  let error = false

  const socialMedia = data.get("socialMedia")
  const phoneNumber = data.get("phoneNumber")

  if(!socialMedia){
    form.querySelectorAll("[name='socialMedia']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }
  if(!phoneNumber){
    form.querySelectorAll("[name='phoneNumber']").forEach((element) => element.setAttribute("error", "This field is required"));
    error = true
  }

  return !error
}