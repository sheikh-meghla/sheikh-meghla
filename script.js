document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');

    // Update spotlight position on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // Optional: Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-text');
    const indicators = document.querySelectorAll('.nav-indicator');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link, index) => {
            // Logic to highlight nav items based on 'current' section
            // Reset styles
            link.classList.remove('text-slate-200');
            link.classList.add('text-slate-500');
            indicators[index].classList.remove('w-16', 'bg-teal-300');
            indicators[index].classList.add('w-8', 'bg-slate-600');

            if (link.parentElement.getAttribute('href').includes(current)) {
                link.classList.add('text-slate-200');
                link.classList.remove('text-slate-500');
                indicators[index].classList.add('w-16', 'bg-teal-300');
                indicators[index].classList.remove('w-8', 'bg-slate-600');
            }
        });
    });
});
