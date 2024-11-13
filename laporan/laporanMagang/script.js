document.addEventListener("DOMContentLoaded", () => {
  // Event listener untuk tombol "Selesai"
  const btnSelesai = document.getElementById("btnSelesai");
  btnSelesai.addEventListener("click", () => {
    // Tutup kedua dialog secara eksplisit
    const dialogSetujuiLaporan = document.querySelector('ui-dialog[name="setujui-laporan"]');
    const dialogPersetujuanBerhasil = document.querySelector('ui-dialog[name="persetujuan-berhasil"]');

    if (dialogSetujuiLaporan) dialogSetujuiLaporan.removeAttribute("open");
    if (dialogPersetujuanBerhasil) dialogPersetujuanBerhasil.removeAttribute("open");
  });
});
