# Workflow Entrepreneur Blog & Portfolio

A minimal, tech-focused single-page blog and portfolio website with an integrated blog management system. Perfect for sharing thoughts on Technology, Finance, and Life.

## Features

- **Single-Page Design**: All sections (Home, Projects, Blog) on one page with smooth scrolling
- **Blog Management System**: Full-featured admin panel for creating, editing, and deleting blog posts
- **GitHub Integration**: Automatically fetches and displays your latest projects
- **Category Filtering**: Filter blog posts by Tech, Finance, or Life
- **LocalStorage Backend**: No server required - all data stored in browser
- **Password Protected Admin**: Simple authentication system
- **Minimal Design**: Clean, tech-focused aesthetic with monospace fonts
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

## Getting Started

### 1. Configure Your GitHub Username

Edit `js/config.js` and update with your GitHub username:

```javascript
const CONFIG = {
    githubUsername: 'your-github-username', // Replace with your username
    maxProjectsOnHome: 6,
    maxRecentPosts: 3
};
```

### 2. Open in Browser

Simply open `index.html` in your web browser. No build process required!

For development, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Then visit http://localhost:8000
```

## Managing Blog Posts

### Using the Admin Panel

1. Navigate to `/admin.html` or click the "Admin" link in the navigation
2. Login with the default password: `admin123`
3. Click "New Post" to create a blog post
4. Fill in:
   - Title
   - Excerpt (short description)
   - Category (Tech, Finance, or Life)
   - Date
   - Content (HTML format)
5. Click "Save Post"

### Changing the Admin Password

Edit `js/admin.js` and change the `ADMIN_PASSWORD` constant:

```javascript
const ADMIN_PASSWORD = 'your-secure-password';
```

### Data Storage

Blog posts are stored in the browser's localStorage. This means:
- ✅ No server required
- ✅ Fast and simple
- ⚠️ Data is stored per browser/device
- ⚠️ Clearing browser data will delete posts
- 💡 Export/backup feature recommended for production use

## Adding New Blog Posts

### Option 1: Using Admin Panel (Recommended)

Use the admin panel at `/admin.html` to create posts with a visual interface.

### Option 2: Manually Edit Code

Edit `js/blog.js` and add posts to the `BLOG_POSTS` array:

```javascript
{
    id: 'your-post-slug',
    title: 'Your Post Title',
    excerpt: 'A brief excerpt...',
    category: 'tech', // or 'finance' or 'life'
    date: '2026-01-15',
    content: `
        <p>Your post content in HTML...</p>
        <h2>Section Title</h2>
        <p>More content...</p>
    `
}
```

Note: Posts added via the admin panel are stored in localStorage and override the default posts.

## Project Structure

```
├── index.html          # Main single-page site
├── admin.html          # Blog admin panel
├── blog.html           # Legacy blog page (optional)
├── post.html           # Individual post page (optional)
├── css/
│   ├── style.css       # Main styles
│   └── admin.css       # Admin panel styles
├── js/
│   ├── config.js       # Configuration
│   ├── github.js       # GitHub API integration
│   ├── blog.js         # Default blog posts
│   ├── storage.js      # LocalStorage management
│   ├── main.js         # Single-page functionality
│   └── admin.js        # Admin panel logic
└── README.md           # This file
```

## Customization

### Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* Add more customizations */
}
```

### About Section

Edit the about text in `index.html` in the `.about-section`.

### Navigation

Add or modify links in the `.nav-links` section of any HTML file.

## Deployment

You can deploy this site to:

- **GitHub Pages**: Push to a repository and enable GitHub Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Any static host**: Upload all files

## Sample Posts Included

The blog comes with 6 sample posts covering:
- Workflow automation in EdTech
- API design for FinTech
- Personal finance automation
- Work-life balance
- EdTech trends
- Financial literacy for developers

Feel free to modify or replace these with your own content!

## License

Free to use and modify for personal or commercial projects.
