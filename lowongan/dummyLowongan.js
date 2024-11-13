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
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 2,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Perlu Ditinjau",
      bgColor: "ulbiBlue",
    },
    {
      id: 3,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Perlu Ditinjau",
      bgColor: "ulbiBlue",
    },
    {
      id: 4,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Ditolak",
      bgColor: "ulbiBlue",
    },
    {
      id: 5,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Aktif",
      bgColor: "ulbiBlue",
    },
    {
      id: 6,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Perlu Ditinjau",
      bgColor: "ulbiBlue",
    },
    {
      id: 7,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Perlu Ditinjau",
      bgColor: "ulbiBlue",
    },
    {
      id: 8,
      picture: "src/images/dummy_pos_ind.png",
      title: "Global Finance Accounting Internship",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Ditolak",
      bgColor: "ulbiBlue",
    },
  ];
};
