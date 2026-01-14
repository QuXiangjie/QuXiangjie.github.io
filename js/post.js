// Blog post page initialization
document.addEventListener('DOMContentLoaded', () => {
    const blogService = new BlogService(BLOG_POSTS);

    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        document.getElementById('post-body').innerHTML = '<p>Post not found.</p>';
        return;
    }

    // Get post data
    const post = blogService.getPostById(postId);

    if (!post) {
        document.getElementById('post-body').innerHTML = '<p>Post not found.</p>';
        return;
    }

    // Update page title
    document.title = `${post.title} | Workflow-first Entrepreneur`;

    // Render post
    document.getElementById('post-category').innerHTML =
        `<span class="category ${post.category}">${post.category.toUpperCase()}</span>`;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = blogService.formatDate(post.date);
    document.getElementById('post-body').innerHTML = post.content;
});
