# Optivize AI Website

A modern, responsive website for Optivize AI featuring beautiful animations and interactive components.

## 🚀 Features

- **Modern Design**: Clean, professional UI with AI-focused theme
- **Responsive Layout**: Mobile-first design with breakpoints at 480px, 768px, 1024px, 1440px
- **Smooth Animations**: Framer Motion powered animations throughout
- **Interactive Components**: 
  - Sticky navigation with smooth scrolling
  - Expandable service cards with infographics
  - Animated client logo slider
  - Team member cards with hover effects
- **Performance Optimized**: Lighthouse score optimized for > 90

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icons
- **Intersection Observer** - Scroll-triggered animations

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The website will run on `http://localhost:3000`

## 🚀 Quick Start

### Option 1: Automated Setup & Start
```bash
# Clone and navigate to project
git clone <repository-url>
cd optivize-ai

# Run setup script (installs all dependencies)
./setup.sh

# Start the website
./start-website.sh
```

### Option 2: Manual Setup
1. Clone the repository
2. Run setup: `./setup.sh`
3. Start frontend: `cd client && npm start`
4. Visit `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Primary**: #0F172A (Deep Navy Blue)
- **Secondary**: #3B82F6 (Electric Blue) 
- **Accent**: #10B981 (Emerald Green)
- **Background**: #FFFFFF (White) with #F8FAFC (Light Gray) sections
- **Text**: #1E293B (Dark) and #64748B (Muted)
- **Gradients**: Linear gradients from #3B82F6 to #10B981

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Responsive Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: 1024px - 1440px
- **Extra Large**: > 1440px

## 📱 Sections

### 1. Hero Section
- Animated gradient background with particles
- Typewriter-style headline animation
- CTA button for contact
- Mouse-responsive parallax effects

### 2. Client Slider
- Real company logos (Aanhuis, Blosh, Fonteyn, Freebird, Marie Stella Maris, Sony)
- Infinite horizontal scroll animation
- Hover tooltips with company info
- Responsive design for all screen sizes

### 3. Presentation Section
- 30+ companies transformation stats
- Interactive statistics cards
- Presentation image showcase
- Dark theme with gradient animations

### 4. Services Section
- 9 expandable service cards
- Interactive infographics for each service
- Detailed process flows and requirements
- Smooth expand/collapse animations

### 5. Cases Section
- 3 detailed case studies (Fonteyn, Aanhuis, Blosh)
- Expandable cards with real project images
- Detailed results and metrics
- Before/after transformations

### 6. Team Section
- 3 team member cards with real photos
- Professional profile images (Willem, Maximilian, Filip)
- Skill badges and social links
- Hover animations with gradient borders

### 7. Footer/Contact
- Company information and contact details
- Quick navigation links
- Legal links and copyright

## 🎭 Animations

All animations are powered by Framer Motion and include:

- **Page Load**: Logo animation with progress bar
- **Scroll Animations**: Fade-in and slide-up on scroll
- **Hover Effects**: Scale, glow, and transform animations
- **Loading States**: Spinner animations for forms
- **Success Animations**: Confetti and checkmark celebrations

## 📊 Performance

The website is optimized for:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 90

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the production version:
```bash
cd client && npm run build
```

2. Deploy the `build` folder to your hosting service

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email hello@optivize-ai.com or create an issue in the repository.

---

Built with ❤️ by the Optivize AI team