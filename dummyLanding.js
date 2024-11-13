import { timeout } from "./src/js/libraries/utilities.js";

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
      picture: "src/images/dummy_bni.png",
      title: "Affiliate Marketing Strategist and Reseller Coordinator",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Aktif",
      bgColor: "white",
    },
    {
      id: 3,
      picture: "src/images/dummy_ulbi.png",
      title: "Accounting Staff Intern",
      company: "PT. Pos Indonesia",
      location: "Bandung, Jawa Barat",
      date: "6 September 2024",
      applicants: "10",
      status: "Aktif",
      bgColor: "white",
    },
  ];
};

export const detailLowonganMagangDummy = async (id) => {
  await timeout(300);

  return {
    id: 1,
  };
};

export const listArtikelDummy = async () => {
  await timeout(300);

  return [
    {
      id: 1,
      picture: "src/images/dummy_article_1.png",
      author: "Admin CDC",
      title: "Onboarding Internship PKKM Flagship Program",
      content: "Here are the biggest enterprise technology acquisition of 2021 so far, in reverse chronological order.",
      postDate: "6 September 2024",
      views: "1.250",
    },
    {
      id: 2,
      picture: "src/images/dummy_article_2.png",
      author: "Admin CDC",
      title: "Onboarding Internship PKKM Flagship Program",
      content: "Here are the biggest enterprise technology acquisition of 2021 so far, in reverse chronological order.",
      postDate: "6 September 2024",
      views: "1.250",
    },
    {
      id: 3,
      picture: "src/images/dummy_article_1.png",
      author: "Admin CDC",
      title: "Onboarding Internship PKKM Flagship Program",
      content: "Here are the biggest enterprise technology acquisition of 2021 so far, in reverse chronological order.",
      postDate: "6 September 2024",
      views: "1.250",
    },
  ];
};
