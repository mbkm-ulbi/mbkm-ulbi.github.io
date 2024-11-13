for (const linkDetail of document.getElementsByClassName("detail")) {
  if (linkDetail instanceof HTMLAnchorElement) {
    const id = Math.floor(Math.random() * 100000).toString();
    linkDetail.setAttribute("data-id", id);
    linkDetail.href = `${linkDetail.href}?id=${id}`;
  }
}
