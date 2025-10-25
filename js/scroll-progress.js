document.addEventListener('DOMContentLoaded', function() {
  const backToTopContainer = document.getElementById('backToTopContainer');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.getElementById('progressCircle');
  
  // Circle circumference for progress calculation
  const radius = 27;
  const circumference = 2 * Math.PI * radius;
  
  // Set initial stroke-dasharray
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = circumference;
  
  // Show/hide button and update progress on scroll
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollTop / scrollHeight;
    
    // Show button after scrolling 100px
    if (scrollTop > 100) {
      backToTopContainer.classList.add('show-button');
    } else {
      backToTopContainer.classList.remove('show-button');
    }
    
    // Update progress circle
    const offset = circumference - (scrollProgress * circumference);
    progressCircle.style.strokeDashoffset = offset;
  });
  
  // Smooth scroll to top when button is clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});