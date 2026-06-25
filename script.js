document.addEventListener("DOMContentLoaded", () => {
  const hoverSound = document.getElementById("hover-sound");
  const clickSound = document.getElementById("click-sound");
  
  if(hoverSound) hoverSound.volume = 0.2;
  if(clickSound) clickSound.volume = 0.4;

  const interactiveElements = document.querySelectorAll('.sound-trigger, .btn-gradient, .nav-item, .field-card, .faq-item');
  
  interactiveElements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      if(hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
      }
    });

    element.addEventListener("click", () => {
      if(clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      }
    });
  });

  const counters = document.querySelectorAll('.counter');
  const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + speed);
      setTimeout(() => startCounter(counter), 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  const statsSection = document.getElementById('stats');
  if(statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        counters.forEach(counter => startCounter(counter));
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
});