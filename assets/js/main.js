document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    /* =========================================
       1. Mobile Navigation & Dropdown
    ========================================= */
    const body = document.body;
    const header = document.querySelector('.header');
    const mobileBtn = document.querySelector('.mobile-nav-toggle');
    const navmenu = document.querySelector('.navmenu');

    function toggleNav() {
        body.classList.toggle('mobile-nav-active');
        if (mobileBtn) {
            mobileBtn.classList.toggle('bi-list');
            mobileBtn.classList.toggle('bi-x');
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleNav);
    }

    if (navmenu) {
        navmenu.addEventListener('click', (e) => {
            if (e.target === navmenu && body.classList.contains('mobile-nav-active')) {
                toggleNav();
            }
        });
    }

    // Dropdown Handling for Mobile
    document.querySelectorAll('.navmenu .dropdown > a').forEach(drop => {
        drop.addEventListener('click', (e) => {
            if (window.innerWidth < 1200) {
                e.preventDefault();
                drop.parentNode.classList.toggle('active');
            }
        });
    });

    // Close navigation when a link is clicked
    document.querySelectorAll('.navmenu a:not(.dropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('mobile-nav-active')) {
                toggleNav();
            }
        });
    });

    /* =========================================
       2. Header Scroll Effect
    ========================================= */
    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // Initialize on load

    /* =========================================
       3. Accordion Interaction
    ========================================= */
    document.querySelectorAll(".accordion-item").forEach(item => {
        const accHeader = item.querySelector(".accordion-header");
        if (accHeader) {
            accHeader.addEventListener("click", () => {
                item.classList.toggle("active");
            });
        }
    });

    /* =========================================
       4. GLightbox Initialization
    ========================================= */
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }

    /* =========================================
       5. Album / Portfolio Filter
    ========================================= */
    const filterButtons = document.querySelectorAll(".album-filters .nav-link");
    const albumItems = document.querySelectorAll(".album-item");

    if (filterButtons.length > 0 && albumItems.length > 0) {
        // Initial state for transitions
        albumItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });

        filterButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                albumItems.forEach(item => {
                    const col = item.closest(".col-lg-4, .col-md-6");
                    if (!col) return;

                    const shouldShow = filter === "*" || item.classList.contains(filter.substring(1));

                    if (shouldShow) {
                        col.style.display = "";
                        // Force reflow for smooth animation
                        item.offsetHeight;
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            col.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
    }

    /* =========================================
       6. Scroll Top Button
    ========================================= */
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

/* =========================================
   7. Scroll Prestasi Function (Global Scope)
========================================= */
window.scrollPrestasi = function (direction) {
    const container = document.getElementById('prestasiScroll');
    if (container) {
        const card = container.querySelector('.prestasi-card');
        const cardWidth = card ? card.offsetWidth + 16 : 300; // Includes grid gap
        container.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
};
