// Home page initialization
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize GitHub service
    const githubService = new GitHubService(CONFIG.githubUsername);

    // Set GitHub profile link
    const profileLink = document.getElementById('github-profile-link');
    if (profileLink) {
        profileLink.href = githubService.getProfileUrl();
    }

    // Load and render GitHub projects
    const projects = await githubService.fetchProjects(CONFIG.maxProjectsOnHome);
    renderProjects(projects, 'github-projects', CONFIG.maxProjectsOnHome);

    // Load and render recent blog posts
    const blogService = new BlogService(BLOG_POSTS);
    const recentPosts = blogService.getRecentPosts(CONFIG.maxRecentPosts);
    renderBlogPosts(recentPosts, 'recent-posts');
});
