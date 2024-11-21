import { timeout } from "../src/js/libraries/utilities.js";

export const listPenilaian = async () => {
  await timeout(300);

  return [
    {
      id: 1,
      ratedBy: "Budi Santoso",
      score: "100",
      grade: "A",
      gradeDescription: "Sangat Baik",
      date: "31 Agustus 2024",
    },
    {
      id: 2,
      ratedBy: "Budi Santoso",
      score: "100",
      grade: "A",
      gradeDescription: "Sangat Baik",
      date: "31 Agustus 2024",
    },
    {
      id: 3,
      ratedBy: "Budi Santoso",
      score: "100",
      grade: "A",
      gradeDescription: "Sangat Baik",
      date: "31 Agustus 2024",
    },
    {
      id: 4,
      ratedBy: "Budi Santoso",
      score: 100,
      grade: "A",
      gradeDescription: "Sangat Baik",
      date: "31 Agustus 2024",
    },
  ];
};
export const dummy = [{
  label: "D3",
  jurusan: ["Akutansi", "Management Bisnis", "Management Logistik", "Sistem Informasi", "Teknik Informatika"]
}, {
  label:"Sarjana Terapan (D4)",
  jurusan: ["Sarjana Terapan Akuntansi Keuangan", "Sarjana Terapan Logistik Bisnis", "Sarjana Terapan Teknik Informatika", "Sarjana Terapan E-Commerce Logistik", "Sarjana Terapan Manajemen Bisnis"]
}, {
  label: "S1",
  jurusan: ["Sains Data", "Manajemen Transportasi", "Digital Bisnis", "Manajemen Rekayasa", "Manajemen Logistik", "Magister Manajemen Logistik"]
}, {
  label: "S2",
  jurusan: ["Magister Manajemen Logistik"]
}]

export const dummyDataNew = [{
  label: "Lowongan",
  companys: [{
      name: "PT POS Indonesia",
      position: "Akuntan",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT TIKI",
      position: "IT Support",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT JNE",
      position: "Customer Service",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT J&T",
      position: "Marketing",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT Wahana",
      position: "Driver",
      images: "src/images/dummy_ulbi.png"
  }]
}, {
  label: "Mitra Perusahaan",
  companys: [{
      name: "PT POS Indonesia",
      position: "Akuntan",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT TIKI",
      position: "IT Support",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT JNE",
      position: "Customer Service",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT J&T",
      position: "Marketing",
      images: "src/images/dummy_ulbi.png"
  }, {
      name: "PT Wahana",
      position: "Driver",
      images: "src/images/dummy_ulbi.png"
  }]
}, {
  label: "Mahasiswa",
  companys: [{
      name: "Abdul Rozak",
      position: "Akuntan",
      images: "https://avatar.iran.liara.run/public/21"

  }, {
      name: "Ade Setiawan",
      position: "IT Support",
       images: "https://avatar.iran.liara.run/public/1"
  }, {
      name: "Dina",
      position: "Customer Service",
      images: "https://avatar.iran.liara.run/public/2"

  }, {
      name: "Siti",
      position: "Marketing",
      images: "https://avatar.iran.liara.run/public/3"
  }, {
      name: "Dewi",
      position: "Driver",
      images: "https://avatar.iran.liara.run/public/4"
  }]
}, {
  label: "Alumni",
  companys: [{
      name: "Abdul Rozak",
      position: "Akuntan",
      images: "https://avatar.iran.liara.run/public/5"

  }, {
      name: "Dadang",
      position: "IT Support",
      images: "https://avatar.iran.liara.run/public/6"
  }, {
      name: "Sean",
      position: "Customer Service",
      images: "https://avatar.iran.liara.run/public/7"
  }, {
      name: "Wawan Setiawan", 
      position: "Marketing",
      images: "https://avatar.iran.liara.run/public/8"
  }, {
      name: "Dewi",
      position: "Driver",
      images: "https://avatar.iran.liara.run/public/9"

  }]
}]

