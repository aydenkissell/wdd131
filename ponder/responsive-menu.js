const menuButton = document.querySelector("#menuBtn");
const nav = document.querySelector("#primaryNav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("hide");
  menuButton.classList.toggle("change");
});
