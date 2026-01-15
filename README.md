# Jack Q Portfolio

An interactive, single-page portfolio for Jack Q that highlights projects, social insights, and personal moments in one cohesive experience.

## Features

- **Fluid Single Page**: Smooth scrolling between About, Projects, Insights, and Life sections.
- **Interactive Animations**: Scroll-triggered reveals, hover motion, and a lightbox photo gallery.
- **GitHub Integration**: Automatically surfaces featured repositories and recent work.
- **Social Insights Hub**: Direct link to LinkedIn for sharing long-form articles and workflow reflections.
- **Life Gallery**: Auto-looping photo spotlight with a built-in lightbox for personal milestones.
- **Fully Responsive**: Adapts gracefully to mobile, tablet, and desktop breakpoints.

## Getting Started

### 1. Configure Your GitHub Username

Edit `js/config.js` and update with your GitHub username:

```javascript
const CONFIG = {
    githubUsername: 'your-github-username', // Replace with your username
    maxProjectsOnHome: 6,
    featuredRepositories: [
        'your-username/your-featured-repo'
    ]
};
```

### 2. Add Your Portrait & Gallery Images

Place your preferred headshot at `images/about-photo.jpg` (replace the placeholder) and update the gallery tiles in `index.html` to point to your life photos.

### 3. Open in Browser

Simply open `index.html` in your web browser. No build process required!

For development, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Then visit http://localhost:8000
```

## Project Structure

```
├── index.html          # Main single-page site
├── css/
│   └── style.css       # Main styles
├── js/
│   ├── config.js       # Configuration
│   ├── github.js       # GitHub API integration
│   └── main.js         # Single-page functionality
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

### Insights Cards

Update the LinkedIn URL (and copy) in the `#insights` section of `index.html`. The current profile link is `https://www.linkedin.com/in/jack-qu-6b269b250/`.

### Life Gallery

Replace the sample images in the `.life-gallery` section with your own photos. The lightbox will automatically adapt to any number of entries.
Photos rotate in groups of three—add images in bundles of three for a seamless loop.

## Deployment

You can deploy this site to:

- **GitHub Pages**: Push to a repository and enable GitHub Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Any static host**: Upload all files

## License

Free to use and modify for personal or commercial projects.
