# Deployment Guide

This guide covers deploying the 3D CubeSat Viewer to various platforms.

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git installed
- Account on your chosen deployment platform

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. GitHub Pages

**Setup:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/3dCubeSat"
}
```

3. Deploy:
```bash
npm run deploy:gh-pages
```

**Or manually:**

```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### 2. Netlify

**Option A: Netlify CLI**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Option B: Git Integration**

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Configuration:**
The `netlify.toml` file is already configured.

### 3. Vercel

**Option A: Vercel CLI**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

**Option B: Git Integration**

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects settings
6. Click "Deploy"

**Configuration:**
The `vercel.json` file is already configured.

### 4. AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

3. Upload files:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

4. Configure bucket for static hosting:
```bash
aws s3 website s3://your-bucket-name --index-document index.html
```

5. Set up CloudFront distribution for HTTPS and CDN

### 5. Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

4. Configure:
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub integration: Optional

5. Deploy:
```bash
npm run build
firebase deploy
```

### 6. Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**

```bash
docker build -t cubesat-viewer .
docker run -p 8080:80 cubesat-viewer
```

### 7. Custom Server (Node.js)

Create `server.js`:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Install dependencies:
```bash
npm install express
```

Run:
```bash
npm run build
node server.js
```

## Environment Variables

For production deployments, you may want to set:

```bash
NODE_ENV=production
```

## Performance Optimization

### Enable Gzip Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

**Express:**
```javascript
const compression = require('compression');
app.use(compression());
```

### CDN Configuration

For optimal performance, serve static assets from a CDN:

1. Upload `dist/assets/` to your CDN
2. Update asset paths in your deployment

### Caching Headers

**Nginx:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## SSL/HTTPS

Most platforms (Netlify, Vercel, Firebase) provide free SSL certificates automatically.

For custom servers:
- Use Let's Encrypt with Certbot
- Configure your web server for HTTPS

## Monitoring

### Analytics

Add Google Analytics or similar:

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Consider integrating:
- Sentry
- Rollbar
- LogRocket

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Troubleshooting

### Build Fails

- Check Node.js version: `node --version`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for errors in console

### Assets Not Loading

- Verify base path in `vite.config.js`
- Check CORS headers
- Verify file paths are correct

### Performance Issues

- Enable production mode
- Minimize bundle size
- Use CDN for Three.js
- Enable compression

## Post-Deployment Checklist

- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify all interactive features work
- [ ] Check loading times
- [ ] Test export/import functionality
- [ ] Verify SSL certificate
- [ ] Set up monitoring
- [ ] Configure analytics
- [ ] Test error handling

## Support

For deployment issues, check:
- Platform-specific documentation
- GitHub Issues
- Community forums

## Updates

To update the deployed version:

1. Make changes locally
2. Test thoroughly
3. Build: `npm run build`
4. Deploy using your chosen method
5. Verify deployment

---

**Need help?** Open an issue on GitHub or consult the platform-specific documentation.

