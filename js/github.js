// Lightweight GitHub API helper used by main.js
class GitHubService {
    constructor(username) {
        this.username = username;
        this.apiBase = 'https://api.github.com';
    }

    async fetchProjects(limit = 6, featuredRepositories = []) {
        try {
            const response = await fetch(
                `${this.apiBase}/users/${this.username}/repos?sort=updated&per_page=${Math.max(limit, 12)}`
            );

            if (!response.ok) {
                throw new Error(`GitHub responded with ${response.status}`);
            }

            const repos = await response.json();
            const repoMap = new Map();

            repos.forEach(repo => {
                repoMap.set(repo.full_name, this.#mapRepo(repo));
            });

            const featured = await this.#resolveFeatured(featuredRepositories, repoMap);
            const standard = Array.from(repoMap.values())
                .filter(repo => !featuredRepositories.includes(repo.fullName))
                .sort((a, b) => b.updatedAt - a.updatedAt);

            const combined = [...featured, ...standard];
            return limit ? combined.slice(0, limit) : combined;
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            return [];
        }
    }

    getProfileUrl() {
        return `https://github.com/${this.username}`;
    }

    async #resolveFeatured(featuredRepositories, repoMap) {
        const results = [];

        for (const fullName of featuredRepositories || []) {
            if (repoMap.has(fullName)) {
                results.push(repoMap.get(fullName));
                continue;
            }

            try {
                const response = await fetch(`${this.apiBase}/repos/${fullName}`);
                if (!response.ok) {
                    continue;
                }

                const repo = await response.json();
                const mapped = this.#mapRepo(repo);
                repoMap.set(fullName, mapped);
                results.push(mapped);
            } catch (error) {
                console.warn('Unable to load featured repository:', fullName, error);
            }
        }

        return results;
    }

    #mapRepo(repo) {
        return {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || 'No description provided yet.',
            url: repo.html_url,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            language: repo.language,
            updatedAt: new Date(repo.updated_at)
        };
    }
}

function renderProjects(projects, containerId, maxProjects = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    const projectsToShow = maxProjects ? projects.slice(0, maxProjects) : projects;

    if (!projectsToShow.length) {
        container.innerHTML = '<p class="project-card loading">No projects found right now.</p>';
        return;
    }

    container.innerHTML = projectsToShow
        .map(project => `
            <article class="project-card" data-animate>
                <h3>${escapeHtml(project.name)}</h3>
                <p class="description">${escapeHtml(project.description)}</p>
                <div class="meta">
                    <span aria-label="Repository stars">⭐ ${project.stars}</span>
                    <span aria-label="Repository forks">🔱 ${project.forks}</span>
                </div>
                ${project.language ? `<span class="language">${escapeHtml(project.language)}</span>` : ''}
                <a class="link" href="${project.url}" target="_blank" rel="noopener">
                    View on GitHub →
                </a>
            </article>
        `)
        .join('');
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
