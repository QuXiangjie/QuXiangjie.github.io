// Main page initialization for single-page layout
document.addEventListener('DOMContentLoaded', () => {
    initializeGitHub();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupInsightCards();
    setupLifeGallery();
});

let scrollObserver;

async function initializeGitHub() {
    const githubService = new GitHubService(CONFIG.githubUsername);
    const profileLink = document.getElementById('github-profile-link');

    if (profileLink) {
        profileLink.href = githubService.getProfileUrl();
    }

    try {
        const repos = await githubService.fetchProjects(
            CONFIG.maxProjectsOnHome,
            CONFIG.featuredRepositories || []
        );

        renderProjects(repos, 'github-projects', CONFIG.maxProjectsOnHome);
        setupScrollAnimations();
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        const container = document.getElementById('github-projects');
        if (container) {
            container.innerHTML = '<p class="error">Failed to load projects.</p>';
        }
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    if (!scrollObserver) {
        scrollObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        });
    }

    animatedElements.forEach(element => {
        if (element.classList.contains('is-visible')) {
            return;
        }
        scrollObserver.observe(element);
    });
}

function setupInsightCards() {
    const insightCards = document.querySelectorAll('.insight-card');
    if (!insightCards.length) return;

    insightCards.forEach(card => {
        const link = card.querySelector('a');
        if (!link) return;

        card.setAttribute('tabindex', '0');
        card.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'a') {
                return;
            }
            link.click();
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                link.click();
            }
        });
    });
}

function setupLifeGallery() {
    const lifeCards = Array.from(document.querySelectorAll('.life-card'));
    if (!lifeCards.length) return;

    const groupSize = 3;
    const totalGroups = Math.max(1, Math.ceil(lifeCards.length / groupSize));
    const shouldRotate = totalGroups > 1;
    let currentGroup = 0;

    const activateGroup = (groupIndex) => {
        lifeCards.forEach((card, idx) => {
            const inGroup = Math.floor(idx / groupSize) === groupIndex;
            card.classList.toggle('is-active', inGroup);
            card.setAttribute('tabindex', inGroup ? '0' : '-1');
            card.setAttribute('aria-hidden', inGroup ? 'false' : 'true');
        });
    };

    activateGroup(currentGroup);

    const advanceGroup = () => {
        currentGroup = (currentGroup + 1) % totalGroups;
        activateGroup(currentGroup);
    };

    let rotateTimer;

    const stopRotation = () => {
        if (rotateTimer) {
            window.clearInterval(rotateTimer);
            rotateTimer = null;
        }
    };

    const startRotation = () => {
        if (!shouldRotate) return;
        stopRotation();
        rotateTimer = window.setInterval(advanceGroup, 6000);
    };

    startRotation();

    lifeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('is-active')) return;
            stopRotation();
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('is-active')) return;
            startRotation();
        });
        card.addEventListener('focusin', () => {
            if (!card.classList.contains('is-active')) return;
            stopRotation();
        });
        card.addEventListener('focusout', () => {
            if (!card.classList.contains('is-active')) return;
            startRotation();
        });
    });

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img alt="Life highlight">
            <button class="lightbox-close" aria-label="Close gallery">×</button>
        </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('img');
    const closeButton = lightbox.querySelector('.lightbox-close');

    const openLightbox = (image) => {
        if (!image) return;
        stopRotation();
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || 'Life highlight';
        lightbox.classList.add('active');
        closeButton.focus({ preventScroll: true });
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightboxImage.removeAttribute('src');
        startRotation();
    };

    lifeCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('is-active')) {
                return;
            }
            const image = card.querySelector('img');
            openLightbox(image);
        });

        card.addEventListener('keydown', (event) => {
            if ((event.key === 'Enter' || event.key === ' ') && card.classList.contains('is-active')) {
                event.preventDefault();
                const image = card.querySelector('img');
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

