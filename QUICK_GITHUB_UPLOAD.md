# 🚀 Quick Upload to GitHub - 5 Minutes

## Step-by-Step Commands

Open terminal in your project folder and run these commands:

### 1️⃣ Initialize Git
```bash
git init
```

### 2️⃣ Add All Files
```bash
git add .
```

### 3️⃣ Make First Commit
```bash
git commit -m "Initial commit: Dr. Mogal Shah portfolio website"
```

### 4️⃣ Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `dr-mogal-shah-portfolio`
3. Make it **Public**
4. DON'T check any boxes
5. Click "Create repository"

### 5️⃣ Connect to GitHub
Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio.git
```

### 6️⃣ Push to GitHub
```bash
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub username and **Personal Access Token** (not password).

---

## 🔑 Get Personal Access Token

GitHub password authentication is deprecated. Use a token instead:

1. Go to: [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Name: "Portfolio Upload"
4. Expiration: 90 days (or your preference)
5. Check: ✅ `repo` (full control)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

---

## ✅ Done!

Your code is now on GitHub at:
```
https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio
```

---

## 🚀 Deploy to Vercel (Bonus - 2 Minutes)

### Option 1: Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select `dr-mogal-shah-portfolio`
5. Click "Deploy"
6. Wait 2 minutes
7. 🎉 Live at: `https://your-project.vercel.app`

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📝 Update Code Later

Whenever you make changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```

Vercel auto-deploys! 🚀

---

## 🆘 Troubleshooting

**"Git not found"**
→ Install Git: [git-scm.com/downloads](https://git-scm.com/downloads)

**"Permission denied"**
→ Use Personal Access Token, not password

**"Updates rejected"**
→ Run: `git pull origin main` then `git push`

---

## 📚 Full Documentation

- Detailed guide: `/GITHUB_UPLOAD_GUIDE.md`
- Analytics setup: `/ANALYTICS_SETUP.md`
- Project README: `/README.md`

---

**Need help?** See `/GITHUB_UPLOAD_GUIDE.md` for detailed instructions!
