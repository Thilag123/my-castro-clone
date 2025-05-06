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

  //Construction section - YouTube video
  // Get elements
  const thumbnailImage = document.querySelector(".try-hover");
  const playButton = document.getElementById("playButton");
  const modal = document.getElementById("videoModal");
  const closeModal = document.getElementById("closeModal");
  const youtubePlayer = document.getElementById("youtubePlayer");

  // Function to open modal and play video
  function openVideoModal() {
    modal.style.display = "flex";
    youtubePlayer.src = "https://www.youtube.com/embed/OrS-93U4AYQ?autoplay=1";
  }

  // Function to close modal and stop video
  function closeVideoModal() {
    modal.style.display = "none";
    youtubePlayer.src = ""; // Reset the src to stop video
  }

  // Event listeners for both image and play button
  thumbnailImage.addEventListener("click", openVideoModal);
  playButton.addEventListener("click", openVideoModal);
  closeModal.addEventListener("click", closeVideoModal);

  //Latest Projects
  const latestProjectswiper = new Swiper(".swiper-latest-project", {
    loop: true,
    navigation: {
      nextEl: ".project-next",
      prevEl: ".project-prev",
    },
  });

  //Testimonial Section
  const testimonials = [
    {
      image: "./assets/image3/madison.jpg",
      name: "Madison Black",
      position: "Founder",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos iusto <br> veritatis ipsam tempore quod quasi molestiae vel, consequatur eos <br> fugiat voluptates repellat",      
    },
    {
      image: "./assets/image3/jonathan.jpg",
      name: "Jonathan Doe",
      position: "Engineer",
      text: "sapiente mollitia fugiat non illo nisi aspernatur, velit omnis unde!<br> Voluptatem aspernatur maxime fuga.",
    },
    {
      image: "./assets/image3/john.jpg",
      name: "John Doe",
      position: "CEO",
      text: "consectetur adipisicing elit iusto veritatis ipsam tempore quod <br> quasi molestiae vel, consequatur eos fugiat voluptates repellat.",
    },
  ];

  const dots = document.querySelectorAll(".dot");
  const dotsContainer = document.querySelector(".dots");
  const profileImg = document.querySelector(".profile-img");
  const profileName = document.getElementById("profile-name");
  const profilePosition = document.getElementById("profile-position");
  const testimonialText = document.getElementById("testimonial-text");
  const section = document.querySelector(".testimonial-section");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);

      // Update content
      const t = testimonials[index];
      profileImg.src = t.image;
      profileName.textContent = t.name;
      profilePosition.textContent = t.position;
      testimonialText.innerHTML = `<em>${t.text}</em>`;

      // Zoom only on first dot
      if (index === 0) {
        section.classList.add("zoomed");
        dotsContainer.classList.add("zoomed");
      } else {
        section.classList.remove("zoomed");
        dotsContainer.classList.remove("zoomed");
      }

      // Update dot active class
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  // Blog Section
  const title = document.querySelector(".blog-title");
  title.addEventListener("mouseover", () => {
    title.style.color = "#c0392b";
  });
  title.addEventListener("mouseout", () => {
    title.style.color = "#e74c3c";
  });

});
