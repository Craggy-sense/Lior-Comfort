// ==============================
// LIOR COMFORT — Premium Dark Mode Script
// ==============================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll & Blur Effect ---
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // --- 2. Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileBtn.textContent = navLinks.classList.contains('nav-active') ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                mobileBtn.textContent = '☰';
            });
        });
    }

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up');

    const animateNumbers = (element) => {
        const targetAttr = element.getAttribute('data-target');
        if (!targetAttr) return;
        const target = +targetAttr;
        const duration = 2000;
        const inc = target / (duration / 16); 
        let current = 0;

        const updateCount = () => {
            current += inc;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target + "+";
            }
        };
        updateCount();
    };

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    if(entry.target.classList.contains('hero-stats-wrapper')) {
                        const counters = entry.target.querySelectorAll('.counters');
                        counters.forEach(counter => {
                            if(!counter.classList.contains('counted')) {
                                animateNumbers(counter);
                                counter.classList.add('counted');
                            }
                        });
                    }
                    obs.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- 4. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(other => {
                    if (other !== item) other.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });

    // --- 6. Testimonials Slider ---
    const track = document.getElementById('testimonial-track');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    const updateSlider = (index) => {
        if (!track || !dots[index]) return;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentSlide = index;
    };

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateSlider(idx);
        });
    });

    if (dots.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            updateSlider(currentSlide);
        }, 6000);
    }

    // --- 7. Booking Form & Destination Logic ---
    const transportSelect = document.getElementById('transport-service');
    const accommodationSelect = document.getElementById('accommodation-addon');
    const otherWrap = document.getElementById('other-destination-wrap');

    if (transportSelect && otherWrap && accommodationSelect) {
        transportSelect.addEventListener('change', () => {
            // Toggle 'Other' field
            if (transportSelect.value === 'other') {
                otherWrap.classList.remove('hidden');
            } else {
                otherWrap.classList.add('hidden');
            }

            // Enable Accommodation only if Transport is selected
            if (transportSelect.value) {
                accommodationSelect.disabled = false;
                accommodationSelect.removeAttribute('title');
                accommodationSelect.classList.remove('disabled-select');
            } else {
                accommodationSelect.disabled = true;
                accommodationSelect.classList.add('disabled-select');
            }
        });
    }

    // --- 8. Safari & Stay Details Modal ---
    const modal = document.getElementById('safari-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    // We use a broader selector to catch both safari and bnb buttons
    // Since they all use the safari-details-btn class now
    const detailButtons = document.querySelectorAll('.safari-details-btn');

    const experienceData = {
        // --- Safaris ---
        mara: {
            title: "Maasai Mara Premium Safari",
            image: "assets/dest-mara.png",
            desc: "Experience the ultimate African safari in the world-renowned Maasai Mara. Known for its exceptional population of big cats and the Great Migration.",
            highlights: ["Witness the Great Migration", "Big Five Tracking", "Luxury Tented Camp Stay", "Hot Air Balloon Option"]
        },
        amboseli: {
            title: "Amboseli Elephant Paradise",
            image: "assets/dest-amboseli.png",
            desc: "Famous for being the best place in the world to get close to free-ranging elephants, all with the backdrop of the majestic Kilimanjaro.",
            highlights: ["Kilimanjaro Views", "Giant Elephant Herds", "Photography Safaris", "Observation Hill Visit"]
        },
        diani: {
            title: "Diani Beach Coastal Escape",
            image: "assets/dest-diani.png",
            desc: "Relax on the pristine white sands of Diani. Perfect for water sports enthusiasts or those seeking a serene tropical getaway.",
            highlights: ["Pristine White Sands", "Snorkeling & Diving", "Deep Sea Fishing", "Luxury Beachfront Villas"]
        },
        mtkenya: {
            title: "Mount Kenya Adventure",
            image: "assets/dest-mtkenya.jpg",
            desc: "A trekker's paradise. Scale the second-highest peak in Africa and enjoy dramatic alpine scenery and diverse ecosystems.",
            highlights: ["Point Lenana Summit", "Glacial Valleys", "Unique Alpine Flora", "Professional Mountain Guides"]
        },
        nakuru: {
            title: "Lake Nakuru & Rhinos",
            image: "assets/dest-nakuru.jpg",
            desc: "A birder's haven hosting millions of flamingos. It's also one of the best places in Kenya to spot the rare White and Black Rhinos.",
            highlights: ["Millions of Flamingos", "Rhino Sanctuary", "Baboon Cliff Views", "Diverse Bird Species"]
        },
        lamu: {
            title: "Lamu Heritage Retreat",
            image: "assets/dest-lamu.jpg",
            desc: "Step back in time in the oldest Swahili settlement. Lamu is a UNESCO World Heritage site full of history, culture, and peace.",
            highlights: ["UNESCO Old Town", "Traditional Dhow Sails", "Swahili Architecture", "Pristine Shell Beaches"]
        },
        // --- BnB / Luxury Stays (The Moon Apartments) ---
        'moon-lymack': {
            title: "The Moon Lymack (Fourways)",
            image: "assets/MoonLymack.png",
            desc: "Experience ultra-modern urban living at Fourways Junction. The Moon Lymack offers executive suites with premium finishes and world-class amenities.",
            highlights: ["Infinity Pool & Gym", "Secure Gated Community", "Near UN & Village Market", "High-Speed Elevators"]
        },
        'moon-ruaka': {
            title: "The Moon Ruaka",
            image: "assets/MoonRuaka.png",
            desc: "Stylishly furnished executive apartments in the heart of Ruaka. Ideally located for those visiting Two Rivers Mall and the Northern Bypass.",
            highlights: ["Sleek Contemporary Design", "24/7 Security & CCTV", "Proximity to Two Rivers", "Fast Fiber Internet"]
        },
        'moon-thindigua': {
            title: "The Moon Thindigua",
            image: "assets/MoonThindigua.png",
            desc: "Charming and modern suites along Kiambu Road. The Moon Thindigua provides a peaceful yet accessible luxury stay for business and leisure.",
            highlights: ["Executive Furnishings", "Backup Power & Water", "Breathtaking Balcony Views", "Ample Secure Parking"]
        },
        'da-azizi': {
            title: "Da Azizi (Diani)",
            image: "assets/da-azizi.jpg",
            desc: "A boutique coastal sanctuary in Diani. Da Azizi offers a unique blend of Swahili architecture and modern luxury, just minutes from the turquoise waters.",
            highlights: ["Swahili Design Aesthetic", "Private Tropical Garden", "Close to Beach Access", "High-End Comfort"]
        },
        'shanzu-bnb': {
            title: "Shanzu Luxury Stay (Mombasa)",
            image: "assets/shanzu-bnb.jpg",
            desc: "Modern executive living in Shanzu, Mombasa. Perfectly located for guests seeking a mix of beach vibes and urban convenience on the North Coast.",
            highlights: ["Ocean Breeze Balconies", "Modern Kitchen & Living", "Secure Gated Complex", "Near Shanzu Beach"]
        }
    };

    const openModal = (experienceKey) => {
        const data = experienceData[experienceKey];
        if (!data || !modalBody) return;

        modalBody.innerHTML = `
            <h2 class="serif">${data.title}</h2>
            <img src="${data.image}" alt="${data.title}" class="modal-image">
            <p>${data.desc}</p>
            <h4 class="serif mt-30">Experience Highlights</h4>
            <div class="modal-highlights">
                ${data.highlights.map(h => `<div class="highlight-item">${h}</div>`).join('')}
            </div>
            <button class="btn-primary w-full border-none" onclick="handleModalAction('${experienceKey}')">
                ${experienceKey.includes('moon') || experienceKey === 'da-azizi' || experienceKey === 'shanzu-bnb' ? 'Add to Car Booking &rarr;' : 'Select This Journey &rarr;'}
            </button>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    };

    // Global action handler for modal buttons
    window.handleModalAction = (key) => {
        const modal = document.getElementById('safari-modal');
        const transport = document.getElementById('transport-service');
        const accommodation = document.getElementById('accommodation-addon');
        const bookingSection = document.getElementById('booking-section');

        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        bookingSection.scrollIntoView({ behavior: 'smooth' });

        // Logic split by type
        if (key.includes('moon') || key === 'da-azizi' || key === 'shanzu-bnb') {
            // This is a Stay
            if (!transport.value) {
                setTimeout(() => {
                    alert("Exclusive Rule: Please select your transport/shuttle first to add a luxury stay to your booking.");
                    transport.focus();
                }, 600);
            } else {
                accommodation.value = key;
                accommodation.classList.add('highlight-field');
                setTimeout(() => accommodation.classList.remove('highlight-field'), 2000);
            }
        } else {
            // This is a Transport/Safari
            transport.value = key;
            transport.dispatchEvent(new Event('change')); // Trigger dependency logic
            transport.classList.add('highlight-field');
            setTimeout(() => transport.classList.remove('highlight-field'), 2000);
        }
    };

    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-safari');
            openModal(key);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // --- 9. Calendar Logic ---
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthText = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const selectedDatesText = document.getElementById('selected-dates-text');

    let date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();
    let startDate = null;
    let endDate = null;

    const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];

    const renderCalendar = () => {
        if (!calendarDays || !currentMonthText) return;

        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="calendar-day disabled">${lastDateofLastMonth - i + 1}</li>`;
        }

        const todayDate = new Date();
        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === todayDate.getDate() && currMonth === todayDate.getMonth() 
                        && currYear === todayDate.getFullYear() ? "today" : "";
            
            let currentLoopDate = new Date(currYear, currMonth, i);
            let isSelected = (startDate && currentLoopDate.getTime() === startDate.getTime()) || 
                             (endDate && currentLoopDate.getTime() === endDate.getTime()) ? "selected" : "";
            let isInRange = startDate && endDate && currentLoopDate > startDate && currentLoopDate < endDate ? "in-range" : "";

            liTag += `<li class="calendar-day ${isToday} ${isSelected} ${isInRange}" data-day="${i}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="calendar-day disabled">${i - lastDayofMonth + 1}</li>`;
        }

        currentMonthText.innerText = `${months[currMonth]} ${currYear}`;
        calendarDays.innerHTML = liTag;

        const dayElements = calendarDays.querySelectorAll('.calendar-day:not(.disabled)');
        dayElements.forEach(day => {
            day.addEventListener('click', () => {
                const dayValue = parseInt(day.getAttribute('data-day'));
                const selected = new Date(currYear, currMonth, dayValue);

                if (!startDate || (startDate && endDate)) {
                    startDate = selected;
                    endDate = null;
                } else if (selected < startDate) {
                    startDate = selected;
                } else if (selected.getTime() === startDate.getTime()) {
                    startDate = null;
                } else {
                    endDate = selected;
                }

                renderCalendar();
                updateSelectedDatesText();
            });
        });
    };

    const updateSelectedDatesText = () => {
        if (!selectedDatesText) return;
        if (startDate && endDate) {
            selectedDatesText.innerText = `Selected: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
        } else if (startDate) {
            selectedDatesText.innerText = `Starting: ${startDate.toLocaleDateString()} (Select end date)`;
        } else {
            selectedDatesText.innerText = "Please select your travel dates on the calendar.";
        }
    };

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener("click", () => {
            currMonth--;
            if (currMonth < 0) {
                currMonth = 11;
                currYear--;
            }
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener("click", () => {
            currMonth++;
            if (currMonth > 11) {
                currMonth = 0;
                currYear++;
            }
            renderCalendar();
        });
    }

    renderCalendar();

    // --- 10. Final Booking Request Logic ---
    const bookingForm = document.getElementById('booking-form');
    const paymentSection = document.getElementById('payment-section');
    const submitBtn = document.getElementById('submit-booking');
    let isPaymentStep = false;

    if (bookingForm && paymentSection && submitBtn) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!transportSelect.value) {
                alert("A vehicle or transfer service selection is required to proceed.");
                transportSelect.focus();
                return;
            }

            if (!startDate || !endDate) {
                alert("Please select your travel dates on the calendar first!");
                return;
            }

            if (!isPaymentStep) {
                paymentSection.classList.remove('hidden');
                submitBtn.innerText = "Confirm & Pay Securely";
                isPaymentStep = true;
                paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "Processing Luxury Booking...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    const transportVal = transportSelect.options[transportSelect.selectedIndex].text;
                    const stayVal = accommodationSelect.value !== 'none' ? accommodationSelect.options[accommodationSelect.selectedIndex].text : "No Accommodation";
                    
                    alert("Success! Your booking for [" + transportVal + "] with Add-on: [" + stayVal + "] has been confirmed. Our Executive Concierge will reach out via email shortly. Reference: LIOR-" + Math.floor(Math.random() * 90000 + 10000));
                    
                    bookingForm.reset();
                    accommodationSelect.disabled = true; // Reset dependent field
                    paymentSection.classList.add('hidden');
                    submitBtn.innerText = "Proceed to Payment";
                    submitBtn.disabled = false;
                    isPaymentStep = false;
                    startDate = null;
                    endDate = null;
                    renderCalendar();
                    updateSelectedDatesText();
                }, 2500);
            }
        });
    }

});
