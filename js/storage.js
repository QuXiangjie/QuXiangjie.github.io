// Blog storage management using localStorage
class BlogStorage {
    constructor() {
        this.STORAGE_KEY = 'blog_posts';
        this.initializeStorage();
    }

    initializeStorage() {
        // If no posts in localStorage, initialize with default posts
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(BLOG_POSTS));
        }
    }

    getAllPosts() {
        const posts = localStorage.getItem(this.STORAGE_KEY);
        return posts ? JSON.parse(posts) : [];
    }

    getPostById(id) {
        const posts = this.getAllPosts();
        return posts.find(post => post.id === id);
    }

    savePost(post) {
        const posts = this.getAllPosts();
        const existingIndex = posts.findIndex(p => p.id === post.id);

        if (existingIndex >= 0) {
            // Update existing post
            posts[existingIndex] = post;
        } else {
            // Add new post
            posts.unshift(post);
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
        return true;
    }

    deletePost(id) {
        const posts = this.getAllPosts();
        const filteredPosts = posts.filter(post => post.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPosts));
        return true;
    }

    generateId(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
}

// Create global instance
const blogStorage = new BlogStorage();
