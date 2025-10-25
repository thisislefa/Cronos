// Animated numbers
  const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const statNumbers = entry.target.querySelectorAll('.stat-number');
              statNumbers.forEach(num => {
                  const finalNumber = num.textContent;
                  num.textContent = '0';
                  
                  const numValue = parseInt(finalNumber.replace(/\D/g, ''));
                  const suffix = finalNumber.replace(/\d/g, '');
                  
                  let current = 0;
                  const increment = numValue / 50;
                  const timer = setInterval(() => {
                      current += increment;
                      if (current >= numValue) {
                          num.textContent = finalNumber;
                          clearInterval(timer);
                      } else {
                          num.textContent = Math.floor(current) + suffix;
                      }
                  }, 30);
              });
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  observer.observe(document.querySelector('.stats-grid'));