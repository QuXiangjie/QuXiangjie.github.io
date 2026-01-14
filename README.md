# Workflow Entrepreneur Blog & Portfolio

A modern, clean blog and portfolio website for sharing thoughts on Technology, Finance, and Life, with integrated GitHub project showcase.

## Features

- **Home Page**: Showcases your GitHub projects and recent blog posts
- **Blog System**: Full-featured blog with category filtering (Tech, Finance, Life)
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **GitHub Integration**: Automatically fetches and displays your latest projects
- **Clean UI**: Professional, modern design with smooth animations

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

## Adding New Blog Posts

Blog posts are stored in `js/blog.js` in the `BLOG_POSTS` array. To add a new post:

1. Open `js/blog.js`
2. Add a new object to the `BLOG_POSTS` array:

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

## Project Structure

```
├── index.html          # Home page
├── blog.html           # Blog listing page
├── post.html           # Individual post page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── config.js       # Configuration
│   ├── github.js       # GitHub API integration
│   ├── blog.js         # Blog posts data
│   ├── home.js         # Home page logic
│   ├── blog-page.js    # Blog page logic
│   └── post.js         # Post page logic
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
