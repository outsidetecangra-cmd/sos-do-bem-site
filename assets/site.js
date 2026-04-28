(() => {
  const carouselImage = document.getElementById("carouselImage");
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");
  const intervalMs = 1500;
  const resumeDelayMs = 5000;
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

  if (!carouselImage || !prevButton || !nextButton) return;

  let slides = [];
  let current = 0;
  let timer = null;
  let resumeTimer = null;

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
    carouselImage.style.opacity = "0";
    window.setTimeout(() => {
      carouselImage.src = slides[current];
      carouselImage.style.opacity = "1";
    }, 120);
  }

  function startAutoPlay() {
    window.clearInterval(timer);
    window.clearTimeout(resumeTimer);
    timer = window.setInterval(() => {
      if (slides.length > 1) showSlide(current + 1);
    }, intervalMs);
  }

  function pauseThenResume() {
    window.clearInterval(timer);
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(startAutoPlay, resumeDelayMs);
  }

  function manualSlide(index) {
    showSlide(index);
    startAutoPlay();
  }

  Promise.all(candidates.map(testImage)).then(results => {
    slides = results.filter(Boolean);
    if (slides.length) showSlide(0);
    startAutoPlay();
  });

  prevButton.addEventListener("click", () => manualSlide(current - 1));
  nextButton.addEventListener("click", () => manualSlide(current + 1));
  carouselImage.addEventListener("click", pauseThenResume);
  carouselImage.addEventListener("touchstart", pauseThenResume, { passive: true });
})();
