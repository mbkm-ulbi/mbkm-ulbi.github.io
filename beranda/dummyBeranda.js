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
