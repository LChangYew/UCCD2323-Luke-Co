  // Banner hide on scroll
    window.addEventListener('scroll', function() {
        const banner = document.querySelector('.banner');
        if (window.scrollY > 50) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    });


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const plusMinus = question.querySelector('span');
            
            // Toggle active class on answer
            answer.classList.toggle('active');
            
            // Change the symbol
            plusMinus.textContent = answer.classList.contains('active') ? '-' : '+';
        });
    });


    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for anchor links (optional enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
