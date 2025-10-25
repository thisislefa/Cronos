// This script provides a simple and performant scroll-reveal animation.
    document.addEventListener('DOMContentLoaded', function() {

        // Select all elements that should be animated when they appear.
        const revealElements = document.querySelectorAll('.defcon-showcase-reveal');

        // Set up the Intersection Observer.
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is in the viewport...
                if (entry.isIntersecting) {
                    // ...add the 'is-visible' class to trigger the CSS transition.
                    entry.target.classList.add('defcon-showcase-is-visible');
                    // Stop observing this element to prevent re-animation.
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible.
        });

        // Start observing each target element.
        revealElements.forEach(element => {
            observer.observe(element);
        });

    });

    document.addEventListener('DOMContentLoaded', function() {
            // Modal functionality
            const viewDetailsButtons = document.querySelectorAll('.view-details');
            const modals = document.querySelectorAll('.defcon-modal');
            const closeButtons = document.querySelectorAll('.modal-close');
            
            viewDetailsButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const service = this.getAttribute('data-service');
                    document.getElementById(`modal-${service}`).classList.add('visible');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const modal = this.closest('.defcon-modal');
                    modal.classList.remove('visible');
                    document.body.style.overflow = 'auto';
                });
            });
            
            // Close modal when clicking outside
            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('visible');
                        document.body.style.overflow = 'auto';
                    }
                });
            });
            
            // Reveal animations on scroll
            const serviceRows = document.querySelectorAll('.service-row');
            
            function checkScroll() {
                serviceRows.forEach(row => {
                    const rowTop = row.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (rowTop < windowHeight * 0.85) {
                        row.classList.add('visible');
                    }
                });
            }
            
            // Initial check
            checkScroll();
            
            // Check on scroll
            window.addEventListener('scroll', checkScroll);
        });