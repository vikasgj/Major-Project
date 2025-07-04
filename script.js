document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Current date for the footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} Quad-Segretronics Team`;
    }

    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    if(statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });

        function animateCounter(element) {
            const value = element.innerText;
            let isPercentage = value.includes('%');
            let isKg = value.includes('kg');
            
            // Extract the number
            let target = parseFloat(value.replace(/,/g, '').replace(/[^0-9.-]+/g, ''));
            let suffix = isKg ? ' kg' : (isPercentage ? '%' : '');
            
            let startVal = 0;
            let duration = 2000; // 2 seconds
            let startTime = null;
            
            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const currentValue = Math.floor(progress * (target - startVal) + startVal);
                
                // Format the number with commas for thousands
                const formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                element.innerText = `${formattedValue}${suffix}`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    }
});