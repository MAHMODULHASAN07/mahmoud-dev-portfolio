document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactBtn = document.getElementById('contact-btn');
    const navContactBtn = document.getElementById('nav-contact-btn');
    const techFilters = document.querySelectorAll('#tech-filters .pill');
    const techCards = document.querySelectorAll('.tech-card');

    // Smooth scroll to contact section
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (navContactBtn) {
        navContactBtn.addEventListener('click', () => {
            document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Handle Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message, Mahmodul! This is a demo; integration with an email service is required for live use.');
            contactForm.reset();
        });
    }

    // Tech Ecosystem filtering
    if (techFilters.length && techCards.length) {
        techFilters.forEach((btn) => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                techFilters.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                techCards.forEach((card) => {
                    const categories = card.getAttribute('data-category') || '';
                    const matches = filter === 'all' || categories.split(' ').includes(filter);
                    card.style.display = matches ? 'block' : 'none';
                });
            });
        });
    }
});