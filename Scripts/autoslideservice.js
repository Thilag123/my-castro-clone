  const slider = document.getElementById('autoSlider');
  let index = 0;

  const cardCount = slider.children.length;
  const visibleCards = 3;
  const cardWidth = slider.children[0].getBoundingClientRect().width + 30;

  function autoSlide() {
    index++;
    if (index > cardCount - visibleCards) {
      index = 0; // Reset to start
    }
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  setInterval(autoSlide, 3000); // Slide every 3 seconds

