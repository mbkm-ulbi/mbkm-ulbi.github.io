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
      position: "Akuntan"
  }, {
      name: "PT TIKI",
      position: "IT Support"
  }, {
      name: "PT JNE",
      position: "Customer Service"
  }, {
      name: "PT J&T",
      position: "Marketing"
  }, {
      name: "PT Wahana",
      position: "Driver"
  }]
}, {
  label: "Mitra Perusahaan",
  companys: [{
      name: "PT POS Indonesia",
      position: "Akuntan"
  }, {
      name: "PT TIKI",
      position: "IT Support"
  }, {
      name: "PT JNE",
      position: "Customer Service"
  }, {
      name: "PT J&T",
      position: "Marketing"
  }, {
      name: "PT Wahana",
      position: "Driver"
  }]
}, {
  label: "Mahasiswa",
  companys: [{
      name: "PT POS Indonesia",
      position: "Akuntan"
  }, {
      name: "PT TIKI",
      position: "IT Support"
  }, {
      name: "PT JNE",
      position: "Customer Service"
  }, {
      name: "PT J&T",
      position: "Marketing"
  }, {
      name: "PT Wahana",
      position: "Driver"
  }]
}, {
  label: "Alumni",
  companys: [{
      name: "PT POS Indonesia",
      position: "Akuntan"
  }, {
      name: "PT TIKI",
      position: "IT Support"
  }, {
      name: "PT JNE",
      position: "Customer Service"
  }, {
      name: "PT J&T",
      position: "Marketing"
  }, {
      name: "PT Wahana",
      position: "Driver"
  }]
}]

