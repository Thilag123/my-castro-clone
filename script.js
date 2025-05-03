document.addEventListener("DOMContentLoaded", function () {

  //Hero Section
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
  });

  const h1 = document.querySelector(".hero-overlay .slide-down");
  const p = document.querySelector(".hero-overlay .slide-left");
  const herobtn = document.querySelector(".hero-overlay .hero-btn");

  function animateOverlay() {
    // Remove in case it's still there from last time
    h1.classList.remove("animate-in");
    p.classList.remove("animate-in");
    herobtn.classList.remove("animate-in");

    // Force reflow to restart animation
    void h1.offsetWidth;
    void herobtn.offsetWidth;

    // Add animation trigger
    h1.classList.add("animate-in");
    p.classList.add("animate-in");
    herobtn.classList.add("animate-in");
  }

  swiper.on("slideChangeTransitionStart", () => {
    // Optional: Remove animations immediately
    h1.classList.remove("animate-in");
    p.classList.remove("animate-in");
    herobtn.classList.remove("animate-in");
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
  const servswiper = new Swiper(".my-slider-container", {
    slidesPerView: 3,
    spaceBetween: 12,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
    // Use custom classes
    wrapperClass: "my-slider-track",
    slideClass: "my-slide",
  });

  //Dashboard Section
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // Speed can be adjusted (lower = faster)
      const speed = 50;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = Math.min(count + increment, target);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

 //Latest Projects
 
 const latestProjectswiper = new Swiper(".swiper-latest-project", {
  loop: true,      
  navigation: {
    nextEl: ".project-next",
    prevEl: ".project-prev"
  }   
});


});
