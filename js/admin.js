// Admin panel functionality
const ADMIN_PASSWORD = 'admin123'; // Change this to your preferred password
const SESSION_KEY = 'blog_admin_session';

let editingPostId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLogin();
    }

    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Login form
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);

    // New post button
    document.getElementById('new-post-btn')?.addEventListener('click', () => {
        openEditor();
    });

    // Post form
    document.getElementById('post-form')?.addEventListener('submit', handleSavePost);

    // Cancel button
    document.getElementById('cancel-btn')?.addEventListener('click', closeEditor);

    // Modal close button
    document.querySelector('.modal-close')?.addEventListener('click', closeEditor);

    // Close modal on background click
    document.getElementById('editor-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'editor-modal') {
            closeEditor();
        }
    });
}

function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
}

function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadPosts();
}

function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        showDashboard();
    } else {
        alert('Incorrect password');
    }
}

function handleLogout(e) {
    e.preventDefault();
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
}

function loadPosts() {
    const posts = blogStorage.getAllPosts();
    const container = document.getElementById('posts-list');

    if (posts.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">No posts yet. Create your first post!</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post-item">
            <div class="post-item-info">
                <div class="post-item-title">${post.title}</div>
                <div class="post-item-meta">
                    <span>${post.category.toUpperCase()}</span>
                    <span>${post.date}</span>
                </div>
            </div>
            <div class="post-item-actions">
                <button class="btn-small" onclick="editPost('${post.id}')">Edit</button>
                <button class="btn-small btn-delete" onclick="deletePost('${post.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function openEditor(postId = null) {
    editingPostId = postId;
    const modal = document.getElementById('editor-modal');
    const form = document.getElementById('post-form');

    // Reset form
    form.reset();

    if (postId) {
        // Edit mode
        const post = blogStorage.getPostById(postId);
        if (post) {
            document.getElementById('editor-title').textContent = 'Edit Post';
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-excerpt').value = post.excerpt;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-date').value = post.date;
            document.getElementById('post-content').value = post.content.trim();
        }
    } else {
        // Create mode
        document.getElementById('editor-title').textContent = 'Create New Post';
        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('post-date').value = today;
    }

    modal.classList.add('active');
}

function closeEditor() {
    const modal = document.getElementById('editor-modal');
    modal.classList.remove('active');
    editingPostId = null;
}

function handleSavePost(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const excerpt = document.getElementById('post-excerpt').value.trim();
    const category = document.getElementById('post-category').value;
    const date = document.getElementById('post-date').value;
    const content = document.getElementById('post-content').value.trim();

    const post = {
        id: editingPostId || blogStorage.generateId(title),
        title,
        excerpt,
        category,
        date,
        content
    };

    try {
        blogStorage.savePost(post);
        closeEditor();
        loadPosts();
        alert(editingPostId ? 'Post updated successfully!' : 'Post created successfully!');
    } catch (error) {
        alert('Error saving post: ' + error.message);
    }
}

function editPost(postId) {
    openEditor(postId);
}

function deletePost(postId) {
    const post = blogStorage.getPostById(postId);
    if (!post) return;

    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
        blogStorage.deletePost(postId);
        loadPosts();
    }
}
