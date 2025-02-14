/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data)=>{
    let error = false;

    const year = data.get("year");
    const month = data.get("month");
    const content = data.get("content");
    
    if(!year) {
        form.querySelectorAll("[name='year']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error year");
        error = true;
    }
    
    if(!month) {
        form.querySelectorAll("[name='month']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error month");
        error = true;
    }

    if(!content) {
        form.querySelectorAll("[name='content']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error content");
        error = true;
    }

    return !error;
}