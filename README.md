# Dr. Mogal Prasad Shah - Professional Portfolio Website

A modern, SEO-optimized portfolio website showcasing Dr. Mogal Prasad Shah's 29+ years of expertise in livestock development, food security, and rural agricultural innovation across Nepal.

> **September 2026 release:** full audit implementation — SEO critical fixes (noindex removed, correct meta, www canonicals), working contact form with feedback states, 95% image weight reduction, route code-splitting, WhatsApp button infrastructure, and a central config at `src/app/config/site.ts`. **See [CHANGES.md](./CHANGES.md)** for the complete changelog and the two config values to set after deploying.

![Website Preview](https://www.drmogalshah.com.np/og-image.jpg)

## 🌟 Features

### Design & User Experience
- ✨ **Modern UI/UX** - Sophisticated design with Deep Navy (#0A2540) and Luxurious Gold (#D4AF37) color palette
- 🎨 **Premium Typography** - Playfair Display (headings) + Plus Jakarta Sans (body text)
- 🎭 **Smooth Animations** - Motion React (formerly Framer Motion) for engaging interactions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and semantic HTML

### SEO & Performance
- 🔍 **Advanced SEO** - Comprehensive meta tags, Open Graph, Twitter Cards
- 📊 **Structured Data** - JSON-LD schemas (Person, ProfessionalService, FAQ)
- 🤖 **AI Search Optimized** - Enhanced for Google AI Overview, Bing Copilot, and Perplexity
- ⚡ **Fast Performance** - Optimized images, lazy loading, and code splitting
- 🔗 **Canonical URLs** - Proper URL management for search engines

### Analytics & Tracking
- 📈 **Google Analytics 4** - Comprehensive visitor tracking and insights
- 🔥 **Microsoft Clarity** - Session recordings, heatmaps, and UX analytics
- 🎯 **Custom Event Tracking** - Track button clicks, form submissions, downloads
- 💰 **100% Free** - No cost analytics solution (no Vercel Analytics dependency)

### Content Management
- 📄 **Multi-Page Structure**
  - Home - Hero section with achievements and expertise overview
  - About - Detailed professional background and qualifications
  - Services - Comprehensive service offerings
  - Publications - Research papers and technical articles
  - Contact - Professional contact form with validation
- 🎓 **Professional Presentation** - Focus on livestock development, food security, and rural development
- 📝 **Well-Structured Content** - Clear hierarchy and easy navigation

## 🚀 Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing with data mode
- **Tailwind CSS v4** - Utility-first CSS framework
- **Motion React** - Advanced animations and transitions

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Helmet** - SEO meta tag management

### Analytics
- **Google Analytics 4** - Free visitor analytics
- **Microsoft Clarity** - Free session recordings and heatmaps

### Build Tools
- **Vite** - Lightning-fast build tool
- **PostCSS** - CSS processing
- **ESLint** - Code quality

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio.git
cd dr-mogal-shah-portfolio
```

### Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Configure Analytics

1. Open `/src/app/config/analytics.ts`
2. Add your tracking IDs:

```typescript
export const analyticsConfig = {
  googleAnalyticsId: "G-XXXXXXXXXX",    // Your Google Analytics 4 ID
  microsoftClarityId: "YOUR_CLARITY_ID", // Your Microsoft Clarity ID
  enabled: true,
};
```

**Get Your Analytics IDs:**
- **Google Analytics 4**: Visit [analytics.google.com](https://analytics.google.com)
- **Microsoft Clarity**: Visit [clarity.microsoft.com](https://clarity.microsoft.com)

📖 See `/ANALYTICS_SETUP.md` for detailed setup instructions.

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the website.

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `/dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy your site.

**Or deploy via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the settings
4. Click "Deploy"

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `/dist` folder to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Or deploy via Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `/dist` folder
3. Done!

### Other Platforms

The `/dist` folder contains static files that can be deployed to:
- **GitHub Pages** - Free hosting for GitHub repositories
- **Cloudflare Pages** - Fast global CDN
- **AWS S3 + CloudFront** - Scalable cloud hosting
- **Any static hosting service**

## 📁 Project Structure

```
dr-mogal-shah-portfolio/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # Base UI components (Button, Card, etc.)
│   │   │   ├── SEO.tsx        # SEO meta tags component
│   │   │   ├── StructuredData.tsx  # JSON-LD structured data
│   │   │   ├── GoogleAnalytics.tsx # GA4 integration
│   │   │   ├── MicrosoftClarity.tsx # Clarity integration
│   │   │   └── CookieConsent.tsx   # Optional cookie banner
│   │   ├── pages/             # Page components
│   │   │   ├── Home.tsx       # Homepage
│   │   │   ├── About.tsx      # About page
│   │   │   ├── Services.tsx   # Services page
│   │   │   ├── Publications.tsx # Publications page
│   │   │   └── Contact.tsx    # Contact page
│   │   ├── config/            # Configuration files
│   │   │   └── analytics.ts   # Analytics configuration
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useAnalytics.ts # Analytics tracking hook
│   │   ├── App.tsx            # Main App component
│   │   └── routes.ts          # React Router configuration
│   ├── styles/
│   │   ├── theme.css          # Theme tokens and variables
│   │   ├── fonts.css          # Font imports
│   │   └── global.css         # Global styles
│   └── main.tsx               # Application entry point
├── public/                    # Static assets
├── ANALYTICS_SETUP.md         # Detailed analytics guide
├── ANALYTICS_QUICKSTART.md    # Quick analytics setup
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## 🎨 Customization

### Colors

Edit `/src/styles/theme.css` to change the color scheme:

```css
:root {
  --color-primary: #0A2540;      /* Deep Navy */
  --color-accent: #D4AF37;       /* Luxurious Gold */
  /* Add more custom colors */
}
```

### Typography

The website uses:
- **Playfair Display** - Display font for headings
- **Plus Jakarta Sans** - Body font for content

To change fonts, edit `/src/styles/fonts.css`

### Content

Edit the page components in `/src/app/pages/` to update content:
- Home page: `/src/app/pages/Home.tsx`
- About page: `/src/app/pages/About.tsx`
- Services: `/src/app/pages/Services.tsx`
- Publications: `/src/app/pages/Publications.tsx`
- Contact: `/src/app/pages/Contact.tsx`

### Images

Replace images using the `ImageWithFallback` component:

```tsx
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

<ImageWithFallback
  src="https://your-image-url.com/image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
/>
```

## 📊 Analytics Dashboard

### Google Analytics 4
- **URL**: [analytics.google.com](https://analytics.google.com)
- **View**: Real-time visitors, traffic sources, page views, user demographics

### Microsoft Clarity
- **URL**: [clarity.microsoft.com](https://clarity.microsoft.com)
- **View**: Session recordings, heatmaps, rage clicks, user behavior

## 🔒 Privacy & GDPR

The website includes:
- Optional cookie consent banner (`/src/app/components/CookieConsent.tsx`)
- IP anonymization support in analytics
- Privacy-friendly tracking options

To enable cookie consent, add to `/src/app/App.tsx`:

```tsx
import { CookieConsent } from './components/CookieConsent';

// In your App component:
<CookieConsent />
```

## 🐛 Troubleshooting

### Analytics Not Working?
1. Verify tracking IDs in `/src/app/config/analytics.ts`
2. Check browser console for errors
3. Disable ad blockers when testing
4. Wait 24-48 hours for Google Analytics data

### Build Errors?
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear cache: `rm -rf .vite && npm run dev`
3. Check Node.js version: `node --version` (should be 18+)

### Styling Issues?
1. Tailwind CSS v4 is used - check class names
2. Theme tokens are in `/src/styles/theme.css`
3. Clear browser cache

## 📝 License

This project is proprietary and confidential. All rights reserved by Dr. Mogal Prasad Shah.

Unauthorized copying, modification, distribution, or use of this software is strictly prohibited without explicit written permission.

## 👤 About Dr. Mogal Prasad Shah

Dr. Mogal Prasad Shah is a distinguished livestock development expert with M.Sc. in Animal Nutrition and 29+ years of experience in:

- 🐄 **Livestock Development** - Leading transformative initiatives across Nepal
- 🌾 **Food Security** - Expert in nutrition security and sustainable agriculture
- 🌍 **Rural Development** - Empowering communities through livestock innovation
- ☁️ **Climate Resilience** - Pioneering climate-smart livestock strategies
- 🏛️ **Strategic Leadership** - Former Director at DLFD, driving national policy

### Professional Highlights
- Former Director, Directorate of Livestock and Fisheries Development (DLFD)
- Senior leadership in World Bank funded development projects
- Strategic advisor for Bagamati Province livestock programs
- Published researcher in livestock nutrition and food security
- Expert in project design, management, and impact evaluation

## 📞 Contact

**Dr. Mogal Prasad Shah**
- 📧 Email: info@drmogalshah.com.np
- 💼 LinkedIn: [linkedin.com/in/dr-mogal-prasad-shah](https://www.linkedin.com/in/dr-mogal-prasad-shah/)
- 🌐 Website: [drmogalshah.com.np](https://drmogalshah.com.np)
- 📍 Location: Bagamati Province, Nepal

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack Summary

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript |
| Routing | React Router (Data Mode) |
| Styling | Tailwind CSS v4 |
| Animations | Motion React |
| Build Tool | Vite |
| Analytics | Google Analytics 4 + Microsoft Clarity |
| SEO | React Helmet + Structured Data |
| UI Components | Radix UI + Custom Components |
| Icons | Lucide React |

## 🙏 Acknowledgments

- Design inspiration from modern portfolio best practices
- Color palette: Professional Deep Navy & Luxurious Gold
- Typography: Google Fonts (Playfair Display, Plus Jakarta Sans)
- Images: Unsplash (properly licensed stock photography)
- Analytics: Google Analytics 4 & Microsoft Clarity (free tier)

---

**Built with ❤️ for showcasing professional excellence in livestock development and agricultural innovation**

**Last Updated:** March 2026
