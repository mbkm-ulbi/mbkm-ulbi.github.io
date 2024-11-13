import { Notyf } from "https://cdn.jsdelivr.net/npm/notyf@3.10.0/+esm";

export const toast = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "bottom",
  },
  ripple: false,
});
