document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactBtn = document.getElementById('contact-btn');
    const navContactBtn = document.getElementById('nav-contact-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeColorMeta = document.getElementById('theme-color-meta');
    const techFilters = document.querySelectorAll('#tech-filters .pill');
    const techCards = document.querySelectorAll('.tech-card');
    const emailServiceId = 'service_wgcrf08';
    const emailTemplateId = 'template_rj1kfjz';

    const setTheme = (theme) => {
        const nextTheme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem('portfolio-theme', nextTheme);

        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', nextTheme === 'dark' ? '#0f172a' : '#FD6E0A');
        }

        if (themeToggle) {
            const icon = nextTheme === 'dark' ? 'fa-sun' : 'fa-moon';
            const label = nextTheme === 'dark' ? 'Light mode' : 'Dark mode';
            themeToggle.innerHTML = `<i class="fa-solid ${icon}"></i><span>${label}</span>`;
            themeToggle.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} mode`);
        }
    };

    setTheme(document.documentElement.dataset.theme || 'light');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

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
                message: messageInput?.value || '',
                reply_to: emailInput?.value || ''
            };

            try {
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Sending...</span>';
                }

                const response = await emailjs.send(
                    emailServiceId,
                    emailTemplateId,
                    templateParams,
                    'bZo0lIqYnSyWcQnvh'  // Public key as 4th parameter
                );
                console.log('EmailJS Response:', response);
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