import { dummyPokemon } from "./dummy.js";
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

export const getAndRender = async (page) => {
  const tableData = document.getElementById("tableData");
  const pagination = document.querySelector("ui-pagination");

  if (tableData instanceof HTMLElement) {
    pagination.setAttribute("disabled", "");

    const { data } = await dummyPokemon(page);

    pagination.removeAttribute("disabled");

    if (!data || data.length === 0) {
      return render(
        tableData,
        html`
          <tr>
            <td colspan="99" class="text-center text-gray-600">No Data</td>
          </tr>
        `
      );
    }

    render(
      tableData,
      html`
        ${data.map(
          (item) => html`
            <tr>
              <td class="text-center font-medium">${item.id}</td>
              <td>
                <div class="h-24 w-24 rounded-sm overflow-hidden mx-auto">
                  <img src=${item.image} class="h-full w-full object-cover" />
                </div>
              </td>
              <td class="capitalize">${item.name}</td>
              <td class="capitalize">${item.abilities.join(", ")}</td>
              <td class="text-center hover:animate-pulse">
                <iconify-icon icon="mdi:pokeball" height="24" class="text-blue-600" noobserver></iconify-icon>
              </td>
            </tr>
          `
        )}
      `
    );
  }
};
