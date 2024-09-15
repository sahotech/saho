const sideMenu = document.getElementById("sideMenu");
const faqIcon = document.getElementById("faq-toggle");
const faqContent = document.querySelector(".faq-item");

// open  menu function
function openMenu() {
  sideMenu.style.right = "0";
}
// close  menu function
function closeMenu() {
  sideMenu.style.right = "-300px";
}

document
  .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
  .forEach((faqItem) => {
    faqItem.addEventListener("click", () => {
      faqItem.parentNode.classList.toggle("faq-active");
    });
  });

// ================  Slide ===============
const slides = document.getElementsByClassName("test-card");
let currentImg = 0;
let dots = document.getElementsByClassName("dot");

function showSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  currentImg++;

  if (currentImg > slides.length) {
    currentImg = 1;
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[currentImg - 1].style.display = "block";
  dots[currentImg - 1].className += " active";
  setTimeout(showSlide, 5000);
}
showSlide();

// Date
var getDate = document.getElementById("get-date");
var date = new Date();
var year = date.getFullYear();
getDate.innerHTML = year;

let scrollTop = document.querySelector(".scroll-top");

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }
}
window.addEventListener("load", toggleScrollTop);
document.addEventListener("scroll", toggleScrollTop);

const preloader = document.querySelector("#preloader");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.remove();
  });
}

let navmenulinks = document.querySelectorAll(".navmenu a");

function navmenuScrollspy() {
  navmenulinks.forEach((navmenulink) => {
    if (!navmenulink.hash) return;
    let section = document.querySelector(navmenulink.hash);
    if (!section) return;
    let position = window.scrollY + 200;
    if (
      position >= section.offsetTop &&
      position <= section.offsetTop + section.offsetHeight
    ) {
      document
        .querySelectorAll(".navmenu a.active")
        .forEach((link) => link.classList.remove("active"));
      navmenulink.classList.add("active");
    } else {
      navmenulink.classList.remove("active");
    }
  });
}
window.addEventListener("load", navmenuScrollspy);
document.addEventListener("scroll", navmenuScrollspy);

//
var messageBox = document.getElementById("message-box");
function showToast(icon, msg) {
  let message = document.createElement("div");

  message.innerHTML = `<i class="${icon}"></i> ${msg}`;
  message.classList.add("toats");
  messageBox.appendChild(message);

  if (icon === errorIcon) {
    message.classList.add("error");
  }
  if (icon === successIcon) {
    message.classList.add("success");
  }

  setTimeout(() => {
    message.remove();
  }, 4000);
}
// Icons
let errorIcon = "bi-x-circle-fill";
let successIcon = "bi-check-circle-fill";

// Contact funnction
(function () {
  emailjs.init({
    publicKey: "ulA3v7kB3NdKZDwPz",
  });
})();

const form = document.getElementById("contact-form");
// const btn = document.getElementById("contactbtn");
const text = document.getElementById("load-text");
const load = document.getElementById("loading");

form.addEventListener("submit", (e) => {
  text.innerHTML = "Loading...";
  load.style.display = "block";
  var templateParams = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  emailjs.send("service_jl8kmb6", "template_s33e54z", templateParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      text.innerHTML = "Send Message";
      load.style.display = "none";

      form.reset();
      showToast(successIcon, "Your message has been sent. Thank you!");
      return false;
    },
    (error) => {
      console.log("FAILED...", error);
      text.innerHTML = "Send Message";
      load.style.display = "none";

      showToast(errorIcon, "Your message was not sent. Try again!");
    }
  );
});
