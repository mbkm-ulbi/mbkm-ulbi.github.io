/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data) => {
    let error = false;
    const file = data.get("file");
    if (!file) {
        form.querySelectorAll("[name='file']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    return !error;
}