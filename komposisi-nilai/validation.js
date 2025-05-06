/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data)=>{
    let error = false;

    const bobot_nilai_perusahaan = data.get("bobot_nilai_perusahaan");
    const bobot_nilai_pembimbing = data.get("bobot_nilai_pembimbing");
    const bobot_nilai_penguji = data.get("bobot_nilai_penguji");

    if(!bobot_nilai_perusahaan) {
        form.querySelectorAll("[name='bobot_nilai_perusahaan']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error bobot_nilai_perusahaan");
        error = true;
    }
    if(!bobot_nilai_pembimbing) {
        form.querySelectorAll("[name='bobot_nilai_pembimbing']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error bobot_nilai_pembimbing");
        error = true;
    }
    if(!bobot_nilai_penguji) {
        form.querySelectorAll("[name='bobot_nilai_penguji']").forEach((element) => element.setAttribute("error", "This field is required"));
        console.log("error bobot_nilai_penguji");
        error = true;
    }

    return !error;
}