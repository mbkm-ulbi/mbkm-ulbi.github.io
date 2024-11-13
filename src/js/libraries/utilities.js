export const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const simpleHash = (str) => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

export const toMonetary = (input) => {
  if (!input) return "0";
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const capitalizeEachWord = (input) => {
  if (!input) return "";
  return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};
