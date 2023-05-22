const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// Kiểm tra kích thước màn hình khi tải trang và sau mỗi lần thay đổi kích thước
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

function start() {
  handleClickItemMenu(OpenMenu);
  checkScreenSize();
  handlesrollbrowser();
  showmenuWhensroll();
}
start();
function handleClickItemMenu(callbackOpenmenu) {
  const itemMenu = $(".menutable");
  itemMenu.addEventListener("click", () => {
    const iconmenu = $("#open");
    const iconmenuarow = $("#close");
    // tạo hiệu ứng xoay khi click vào menu
    iconmenu.classList.add("rotate-left");
    iconmenuarow.classList.add("rotate-left");
    // tạo hàm settimeout để chuyển đổi icon khi click menu sau khi xoay 0.3s
    setTimeout(() => {
      //sau 0.3s sẽ remove hiệu ứng
      iconmenu.classList.toggle("rotate-left");
      iconmenuarow.classList.toggle("rotate-left");
      // sau 0.3s chuyển đổi icon
      if (iconmenu.style.display === "none") {
        iconmenu.style.display = "block";
        iconmenuarow.style.display = "none";
      } else {
        iconmenu.style.display = "none";
        iconmenuarow.style.display = "block";
      }
      callbackOpenmenu(hadleClickPlusMinus);
    }, 400); // 0.3s (300 milliseconds)
  });
}
function OpenMenu(callbackclickshowminimenu) {
  const blockMenu = $(".nav_menu ");
  const maxWidth = 1023;
  if (window.innerWidth <= maxWidth) {
    if (blockMenu.classList.contains("open")) {
      blockMenu.classList.remove("open");
      blockMenu.classList.add("close");
    } else {
      blockMenu.classList.add("open");
      blockMenu.classList.remove("close");

      callbackclickshowminimenu();
    }
  }
}

function checkScreenSize() {
  const maxWidth = 1023;
  const blocknavMenu = $(".nav_menu");

  if (window.innerWidth > maxWidth) {
    // Kiểm tra nếu thuộc tính display là 'none' thì đổi thành 'block'
    if (blocknavMenu.style.display === "none") {
      blocknavMenu.style.display = "flex";
    }
  }
}

function hadleClickPlusMinus() {
  const iconplusminus = $$(".plus_minus");
  const minimenu = $$(".mini_menu");
  minimenu.forEach((item) => {
    item.onclick = function (e) {
      e.stopPropagation();
    };
  });

  iconplusminus.forEach((element) => {
    const parent = element.parentNode.parentNode;
    parent.onclick = (e) => {
      const minimenu = parent.querySelector(".mini_menu");
      const iconplus = parent.querySelector(".plus");
      const iconminus = parent.querySelector(".minus");
      if (iconplus.classList.contains("active")) {
        iconplus.classList.replace("active", "disable");
        iconminus.classList.replace("disable", "active");
        minimenu.classList.remove("disable");
      } else {
        iconplus.classList.replace("disable", "active");
        iconminus.classList.replace("active", "disable");
        minimenu.classList.add("disable");
      }
    };
  });
}

function handlesrollbrowser() {
  window.addEventListener("scroll", function () {
    let scrollBar = document.getElementById("scrollProgress");
    // lấy event sroll vào đối tượng window, sử dụng sroll để lấy vị trí cuộn trang,
    // nếu truyệt k hỗ trọ lấy từ element thì để lấy qua body
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    //tính toán chiều cao của trang bằng  cách lấy hiệu của chiều cao toàn bộ trang - chiều cao của nội dung hiện thì trên trinh duyệ
    let windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    //tính toán phần trăm cuộn băng cách lấy chiều cao toàn bộ trang chia cho độ dài của nội dung hiện thị trên trinh duyệt nhân vs 100
    let scrollPercent = (scrollTop / windowHeight) * 100;
    // gán phần trăm tính được cho element
    scrollBar.style.width = scrollPercent + "%";
  });
}

function showmenuWhensroll() {
  // bắt event croll trên trình duyệt
  window.addEventListener("scroll", function () {
    let navMenu = document.querySelector(".header_nav");
    let scrollPosition = window.scrollY || window.pageYOffset;
    // lấy vị trí scroll của trang qa croll Y và kiểm tra xem nếu vượt quá 30% thì add lass tickey cho element, ngc lại remove nó đi

    if (scrollPosition >= 0.3 * window.innerHeight) {
      navMenu.classList.add("sticky");
    } else {
      navMenu.classList.remove("sticky");
    }
  });
}
