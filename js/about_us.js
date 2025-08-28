  // Banner hide on scroll
    window.addEventListener('scroll', function() {
        const banner = document.querySelector('.banner');
        if (window.scrollY > 50) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    });
