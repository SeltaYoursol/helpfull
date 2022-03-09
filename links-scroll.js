export default function linksScroll() {
  //Переход по ссылкам меню
  let menuItems = document.querySelectorAll(".header__nav-item");

  menuItems.forEach((e) => {
    e.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#burger-btn").classList.toggle("active");
      document.querySelector(".header__nav").classList.toggle("active");
      document.querySelector("body").classList.toggle("lock");
      let targetId = event.target.getAttribute("href");
      let target = document.querySelector(targetId);
      window.scroll(0, target.offsetTop - 50);
    });
  });
}
