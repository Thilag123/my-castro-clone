document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
  });

  const h1 = document.querySelector(".hero-overlay .slide-down");
  const p = document.querySelector(".hero-overlay .slide-left");

  function animateOverlay() {
    // Remove in case it's still there from last time
    h1.classList.remove("animate-in");
    p.classList.remove("animate-in");

    // Force reflow to restart animation
    void h1.offsetWidth;

    // Add animation trigger
    h1.classList.add("animate-in");
    p.classList.add("animate-in");
  }

  swiper.on("slideChangeTransitionStart", () => {
    // Optional: Remove animations immediately
    h1.classList.remove("animate-in");
    p.classList.remove("animate-in");
  });

  swiper.on("slideChangeTransitionEnd", () => {
    animateOverlay();
  });

  // Initial load
  animateOverlay();

  // Scroll-to-top button logic
  const scrollTopBtn = document.querySelector(".scroll-top");

  // Show/hide the button based on scroll position
  function toggleScrollButton() {
    if (window.scrollY > 0 && !scrollTopBtn.classList.contains("scrolling")) {
      scrollTopBtn.classList.add("show");
    } else if (
      window.scrollY === 0 &&
      !scrollTopBtn.classList.contains("scrolling")
    ) {
      scrollTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleScrollButton);

  // Custom smooth scroll to top with acceleration (ease-in only)
  function smoothScrollToTop() {
    const start = window.scrollY;
    const duration = 1000; // Total scroll time in ms
    const startTime = performance.now();

    scrollTopBtn.classList.add("scrolling");

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in: slow start, accelerating — no deceleration
      const ease = Math.pow(progress, 3); // Cubic easing in

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      } else {
        scrollTopBtn.classList.remove("show");
        scrollTopBtn.classList.remove("scrolling");
      }
    }

    requestAnimationFrame(scrollStep);
  }

  // Use custom scroll on button click
  scrollTopBtn.addEventListener("click", smoothScrollToTop);

  // Run once on page load
  toggleScrollButton();

  //Autoslide for service section
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
