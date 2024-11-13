import { html, render } from "https://cdn.jsdelivr.net/npm/uhtml@4.5.11/+esm";

/**
 * @element ui-carousel
 */
class UICarousel extends HTMLElement {
  constructor() {
    super();
    this.content = Array.from(this.querySelectorAll("a"));
    this.currentIndex = 0;
    this.interval = 5000;
  }

  connectedCallback() {
    this.renderTemplate();
    this.initCarousel();
  }

  renderTemplate() {
    render(
      this,
      html`
        <div class="relative overflow-hidden w-full">
          <div class="flex transition-transform duration-300 ease-in-out" id="carousel-track">
            ${this.content.map((link) => html`<div class="w-full flex-shrink-0">${link}</div>`)}
          </div>

          <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2" id="carousel-dots">
            ${this.content.map((_, index) => html`<button class="w-4 h-1 rounded-full" data-index="${index}"></button>`)}
          </div>
        </div>
      `
    );
  }

  initCarousel() {
    const track = this.querySelector("#carousel-track");
    if (!(track instanceof HTMLElement)) return;

    const slides = Array.from(track.children);
    const dots = Array.from(this.querySelectorAll("#carousel-dots button"));

    const updateSlidePosition = (index) => {
      const slideWidth = slides[index].getBoundingClientRect().width;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    };

    const setActiveDot = (index) => {
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-ulbiOrange", i === index);
        dot.classList.toggle("bg-gray-300", i !== index);
      });
    };

    const autoSlide = () => {
      this.currentIndex = (this.currentIndex + 1) % slides.length;
      updateSlidePosition(this.currentIndex);
      setActiveDot(this.currentIndex);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.currentIndex = index;
        updateSlidePosition(index);
        setActiveDot(index);
      });
    });

    let slideInterval = setInterval(autoSlide, this.interval);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, this.interval);
      });
    });

    setActiveDot(this.currentIndex);
  }
}

customElements.define("ui-carousel", UICarousel);
