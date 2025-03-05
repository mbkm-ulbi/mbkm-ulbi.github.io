/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data)=>{
    let error = false;

    const start_date = data.get("start_date");
    const end_date = data.get("end_date");
    const content = data.get("content");
    
    if(!start_date) {
        form.querySelectorAll("[name='start_date']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error start_date");
        error = true;
    }
    
    if(!end_date) {
        form.querySelectorAll("[name='end_date']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error end_date");
        error = true;
    }

    if(!content) {
        form.querySelectorAll("[name='content']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error content");
        error = true;
    }

    return !error;
}