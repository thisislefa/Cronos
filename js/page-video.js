// Additional animations for the developer section
  document.addEventListener('DOMContentLoaded', function() {
    // Card hover effect enhancement
    const devCard = document.querySelector('.defcon-developer-card');
    
    if (devCard) {
      devCard.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate3d(0, 0, 0, 0deg) translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
      });
      
      devCard.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate3d(0.5, 1, 0, 15deg)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      });
    }
    
    // Background shapes animation
    const shapes = document.querySelectorAll('.defcon-developer-shape');
    shapes.forEach((shape, index) => {
      shape.style.animation = `defcon-float ${10 + index * 2}s ease-in-out infinite alternate`;
    });
    
    // Add floating animation for shapes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes defcon-float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(${Math.random() * 30}px) rotate(${Math.random() * 10}deg); }
      }
    `;
    document.head.appendChild(style);
  });