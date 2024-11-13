import { getAndRender } from "./fetch.js";

getAndRender(1);

const paginationData = document.getElementById("paginationData");

paginationData.addEventListener("pagination-page-change", async (event) => {
  // @ts-ignore
  const page = event.detail.page;
  getAndRender(page);
});
