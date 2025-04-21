document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 5000
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev'
    }
    
  });  

  //Autoslide
  const slider = document.getElementById("autoSlider");
  const cardWidth = slider.children[0].getBoundingClientRect().width + 30;

  function autoSlide() {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${cardWidth}px)`;

    setTimeout(() => {
      // Move first child to the end
      const firstCard = slider.children[0];
      slider.appendChild(firstCard);

      // Instantly reset position to show the next set of 3 without animation jump
      slider.style.transition = "none";
      slider.style.transform = "translateX(0)";
    }, 500); // Matches the transition duration
  }

  setInterval(autoSlide, 3000);
});