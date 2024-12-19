/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation= (form, data) => {
    let error = false;
    const grade = data.get("grade");
    const grede_score = data.get("grede_score");
    const grade_description = data.get("grade_description");

    if(!grade) {
        form.querySelectorAll("[name='grade']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!grede_score) {
        form.querySelectorAll("[name='grede_score']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!grade_description) {
        form.querySelectorAll("[name='grade_description']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    return !error;
}