// GitHub API integration
class GitHubService {
    constructor(username) {
        this.username = username;
        this.apiBase = 'https://api.github.com';
    }

    async fetchProjects(limit = 10) {
        try {
            const response = await fetch(
                `${this.apiBase}/users/${this.username}/repos?sort=updated&per_page=${limit}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const repos = await response.json();
            return repos.map(repo => ({
                name: repo.name,
                description: repo.description || 'No description available',
                url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                updatedAt: new Date(repo.updated_at)
            }));
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            return [];
        }
    }

    getProfileUrl() {
        return `https://github.com/${this.username}`;
    }
}

// Render projects to the DOM
function renderProjects(projects, containerId, maxProjects = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (projects.length === 0) {
        container.innerHTML = '<p class="text-center">No projects found or unable to load projects.</p>';
        return;
    }

    const projectsToShow = maxProjects ? projects.slice(0, maxProjects) : projects;

    container.innerHTML = projectsToShow.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p class="description">${project.description}</p>
            <div class="meta">
                <span>⭐ ${project.stars}</span>
                <span>🔱 ${project.forks}</span>
            </div>
            ${project.language ? `<span class="language">${project.language}</span>` : ''}
            <a href="${project.url}" target="_blank" class="link">View on GitHub →</a>
        </div>
    `).join('');
}
