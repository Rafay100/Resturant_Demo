console.log("Royal Spice Website Loaded");

const menuCards = document.querySelectorAll(".menu-card");

menuCards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.boxShadow =
    "0 20px 50px rgba(0,0,0,0.5)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.boxShadow = "none";

  });

});

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if(window.scrollY > 50){

    nav.style.background = "#000";

  }
  else{

    nav.style.background =
    "rgba(0,0,0,0.5)";

  }

}); 