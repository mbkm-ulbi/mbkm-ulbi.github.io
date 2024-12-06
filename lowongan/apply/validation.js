/**
 * @param  {HTMLFormElement} form
 * @param  {FormData} data
 */
export const formValidation = (form, data)=>{
    let error = false;

    const email = data.get("email");
    const telepon = data.get("telepon");
    const alamat = data.get("alamat");
    const dhs = data.get("dhs");
    const cv = data.get("cv");
    const suratLamaran = data.get("surat_lamaran");

    if(!email) {
        form.querySelectorAll("[name='email']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!telepon) {
        form.querySelectorAll("[name='telepon']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!alamat) {
        form.querySelectorAll("[name='alamat']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!dhs) {
        form.querySelectorAll("[name='dhs']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!cv) {
        form.querySelectorAll("[name='cv']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }
    if(!suratLamaran) {
        form.querySelectorAll("[name='surat_lamaran']").forEach((element) => element.setAttribute("error", "This field is required"));
        error = true;
    }

    return !error;
}