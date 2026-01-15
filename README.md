# Jack Q Portfolio

An interactive, modern single-page portfolio website showcasing projects, professional insights, and personal moments. Built with vanilla JavaScript and modern web technologies, featuring dynamic GitHub integration and smooth animations.

## 🌟 Live Demo

Visit the live site at [QuXiangjie.github.io](https://QuXiangjie.github.io)

## ✨ Features

### Core Functionality

- **🎨 Animated 3D Tech Cube**: Eye-catching hero section with a rotating 3D wireframe cube built using CSS 3D transforms
- **📄 Fluid Single-Page Experience**: Smooth scrolling navigation between About, Projects, Insights, and Life sections with active link highlighting
- **🔄 Dynamic GitHub Integration**: Real-time fetching and display of repositories via GitHub API with star/fork counts and language badges
- **📱 Fully Responsive Design**: Seamless adaptation across mobile, tablet, and desktop with custom breakpoints at 600px, 768px, and 1200px+
- **✨ Scroll-Triggered Animations**: Elegant fade-in and slide-up effects using IntersectionObserver API
- **🖼️ Interactive Photo Gallery**: Auto-rotating carousel with lightbox modal, pause-on-hover, and keyboard navigation
- **🌐 Social Integration**: Direct LinkedIn integration for professional networking
- **♿ Accessibility First**: ARIA labels, keyboard navigation, semantic HTML, and focus management

### Technical Highlights

- **Zero Dependencies**: Pure vanilla JavaScript with no external frameworks
- **Modern CSS**: Custom properties, Grid, Flexbox, 3D transforms, and advanced animations
- **Performance Optimized**: Lazy loading images, hardware-accelerated animations, and efficient DOM manipulation
- **Security Conscious**: HTML escaping to prevent XSS attacks
- **SEO Ready**: Semantic HTML5 structure with proper meta tags

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/QuXiangjie/QuXiangjie.github.io.git
cd QuXiangjie.github.io
```

### 2. Configure Your GitHub Username

Edit `js/config.js` to customize the GitHub integration:

```javascript
const CONFIG = {
    githubUsername: 'your-github-username',     // Your GitHub username
    maxProjectsOnHome: 6,                       // Number of projects to display
    maxRecentPosts: 3,                          // Reserved for future features
    featuredRepositories: [                     // Pin specific repositories
        'your-username/your-featured-repo'
    ]
};
```

### 3. Customize Your Content

**About Section**: Edit the bio text in `index.html` within the `.about-section`

**Portrait Photo**: Replace `images/about-photo.JPG` with your headshot

**Life Gallery**: Update the photo paths and captions in the `#life` section of `index.html`

**Social Links**: Update the LinkedIn URL in the `#insights` section

### 4. Run Locally

No build process required! Simply open `index.html` in your browser, or use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000

# Then visit http://localhost:8000
```

## 📁 Project Structure

```
QuXiangjie.github.io/
├── index.html              # Main single-page HTML document
├── README.md               # Project documentation
├── css/
│   └── style.css          # Complete styling (16.5 KB) with CSS variables and animations
├── js/
│   ├── config.js          # Configuration file for GitHub and site settings
│   ├── github.js          # GitHub API service class and rendering logic
│   ├── main.js            # Core single-page functionality and event handlers
│   └── home.js            # Home page initialization
└── images/
    ├── about-photo.JPG    # Portrait image for About section
    ├── photo1.JPG         # Gallery photo 1
    ├── photo2.JPG         # Gallery photo 2
    ├── photo3.JPG         # Gallery photo 3
    ├── photo4.JPG         # Gallery photo 4
    ├── photo5.JPG         # Gallery photo 5
    ├── photo6.JPG         # Gallery photo 6
    └── README.txt         # Image directory documentation
```

## 🎨 Customization Guide

### Color Scheme

The site uses CSS custom properties for easy theming. Edit `css/style.css`:

```css
:root {
    --primary-color: #fb153c;    /* Red/pink brand color */
    --accent-color: #ffe202;     /* Yellow accent */
    --text-color: #141414;       /* Dark text */
    --text-light: #5a5a5a;       /* Light gray text */
    --bg-color: white;           /* White background */
}
```

### Typography

The site uses Google Fonts with fluid typography:

- **Inter**: Main sans-serif font for body text
- **IBM Plex Mono**: Monospace font for headings and accent text

Font sizes use `clamp()` for responsive scaling:
```css
font-size: clamp(1rem, 0.95rem + 0.3vw, 1.08rem);
```

### Sections

#### About Section
Edit the content in `index.html` at line ~50-70 to update your bio and introduction.

#### Projects Section
Projects are automatically fetched from GitHub. To feature specific repositories, add them to `featuredRepositories` in `js/config.js`.

#### Insights/Social Hub
Update social links and content in the `#insights` section (line ~100-120 in `index.html`).

#### Life Gallery
Replace images in the `.life-gallery` section. The carousel automatically adapts to any number of photos. For seamless rotation, add images in groups of 3.

## 🛠️ Technologies Used

### Frontend Stack

- **HTML5**: Semantic markup, accessibility features, SEO optimization
- **CSS3**:
  - Custom properties (CSS variables)
  - CSS Grid & Flexbox layouts
  - 3D transforms for the rotating cube
  - Keyframe animations (cube-spin, fadeInUp, gradientShift)
  - Media queries for responsive design
  - Backdrop filters for blur effects
- **JavaScript (ES6+)**:
  - Classes and modules
  - Async/await for API calls
  - IntersectionObserver API for scroll animations
  - DOM manipulation and event handling
  - Arrow functions and destructuring

### APIs & Services

- **GitHub REST API**: Dynamic repository fetching
- **LinkedIn**: Social profile integration

## 🎯 Key Features Deep Dive

### 1. 3D Rotating Cube Animation

The hero section features a mesmerizing 3D cube built entirely with CSS:
- Uses CSS 3D transforms and perspective
- Continuous rotation animation with `@keyframes`
- Glowing effect with CSS filters
- Represents focus on emerging technology

### 2. GitHub Integration

The `GitHubService` class (`js/github.js`) provides:
- Automatic repository fetching with pagination
- Featured repository highlighting
- Star count and fork count display
- Programming language badges
- HTML escaping for security
- Error handling for API failures

### 3. Life Gallery Carousel

Advanced photo gallery features:
- Auto-rotation every 6 seconds (shows 3 photos at a time)
- Pause on hover or focus
- Lightbox modal for enlarged viewing
- Keyboard navigation (Enter/Space to open, Esc to close)
- Accessibility with proper tabindex and aria-hidden management

### 4. Scroll Animations

Smooth reveal animations using IntersectionObserver:
- Elements with `data-animate` attribute fade in when scrolled into view
- 20% visibility threshold for triggering
- Hardware-accelerated CSS transforms
- Performance-optimized with no layout thrashing

### 5. Smooth Navigation

Intelligent navigation system:
- Smooth scrolling to section anchors
- Active nav link highlighting based on scroll position
- Debounced scroll handler for performance
- Keyboard-accessible navigation

## ⚡ Performance Optimizations

- **Lazy Loading**: All images use `loading="lazy"` attribute
- **IntersectionObserver**: Efficient scroll-based animations
- **CSS Transforms**: Hardware-accelerated animations (translateY, rotateX)
- **No Build Process**: Direct file serving with zero compilation
- **Minimal Dependencies**: Pure vanilla JavaScript reduces bundle size
- **Debounced Handlers**: Scroll events are optimized to prevent excessive calculations

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of `<article>`, `<section>`, `<figure>`, `<nav>` elements
- **ARIA Labels**: Icons and interactive elements have descriptive labels
- **Keyboard Navigation**: Full Tab, Enter, Space, and Escape key support
- **Focus Management**: Proper focus trapping in modals
- **Screen Reader Support**: `aria-live`, `aria-hidden`, `aria-labelledby` attributes
- **Alt Text**: All images have descriptive alternative text
- **Contrast Ratios**: Color combinations meet WCAG AA standards

## 🌐 Deployment

### GitHub Pages (Recommended)

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select the branch (usually `main`) and root folder
4. Your site will be live at `https://yourusername.github.io`

### Other Hosting Options

- **Netlify**: Drag and drop deployment or connect GitHub repo
- **Vercel**: Import GitHub repository with automatic deployments
- **Cloudflare Pages**: Connect repository for edge-optimized hosting
- **Any Static Host**: Upload files via FTP or file manager

## 🔧 Development

### Local Development

Since this is a static site, any local server will work:

```bash
# Python 3
python -m http.server 8000

# Node.js with http-server
npx http-server -p 8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### Making Changes

1. Edit HTML content directly in `index.html`
2. Modify styles in `css/style.css`
3. Update JavaScript logic in `js/main.js` and `js/github.js`
4. Configure settings in `js/config.js`
5. Test locally before pushing to production

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Modern browsers with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript
- IntersectionObserver API
- CSS 3D Transforms

## 📝 Code Quality

### JavaScript Architecture

- **Modular Design**: Separate files for configuration, API service, and UI logic
- **Class-Based**: GitHubService uses ES6 classes for clean organization
- **Async/Await**: Modern promise handling for API calls
- **Error Handling**: Try-catch blocks and graceful degradation
- **Security**: HTML escaping prevents XSS attacks

### CSS Architecture

- **CSS Variables**: Centralized theming with custom properties
- **BEM-like Naming**: Descriptive class names for maintainability
- **Mobile-First**: Base styles with progressive enhancement
- **DRY Principles**: Reusable utilities and consistent spacing

## 🐛 Troubleshooting

### GitHub Projects Not Loading

- Check that `githubUsername` in `js/config.js` is correct
- Open browser console (F12) to check for API errors
- GitHub API has rate limits (60 requests/hour for unauthenticated)
- Verify repository visibility (private repos won't show)

### Images Not Displaying

- Ensure image paths in `index.html` match actual file names
- Check file extensions (JPG vs jpg vs JPEG)
- Verify images are in the `images/` directory
- Test with browser dev tools Network tab

### Animations Not Working

- Confirm browser supports IntersectionObserver API
- Check that elements have `data-animate` attribute
- Verify JavaScript console for errors
- Test in a different browser

## 📄 License

Free to use and modify for personal or commercial projects. No attribution required, but always appreciated!

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📧 Contact

- **GitHub**: [@QuXiangjie](https://github.com/QuXiangjie)
- **LinkedIn**: [Jack Qu](https://www.linkedin.com/in/jack-qu-6b269b250/)

## 🙏 Acknowledgments

- **Google Fonts** for Inter and IBM Plex Mono typefaces
- **GitHub API** for seamless repository integration
- **Modern web standards** for making framework-free development delightful

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, just pure web development.
