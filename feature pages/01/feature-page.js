document.addEventListener('DOMContentLoaded', function() {
  // Parallax effect on scroll
  const showcaseSection = document.querySelector('.defcon-premium-showcase');
  const particles = document.querySelectorAll('.defcon-particle');
  const contentArea = document.querySelector('.defcon-content-area');
  
  if (showcaseSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const sectionOffset = showcaseSection.offsetTop;
      const sectionHeight = showcaseSection.offsetHeight;
      
      if (scrollPosition > sectionOffset - window.innerHeight && 
          scrollPosition < sectionOffset + sectionHeight) {
        const scrollPercent = (scrollPosition - sectionOffset) / sectionHeight;
        
        // Apply different parallax speeds
        
        if (contentArea) {
          contentArea.style.transform = `translateY(${scrollPercent * -20}px)`;
        }
        
        // Move particles at different rates
        particles.forEach((particle, index) => {
          const speed = (index + 1) * 0.5;
          particle.style.transform = `translateY(${scrollPercent * 50 * speed}px)`;
        });
      }
    });
  }
});


// Script for Stats
document.addEventListener('DOMContentLoaded', function() {
    let statsPlayed = false;
    function animateStat(el, target, duration = 1500) {
      let start = 0;
      let startTime = null;
      target = parseInt(target, 10);
      if (target === 0) {
        el.textContent = '0';
        return;
      }
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        let value = Math.floor(progress * (target - start) + start);
        el.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    }

    function playStats() {
      if (statsPlayed) return;
      statsPlayed = true;
      document.querySelectorAll('.defcon-live-stat-number').forEach(stat => {
        animateStat(stat, stat.getAttribute('data-target'));
      });
    }

    // Intersection Observer to trigger animation on scroll
    const statsSection = document.getElementById('defconLiveStats');
    if (statsSection) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playStats();
            observer.unobserve(statsSection);
          }
        });
      }, { threshold: 0.4 });
      observer.observe(statsSection);
    }
  });