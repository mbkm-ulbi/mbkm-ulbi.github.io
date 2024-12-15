/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data)=>{
    let error = false;

    const company = data.get("company");
    const job_vacancy_image = data.get("job_vacancy_image");
    const title = data.get("title");
    const description = data.get("description");
    const duration = data.get("duration");
    const job_type = data.get("job_type");
    const benefit = data.get("benefits");
    const status = data.get("status");
    const vagancy_type = data.get("vagancy_type");
    const deadline = data.get("deadline");

    if(!company) {
        form.querySelectorAll("[name='company']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error company");
        error = true;
    }
    
    if(!job_vacancy_image) {
        form.querySelectorAll("[name='job_vacancy_image']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error job_vacancy_image");
        error = true;
    }

    if(!title) {
        form.querySelectorAll("[name='title']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error title");
        error = true;
    }

    if(!description) {
        form.querySelectorAll("[name='description']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error description");
        error = true;
    }

    if(!duration) {
        form.querySelectorAll("[name='duration']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error duration");
        error = true;
    }

    if(!job_type) {
        form.querySelectorAll("[name='job_type']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error job_type");
        error = true;
    }
    if(!benefit){
        form.querySelectorAll("[name='benefit']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error benefit");
        error = true;
    }

    if(!status) {
        form.querySelectorAll("[name='status']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error status");
        error = true;
    }

    if(!vagancy_type) {
        form.querySelectorAll("[name='vagancy_type']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error vagancy_type");
        error = true;
    }

    if(!deadline) {
        form.querySelectorAll("[name='deadline']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error deadline");
        error = true;
    }

    return !error;
}