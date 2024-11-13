const id = new URLSearchParams(window.location.search).get("id");

document.querySelector("#userDetail").textContent = `User Detail ${id}`;
