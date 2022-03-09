export default function mobileMenu(node) {
  //Мобильное меню
  node.addEventListener("click", () => {
    document.querySelector(".header__nav").classList.toggle("active");
    node.classList.toggle("active");
    document.querySelector("body").classList.toggle("lock");
  });
}
