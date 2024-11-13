document.addEventListener("DOMContentLoaded", function () {
  // Tangkap tombol tambah benefit
  const addBenefitButton = document.getElementById("add-benefit");

  // Tangkap container tempat input benefit berada
  const benefitContainer = document.getElementById("benefit-container");

  // Fungsi untuk menambahkan input benefit baru
  addBenefitButton.addEventListener("click", function () {
    // Buat elemen fo-input baru
    const newBenefitInput = document.createElement("fo-input");

    // Setel atribut yang dibutuhkan
    newBenefitInput.setAttribute("name", `benefit-${Date.now()}`); // Nama unik berdasarkan waktu
    newBenefitInput.setAttribute("placeholder", "Benefit Tambahan");
    newBenefitInput.setAttribute("value", "");

    // Tambahkan input baru ke dalam benefitContainer
    benefitContainer.appendChild(newBenefitInput);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Tangkap tombol tambah benefit
  const addSubjectButton = document.getElementById("add-subject");

  // Tangkap container tempat input subject berada
  const subjectContainer = document.getElementById("subject-container");

  // Fungsi untuk menambahkan input subject baru
  addSubjectButton.addEventListener("click", function () {
    // Buat elemen fo-input baru
    const newSubjectInput = document.createElement("fo-input");

    // Setel atribut yang dibutuhkan
    newSubjectInput.setAttribute("name", `subject-${Date.now()}`); // Nama unik berdasarkan waktu
    newSubjectInput.setAttribute("placeholder", "Mata Kuliah Tambahan");
    newSubjectInput.setAttribute("value", "");

    // Tambahkan input baru ke dalam subjectContainer
    subjectContainer.appendChild(newSubjectInput);
  });
});
