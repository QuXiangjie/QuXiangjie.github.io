// Main page initialization for single-page layout
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GitHub projects
    initializeGitHub();

    // Initialize blog posts from storage
    initializeBlog();

    // Setup smooth scrolling for navigation
    setupSmoothScrolling();

    // Setup category filtering
    setupCategoryFilter();
});

function initializeGitHub() {
    const githubService = new GitHubService(CONFIG.githubUsername);

    githubService.getRepositories(CONFIG.maxProjectsOnHome)
        .then(repos => {
            renderGitHubProjects(repos);
        })
        .catch(error => {
            console.error('Error loading GitHub projects:', error);
            document.getElementById('github-projects').innerHTML =
                '<p class="error">Failed to load projects</p>';
        });

    // Set GitHub profile link
    document.getElementById('github-profile-link').href =
        `https://github.com/${CONFIG.githubUsername}`;
}

function initializeBlog() {
    // Load all posts from storage
    const posts = blogStorage.getAllPosts();
    renderBlogPosts(posts, 'blog-posts');
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

function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter posts
            const category = button.dataset.category;
            const posts = blogStorage.getAllPosts();
            const filteredPosts = category === 'all'
                ? posts
                : posts.filter(post => post.category === category);

            renderBlogPosts(filteredPosts, 'blog-posts');
        });
    });
}

function renderGitHubProjects(repos) {
    const container = document.getElementById('github-projects');

    if (!repos || repos.length === 0) {
        container.innerHTML = '<p>No public repositories found.</p>';
        return;
    }

    container.innerHTML = repos.map(repo => `
        <div class="project-card">
            <h3>${repo.name}</h3>
            <p class="description">${repo.description || 'No description available'}</p>
            <div class="meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🔀 ${repo.forks_count}</span>
            </div>
            ${repo.language ? `<span class="language">${repo.language}</span>` : ''}
            <a href="${repo.html_url}" target="_blank" class="link">View Repository →</a>
        </div>
    `).join('');
}
