
import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";


export default function badgeStatus(status) {
  switch (status) {
    case "Disetujui":
      return html`<ui-badge class="bg-green-600/25 text-green-600" dot>${status}</ui-badge>`;
    case "Melamar":
      return html`<ui-badge class="bg-orange-600/25 text-orange-600" dot>${status}</ui-badge>`;
    case "Ditolak":
      return html`<ui-badge class="bg-red-600/25 text-red-600" dot>${status}</ui-badge>`;
    case "Aktif":
      return html`<ui-badge class="bg-emerald-500/25 text-emerald-500" dot>${status}</ui-badge>`
    case "Selesai":
        return html`<ui-badge class="bg-blue-600/25 text-blue-600" dot>${status}</ui-badge>`
    default:
      return "";
  }

}