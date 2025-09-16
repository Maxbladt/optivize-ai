# Deployment Guide

This guide covers deployment options for the Optivize AI website (frontend only).

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended)

1. **Build the project:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Set base directory: `client`
   - Deploy!

3. **Environment Variables:**
   - Set `CI=false` to treat warnings as non-fatal

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd client
   vercel --prod
   ```

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/optivize-ai",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🔧 Production Optimizations

### Frontend

1. **Optimize images:**
   - Use WebP format
   - Implement lazy loading
   - Add proper alt tags

2. **Performance:**
   - Enable gzip compression
   - Add service worker for caching
   - Optimize bundle size

3. **SEO:**
   - Add meta tags
   - Implement structured data
   - Add sitemap.xml

## 🌍 Domain & SSL

1. **Custom Domain:**
   - Update DNS records
   - Configure CNAME or A records

2. **SSL Certificate:**
   - Most platforms provide free SSL
   - Ensure HTTPS redirect is enabled

## 📊 Analytics & Monitoring

1. **Google Analytics:**
   ```javascript
   // Add to index.html
   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Performance Monitoring:**
   - Google PageSpeed Insights
   - Lighthouse CI
   - Web Vitals monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: cd client && npm install
      - name: Build
        run: cd client && npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './client/build'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails on deployment:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for case-sensitive file imports

2. **Performance issues:**
   - Optimize images and assets
   - Enable compression
   - Check for memory leaks

### Support

For deployment support, create an issue in the repository or contact the development team.