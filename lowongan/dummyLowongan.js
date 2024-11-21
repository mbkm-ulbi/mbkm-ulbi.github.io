import { timeout } from "../src/js/libraries/utilities.js";

export const rekapLowonganMagangDummy = async () => {
  await timeout(300);

  return {
    total: 10,
    diterima: 5,
    ditinjau: 3,
    ditolak: 1,
  };
};

export const listLowonganMagangDummy = async () => {
  await timeout(300);

  return [
    {
      id: 1,
      picture: "src/images/aice.webp",
      title: "Aice  Traninee Management Sales",
      company: "PT. Alpen Food Industry",
      location: "Auditorium Universitas Logistik dan Bisnis Indonesia",
      date: "28 November 2024 (10.00 - Selesai)",
      applicants: "3",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 2,
      picture: "src/images/dummy_ulbi.png",
      title: "Dosen Tetap",
      company: "Program Studi S1 Management Logistik",
      location: "Bandung, Jawa Barat",
      date: "1 Desember 2024",
      applicants: "0",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 3,
      picture: "src/images/dummy_ulbi.png",
      title: "Dosen Tetap",
      company: "Program Studi S1 Management Logistik",
      location: "Bandung, Jawa Barat",
      date: "1 Desember 2024",
      applicants: "0",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 2,
      picture: "src/images/dummy_ulbi.png",
      title: "Dosen Tetap",
      company: "Program Studi S1 Management Logistik",
      location: "Bandung, Jawa Barat",
      date: "1 Desember 2024",
      applicants: "0",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 2,
      picture: "src/images/dummy_ulbi.png",
      title: "Dosen Tetap",
      company: "Program Studi S1 Management Logistik",
      location: "Bandung, Jawa Barat",
      date: "1 Desember 2024",
      applicants: "0",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 2,
      picture: "src/images/dummy_ulbi.png",
      title: "Dosen Tetap",
      company: "Program Studi S1 Management Logistik",
      location: "Bandung, Jawa Barat",
      date: "1 Desember 2024",
      applicants: "0",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
  ];
};
