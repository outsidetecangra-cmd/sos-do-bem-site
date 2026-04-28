const carouselImage = document.getElementById("carouselImage");
const candidates = [
  "assets/carrossel/slide1.jpg.jpeg",
  "assets/carrossel/slide2.jpg.jpeg",
  "assets/carrossel/slide3.jpg.jpeg",
  "assets/carrossel/slide4.jpg.jpeg",
  "assets/carrossel/slide5.jpg.jpeg",
  "assets/carrossel/slide6.jpg.jpeg",
  "assets/carrossel/slide1.jpg",
  "assets/carrossel/slide2.jpg",
  "assets/carrossel/slide3.jpg",
  "assets/carrossel/slide4.jpg",
  "assets/carrossel/slide5.jpg",
  "assets/carrossel/slide6.jpg"
];

let slides = [];
let current = 0;

function testImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function showSlide(index) {
  if (!slides.length) return;
  current = (index + slides.length) % slides.length;
  carouselImage.src = slides[current];
}

Promise.all(candidates.map(testImage)).then(results => {
  slides = results.filter(Boolean);
  if (slides.length) showSlide(0);
});

document.querySelector(".carousel-btn.prev").addEventListener("click", () => showSlide(current - 1));
document.querySelector(".carousel-btn.next").addEventListener("click", () => showSlide(current + 1));

setInterval(() => {
  if (slides.length > 1) showSlide(current + 1);
}, 5200);
