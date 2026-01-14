// Blog page initialization
document.addEventListener('DOMContentLoaded', () => {
    const blogService = new BlogService(BLOG_POSTS);
    let currentCategory = 'all';

    // Render all posts initially
    function renderPosts(category = 'all') {
        const posts = blogService.getPostsByCategory(category);
        renderBlogPosts(posts, 'blog-posts');
    }

    // Initial render
    renderPosts();

    // Category filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter posts
            currentCategory = button.dataset.category;
            renderPosts(currentCategory);
        });
    });
});
