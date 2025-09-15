# Deployment Guide

This guide covers deployment options for the Optivize AI website.

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
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
   cd frontend
   vercel --prod
   ```

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
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

## 🖥 Backend Deployment

### Option 1: Heroku

1. **Create Procfile:**
   ```
   web: python app.py
   ```

2. **Update app.py for production:**
   ```python
   if __name__ == '__main__':
       port = int(os.environ.get('PORT', 5000))
       app.run(debug=False, host='0.0.0.0', port=port)
   ```

3. **Deploy:**
   ```bash
   heroku create optivize-ai-api
   git subtree push --prefix backend heroku main
   ```

### Option 2: DigitalOcean App Platform

1. **Create app.yaml:**
   ```yaml
   name: optivize-ai-api
   services:
   - name: api
     source_dir: /backend
     github:
       repo: your-username/optivize-ai
       branch: main
     run_command: python app.py
     environment_slug: python
     instance_count: 1
     instance_size_slug: basic-xxs
   ```

2. **Deploy through DigitalOcean dashboard**

### Option 3: Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   cd backend
   railway login
   railway init
   railway up
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

### Backend

1. **Security:**
   - Add rate limiting
   - Implement HTTPS
   - Add CORS configuration
   - Use environment variables for secrets

2. **Database:**
   - Connect to production database
   - Add database migrations
   - Implement data validation

3. **Monitoring:**
   - Add logging
   - Implement health checks
   - Add error tracking (e.g., Sentry)

## 🌍 Domain & SSL

1. **Custom Domain:**
   - Update DNS records
   - Configure CNAME or A records
   - Update CORS settings

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
        run: cd frontend && npm install
      - name: Build
        run: cd frontend && npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './frontend/build'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "optivize-ai-api"
          heroku_email: "your-email@example.com"
          appdir: "backend"
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails on deployment:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for case-sensitive file imports

2. **API not accessible:**
   - Verify CORS configuration
   - Check environment variables
   - Ensure proper port configuration

3. **Performance issues:**
   - Optimize images and assets
   - Enable compression
   - Check for memory leaks

### Support

For deployment support, create an issue in the repository or contact the development team.
