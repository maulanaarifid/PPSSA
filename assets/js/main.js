document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector(".navmenu");
    const btn = document.querySelector(".mobile-nav-toggle");

    btn.addEventListener("click", () => {
        nav.classList.toggle("active");
        btn.classList.toggle("bi-list");
        btn.classList.toggle("bi-x");
        document.body.classList.toggle("no-scroll");
    });

    // Dropdown Mobile
    document.querySelectorAll(".dropdown").forEach(drop => {
        drop.addEventListener("click", () => {
            drop.querySelector(".dropdown-menu").classList.toggle("show");
        });
    });

    // Efek scroll navbar
    window.addEventListener("scroll", () => {
        document.querySelector(".header")
            .classList.toggle("scrolled", window.scrollY > 50);
    });
});
