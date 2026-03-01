# 🚀 Deployment Guide

Complete guide for deploying Dr. Mogal Shah's portfolio website to various platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All analytics IDs are configured in `/src/app/config/analytics.ts`
- [ ] Content is finalized and reviewed
- [ ] All images are optimized
- [ ] Build succeeds locally: `npm run build`
- [ ] No console errors in production build: `npm run preview`
- [ ] Mobile responsiveness tested
- [ ] All links work correctly
- [ ] SEO meta tags are correct
- [ ] Contact form is tested

---

## 🌟 Recommended: Vercel (Easiest & Best Performance)

Vercel is the recommended platform for this React application.

### Why Vercel?

- ✅ **Zero Configuration** - Auto-detects Vite settings
- ✅ **Automatic Deployments** - Deploys on every push
- ✅ **Free SSL Certificate** - HTTPS enabled by default
- ✅ **Global CDN** - Fast worldwide
- ✅ **Free Custom Domain** - Add your own domain
- ✅ **Preview Deployments** - Test before going live
- ✅ **Analytics Available** - (optional paid upgrade)

### Method 1: Vercel Dashboard (Recommended)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your repository: `dr-mogal-shah-portfolio`
   - Vercel auto-detects: Framework Preset → Vite

3. **Configure Project**
   - **Project Name**: `dr-mogal-shah-portfolio`
   - **Framework**: Vite (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - 🎉 Your site is live!

5. **Your Site URL**
   - Default: `https://dr-mogal-shah-portfolio.vercel.app`
   - You can change this in settings

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow the prompts:
# ? Set up and deploy? [Y/n] y
# ? Which scope? Your account
# ? Link to existing project? [y/N] n
# ? What's your project's name? dr-mogal-shah-portfolio
# ? In which directory is your code located? ./

# Deploy to production
vercel --prod
```

### Add Custom Domain (Optional)

1. **Purchase Domain** (if you don't have one)
   - Recommended registrars: Namecheap, Google Domains, GoDaddy

2. **Add Domain in Vercel**
   - Go to Project → Settings → Domains
   - Enter your domain: `drmogalshah.com.np`
   - Click "Add"

3. **Configure DNS**
   - Add these records to your domain registrar:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

4. **Wait for DNS Propagation**
   - Can take 1-48 hours
   - Check status in Vercel dashboard

5. **SSL Certificate**
   - Vercel automatically provisions SSL
   - Your site will have HTTPS

---

## 🔷 Alternative: Netlify

Another excellent option for static sites.

### Netlify Dashboard Deployment

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub → Select your repository

3. **Build Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Branch**: `main`

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - 🎉 Live at: `https://random-name-123.netlify.app`

5. **Change Site Name**
   - Go to Site settings → General → Site details
   - Click "Change site name"
   - Enter: `dr-mogal-shah-portfolio`
   - New URL: `https://dr-mogal-shah-portfolio.netlify.app`

### Netlify CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build your project
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Add Custom Domain on Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `drmogalshah.com.np`
4. Follow DNS configuration instructions
5. Netlify auto-provisions SSL

---

## 🌐 Alternative: GitHub Pages (Free)

### Setup GitHub Pages

1. **Enable GitHub Pages**
   - Go to Repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Folder: `/(root)`
   - Click "Save"

2. **Install gh-pages Package**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/dr-mogal-shah-portfolio",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Your Site**
   - Live at: `https://YOUR_USERNAME.github.io/dr-mogal-shah-portfolio`

**Note**: GitHub Pages is slower than Vercel/Netlify and doesn't support custom domains easily.

---

## ☁️ Alternative: Cloudflare Pages

### Cloudflare Pages Deployment

1. **Create Cloudflare Account**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Connect GitHub**
   - Click "Create a project"
   - Connect to GitHub
   - Select your repository

3. **Build Settings**
   - **Production Branch**: `main`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/`

4. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-3 minutes
   - Live at: `https://dr-mogal-shah-portfolio.pages.dev`

**Benefits**: Fast global CDN, unlimited bandwidth, free SSL

---

## 🔧 Build Configuration

### Environment Variables

If you need environment variables (for API keys, etc.):

**Vercel:**
1. Go to Project → Settings → Environment Variables
2. Add variables:
   ```
   VITE_GA_ID=G-XXXXXXXXXX
   VITE_CLARITY_ID=abc123xyz
   ```

**Netlify:**
1. Go to Site settings → Environment variables
2. Add the same variables

**GitHub Pages:**
- Use GitHub Secrets in repository settings

### Update Code to Use Environment Variables

```typescript
// src/app/config/analytics.ts
export const analyticsConfig = {
  googleAnalyticsId: import.meta.env.VITE_GA_ID || "G-XXXXXXXXXX",
  microsoftClarityId: import.meta.env.VITE_CLARITY_ID || "YOUR_CLARITY_ID",
  enabled: true,
};
```

---

## 📊 Post-Deployment

### Verify Deployment

1. **Visit Your Live Site**
   - Check all pages load
   - Test navigation
   - Test mobile responsiveness
   - Test contact form

2. **Check Analytics**
   - Visit your site
   - Check Google Analytics → Realtime
   - Check Microsoft Clarity dashboard
   - Verify tracking is working

3. **Test SEO**
   - Google: `site:yourdomain.com`
   - Check meta tags: View Page Source
   - Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

4. **Performance Testing**
   - [PageSpeed Insights](https://pagespeed.web.dev)
   - [GTmetrix](https://gtmetrix.com)
   - Target: 90+ score

### Submit to Search Engines

**Google:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://yourdomain.com`
3. Verify ownership (HTML file method or DNS method)
4. Submit sitemap (if you have one)

**Bing:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

---

## 🔄 Continuous Deployment

### Automatic Deployments (Vercel/Netlify)

Once set up, deployments happen automatically:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. Vercel/Netlify automatically deploys
4. Check deployment status in dashboard
5. Live in 2-3 minutes!

### Preview Deployments

**Vercel:**
- Every PR gets a preview URL
- Test changes before merging

**Netlify:**
- Deploy previews for every PR
- Share preview links with team

---

## 🆘 Troubleshooting

### Build Fails

**Check:**
- Node.js version (should be 18+)
- All dependencies installed
- No TypeScript errors
- Build works locally: `npm run build`

**Common Fixes:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Site Not Loading

**Check:**
- Build completed successfully
- Correct output directory (`dist`)
- No 404 errors in browser console
- Check deployment logs

### Analytics Not Working

**Check:**
- Analytics IDs are correct
- Wait 24-48 hours for Google Analytics
- Disable ad blockers when testing
- Check browser console for errors

### Custom Domain Issues

**Check:**
- DNS records are correct
- Wait 24-48 hours for DNS propagation
- Check DNS with: [DNS Checker](https://dnschecker.org)
- Verify SSL certificate is active

---

## 📈 Performance Optimization

### After Deployment

1. **Optimize Images**
   - Use WebP format
   - Compress images
   - Lazy load images

2. **Enable Caching**
   - Vercel/Netlify do this automatically
   - Configure cache headers if needed

3. **Minify Assets**
   - Vite does this automatically in production
   - Check bundle size: `npm run build -- --analyze`

4. **Monitor Performance**
   - Use PageSpeed Insights regularly
   - Check Core Web Vitals
   - Monitor analytics for slow pages

---

## 🎯 Recommended Setup

**Best Configuration:**
- **Platform**: Vercel
- **Domain**: Custom domain (drmogalshah.com.np)
- **SSL**: Enabled (automatic)
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **Monitoring**: Vercel Analytics (optional)
- **CDN**: Global (automatic with Vercel)

**Cost**: $0/month (all free tier)

---

## 📞 Support

**Platform Support:**
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [answers.netlify.com](https://answers.netlify.com)
- Cloudflare: [community.cloudflare.com](https://community.cloudflare.com)

**General Help:**
- Check deployment logs
- Search Stack Overflow
- Review platform documentation

---

**🎉 Congratulations on Deploying Your Portfolio!**

Your site is now live and accessible worldwide! 🌍
