// ==============================
// LIOR COMFORT — Premium Dark Mode Script
// ==============================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll & Blur Effect ---
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar(); // Init check

    // --- 2. Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            // Toggle icon text (hamburger to close)
            mobileBtn.textContent = navLinks.classList.contains('nav-active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                mobileBtn.textContent = '☰';
            });
        });
    }

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up');

    // Number Counter logic bound to IntersectionObserver
    const animateNumbers = (element) => {
        const target = +element.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const inc = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            current += inc;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                // Add the plus sign when done
                element.innerText = target + "+";
            }
        };
        updateCount();
    }

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Trigger counters if this element contains them
                    if(entry.target.classList.contains('hero-stats-wrapper')) {
                        const counters = entry.target.querySelectorAll('.counters');
                        counters.forEach(counter => {
                            // Only animate once
                            if(!counter.classList.contains('counted')) {
                                animateNumbers(counter);
                                counter.classList.add('counted');
                            }
                        });
                    }

                    // Unobserve to only animate once for premium feel
                    obs.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything immediately
        revealElements.forEach(el => el.classList.add('active'));
        const counters = document.querySelectorAll('.counters');
        counters.forEach(c => c.innerText = c.getAttribute('data-target') + "+");
    }

    // --- 4. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 90; // Height of the fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
