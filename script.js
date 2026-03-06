document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactBtn = document.getElementById('contact-btn');
    const navContactBtn = document.getElementById('nav-contact-btn');
    const techFilters = document.querySelectorAll('#tech-filters .pill');
    const techCards = document.querySelectorAll('.tech-card');
    const emailServiceId = 'service_wgcrf08';
    const emailTemplateId = 'template_rj1kfjz';

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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            const defaultButtonMarkup = submitButton ? submitButton.innerHTML : 'Send Message';

            if (!window.emailjs) {
                alert('Email service is not loaded. Please refresh and try again.');
                return;
            }

            const templateParams = {
                name: nameInput?.value || '',
                email: emailInput?.value || '',
                message: messageInput?.value || ''
            };

            try {
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Sending...</span>';
                }

                await emailjs.send(emailServiceId, emailTemplateId, templateParams);
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS send failed:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = defaultButtonMarkup;
                }
            }
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