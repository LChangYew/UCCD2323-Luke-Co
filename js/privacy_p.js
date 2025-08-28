    // Banner hide on scroll
    window.addEventListener('scroll', function() {
        const banner = document.querySelector('.banner');
        if (window.scrollY > 50) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    });
  
  
  
  // Simple script to hide banner on scroll
        window.addEventListener('scroll', function() {
            const banner = document.querySelector('.banner');
            if (window.scrollY > 50) {
                banner.classList.add('hidden');
            } else {
                banner.classList.remove('hidden');
            }
        });

        // Scroll navigation functionality
        document.addEventListener('DOMContentLoaded', function() {
            const scrollUpBtn = document.querySelector('.scroll-up');
            const scrollDownBtn = document.querySelector('.scroll-down');
            
            // Scroll to top function
            scrollUpBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Scroll to bottom function
            scrollDownBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            });
            
            // Show/hide buttons based on scroll position
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const documentHeight = document.body.scrollHeight;
                
                // Show up button when scrolled down
                if (scrollPosition > 100) {
                    scrollUpBtn.style.opacity = '1';
                    scrollUpBtn.style.visibility = 'visible';
                } else {
                    scrollUpBtn.style.opacity = '0';
                    scrollUpBtn.style.visibility = 'hidden';
                }
                
                // Show down button when not at bottom
                if (scrollPosition + windowHeight < documentHeight - 100) {
                    scrollDownBtn.style.opacity = '1';
                    scrollDownBtn.style.visibility = 'visible';
                } else {
                    scrollDownBtn.style.opacity = '0';
                    scrollDownBtn.style.visibility = 'hidden';
                }
            });
            
            // Initialize button visibility
            scrollUpBtn.style.opacity = '0';
            scrollUpBtn.style.visibility = 'hidden';
        });
