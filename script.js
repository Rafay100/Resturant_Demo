console.log("Website Loaded Successfully");

document.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {
    console.log("Navigation clicked");
  });

});