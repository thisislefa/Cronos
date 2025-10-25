document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.defcon-accordion-header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other accordion items
        document.querySelectorAll('.defcon-accordion-item').forEach(accordionItem => {
          if (accordionItem !== item) {
            accordionItem.classList.remove('active');
            accordionItem.querySelector('.defcon-accordion-header').classList.remove('active');
          }
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          this.classList.add('active');
        } else {
          item.classList.remove('active');
          this.classList.remove('active');
        }
      });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.defcon-accordion-item').forEach(item => {
      observer.observe(item);
    });
  });