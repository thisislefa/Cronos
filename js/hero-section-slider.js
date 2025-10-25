 // DEFCON HERO SLIDER - INTERACTIVITY
  document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.defcon-hero-slides');
    const slides = document.querySelectorAll('.defcon-hero-slide');
    const dots = document.querySelectorAll('.defcon-hero-dot');
    const prevBtn = document.querySelector('.defcon-hero-prev');
    const nextBtn = document.querySelector('.defcon-hero-next');
    const pauseBtn = document.querySelector('.defcon-hero-pause');
    
    let currentSlide = 0;
    let slideCount = slides.length;
    let autoSlide = true;
    let slideInterval;
    const slideDuration = 6000; // 6 seconds
    
    // Initialize slider
    function initSlider() {
      updateSlider();
      startAutoSlide();
      
      // Set initial active states
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
          // Trigger content animation
          setTimeout(() => {
            slide.querySelector('.defcon-hero-content').style.opacity = '1';
            slide.querySelector('.defcon-hero-content').style.transform = 'translateY(0)';
          }, 100);
        } else {
          slide.classList.remove('active');
          slide.querySelector('.defcon-hero-content').style.opacity = '0';
          slide.querySelector('.defcon-hero-content').style.transform = 'translateY(30px)';
        }
      });
    }
    
    // Update slider position
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 33.333}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      
      // Update slide active states with animation
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
          // Animate content in
          setTimeout(() => {
            slide.querySelector('.defcon-hero-content').style.opacity = '1';
            slide.querySelector('.defcon-hero-content').style.transform = 'translateY(0)';
          }, 100);
        } else {
          slide.classList.remove('active');
          // Reset content animation
          slide.querySelector('.defcon-hero-content').style.opacity = '0';
          slide.querySelector('.defcon-hero-content').style.transform = 'translateY(30px)';
        }
      });
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = (index + slideCount) % slideCount;
      updateSlider();
      resetAutoSlide();
    }
    
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
      resetAutoSlide();
    }
    
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
      resetAutoSlide();
    }
    
    // Auto slide functionality
    function startAutoSlide() {
      if (autoSlide) {
        slideInterval = setInterval(nextSlide, slideDuration);
      }
    }
    
    function resetAutoSlide() {
      clearInterval(slideInterval);
      if (autoSlide) {
        startAutoSlide();
      }
    }
    
    function toggleAutoSlide() {
      autoSlide = !autoSlide;
      if (autoSlide) {
        pauseBtn.innerHTML = '❚❚';
        startAutoSlide();
      } else {
        pauseBtn.innerHTML = '►';
        clearInterval(slideInterval);
      }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    pauseBtn.addEventListener('click', toggleAutoSlide);
    
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-slide')));
      });
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextSlide(); // Swipe left
      }
      if (touchEndX > touchStartX + 50) {
        prevSlide(); // Swipe right
      }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ') {
        toggleAutoSlide();
      }
    });
    
    // Initialize
    initSlider();
  });