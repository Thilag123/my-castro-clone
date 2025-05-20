// Swiper initialization
const swiper = new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});

// Scroll to Top functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
