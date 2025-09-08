# Glenferdinza Landing Page

A professional, secure, and responsive landing page for Glenferdinza - Web Developer & ML Engineer.

## 🚀 Features

- **Professional Design**: Clean, modern interface with soft black/white theme
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Animations**: Constellation background with animated stars
- **Security Hardened**: CSP headers, XSS protection, and security best practices
- **Performance Optimized**: Fast loading, efficient animations, and lazy loading
- **Accessibility Ready**: WCAG compliant with keyboard navigation support
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **PWA Support**: Service worker for offline functionality

## 🛡️ Security Features

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME-type sniffing
- **Referrer Policy**: Controls referrer information sharing
- **Permissions Policy**: Restricts browser API access
- **Security.txt**: Responsible disclosure guidelines
- **Integrity Checks**: Subresource integrity for external resources

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Animations**: Custom JavaScript animation engine with Canvas API
- **Icons**: Font Awesome 6.4.0 with integrity verification
- **Fonts**: Google Fonts (Inter) with performance optimization
- **Security**: CSP, security headers, and best practices
- **Performance**: Service worker, lazy loading, and optimizations

## 📁 Project Structure

```
landingpage/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   ├── main.js         # Main application controller
│   │   ├── animations.js   # Animation system
│   │   └── constellation.js # Star background system
│   └── images/
│       ├── profile.jpg     # Profile image
│       └── favicon.ico     # Site favicon
├── README.md               # This file
└── package.json            # Project metadata
```

## 🎨 Design Features

- **Constellation Background**: Animated star field with connecting lines
- **Soft Theme**: Professional black and white color palette
- **Smooth Animations**: Hover effects, typing animation, particle system
- **Interactive Elements**: Magnetic buttons, ripple effects, tooltips
- **Responsive Layout**: Fluid design that works on all screen sizes

## 🔧 Installation & Setup

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **Customize** the content in `index.html` to match your information
4. **Replace** `assets/images/profile.jpg` with your profile image
5. **Deploy** to your preferred hosting platform

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Features

- **Lazy Loading**: Images load only when needed
- **Optimized Animations**: Efficient canvas rendering
- **Reduced Motion**: Respects user preferences
- **Caching**: Service worker for offline support
- **Compression**: Minified and optimized assets

## 🎯 Customization

### Updating Profile Information

1. Edit `index.html` to update:
   - Name and title
   - Links (portfolio, articles, WhatsApp)
   - Social media profiles

2. Replace `assets/images/profile.jpg` with your photo

3. Modify `assets/css/styles.css` for:
   - Color scheme adjustments
   - Layout modifications
   - Custom animations

### Configuration Options

The constellation background can be customized in `assets/js/constellation.js`:

```javascript
this.config = {
    starCount: 120,           // Number of stars
    maxDistance: 150,         // Connection distance
    starSizeMin: 1,          // Minimum star size
    starSizeMax: 3,          // Maximum star size
    animationSpeed: 0.5,     // Animation speed
    // ... more options
};
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Your site will be automatically deployed

### Vercel
1. Import project from GitHub
2. Deploy with zero configuration

## 📊 Analytics & Tracking

The landing page includes a built-in analytics system that tracks:
- Page views
- Button clicks
- Social media interactions
- Performance metrics

To integrate with external analytics services, modify the `AnalyticsController` in `assets/js/main.js`.

## 🔒 Privacy & Security

- No external tracking scripts
- No data collection without consent
- HTTPS recommended for production
- CSP headers supported

## 🔒 Security

This project follows security best practices:

- All external resources are loaded with integrity checks
- Content Security Policy (CSP) prevents XSS attacks
- Security headers protect against common vulnerabilities
- No user data collection or tracking
- Secure deployment guidelines included

For security reports, please see [SECURITY.md](SECURITY.md).

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTORS.md](CONTRIBUTORS.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Glenferdinza**
- Portfolio: [https://gsya.my.id](https://gsya.my.id)
- Medium: [@glenferdinzaaghis.2024](https://medium.com/@glenferdinzaaghis.2024)
- LinkedIn: [glenferdinza-efian](https://www.linkedin.com/in/glenferdinza-efian)
- GitHub: [Glenferdinza](https://github.com/Glenferdinza)

---

⭐ If you found this project helpful, please give it a star on GitHub!
