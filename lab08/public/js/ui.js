const imgs = document.querySelectorAll("img");

imgs.forEach((img) => {
  img.addEventListener("click", () => {
    alert(`You clicked on ${img.src}`);
  });
});