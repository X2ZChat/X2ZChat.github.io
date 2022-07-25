const creators = document.querySelector(".creators");

const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const creatorsOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const creatorsObserver = new IntersectionObserver(function(
  entries,
  creatorsObserver
) {
//   entries.forEach(entry => {
//     if (!entry.isIntersecting) {
//       header.classList.add("nav-scrolled");
//     } else {
//       header.classList.remove("nav-scrolled");
//     }
//   });
},
creatorsOptions);

creatorsObserver.observe(creators);

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});




// var open = document.getElementById('hamburger');
// var changeIcon = true;

// open.addEventListener("click", function(){

//     var overlay = document.querySelector('.overlay');
//     var nav = document.querySelector('nav');
//     var icon = document.querySelector('.menu-toggle i');

//     overlay.classList.toggle("menu-open");
//     nav.classList.toggle("menu-open");

//     if (changeIcon) {
//         icon.classList.remove("fa-bars");
//         icon.classList.add("fa-times");

//         changeIcon = false;
//     }
//     else {
//         icon.classList.remove("fa-times");
//         icon.classList.add("fa-bars");
//         changeIcon = true;
//     }
// });


