# 📤 GitHub Upload Guide - Step by Step

## Complete Guide to Upload Your Portfolio to GitHub

Follow these steps to save your project and upload it to GitHub.

---

## ✅ Prerequisites

Before you start, make sure you have:
- ✅ Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- ✅ A GitHub account ([Sign up at GitHub](https://github.com/signup))
- ✅ Your project files ready

### Check if Git is Installed

Open your terminal/command prompt and run:

```bash
git --version
```

If you see a version number (e.g., `git version 2.x.x`), you're good to go!

---

## 📋 Step 1: Create a New Repository on GitHub

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **Click "New"** button (top right, next to your profile picture)
3. **Fill in repository details**:
   - **Repository name**: `dr-mogal-shah-portfolio` (or your preferred name)
   - **Description**: "Professional portfolio website for Dr. Mogal Prasad Shah - Livestock Development Expert"
   - **Visibility**: 
     - ✅ **Public** - Anyone can see (recommended for portfolio)
     - ❌ **Private** - Only you can see
   - **DO NOT** check "Initialize with README" (we already have one)
   - **DO NOT** add .gitignore (we already have one)
   - **DO NOT** choose a license yet
4. **Click** "Create repository"

🎉 Your empty repository is now created!

---

## 📋 Step 2: Initialize Git in Your Project

### Open Terminal/Command Prompt

**On Windows:**
- Press `Win + R`, type `cmd`, press Enter
- OR use Git Bash (if installed)
- OR use Windows Terminal

**On Mac:**
- Press `Cmd + Space`, type `Terminal`, press Enter

**On Linux:**
- Press `Ctrl + Alt + T`

### Navigate to Your Project Folder

```bash
cd /path/to/your/project
```

**Example:**
```bash
# Windows
cd C:\Users\YourName\Documents\dr-mogal-shah-portfolio

# Mac/Linux
cd ~/Documents/dr-mogal-shah-portfolio
```

💡 **Tip**: You can drag and drop the folder into the terminal to get the path automatically!

### Initialize Git

```bash
git init
```

You should see: `Initialized empty Git repository in ...`

---

## 📋 Step 3: Configure Git (First Time Only)

If this is your first time using Git, set your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Dr. Mogal Shah"
git config --global user.email "info@drmogalshah.com.np"
```

---

## 📋 Step 4: Add Your Files to Git

### Add All Files

```bash
git add .
```

This adds all files in your project to Git (respecting `.gitignore`).

### Check What Will Be Committed

```bash
git status
```

You should see a list of files in green. These are the files that will be uploaded.

---

## 📋 Step 5: Commit Your Changes

Create your first commit with a meaningful message:

```bash
git commit -m "Initial commit: Dr. Mogal Shah portfolio website"
```

You should see a summary of files committed.

---

## 📋 Step 6: Connect to GitHub Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio.git
```

**Example:**
```bash
git remote add origin https://github.com/johnsmith/dr-mogal-shah-portfolio.git
```

### Verify the Connection

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio.git (fetch)
origin  https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio.git (push)
```

---

## 📋 Step 7: Push to GitHub

### Set the Main Branch and Push

```bash
git branch -M main
git push -u origin main
```

### Authentication

GitHub will ask you to authenticate:

**Option 1: Personal Access Token (Recommended)**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it "Portfolio Upload"
4. Check the `repo` scope
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. When prompted for password, paste the token

**Option 2: GitHub CLI**
```bash
gh auth login
```
Follow the prompts.

**Option 3: SSH Key**
See [GitHub SSH Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

## 🎉 Done! Your Code is Now on GitHub

Visit your repository at:
```
https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio
```

You should see all your files!

---

## 🔄 Making Future Changes

Whenever you make changes to your code:

### 1. Check what changed:
```bash
git status
```

### 2. Add changed files:
```bash
git add .
```

### 3. Commit with a message:
```bash
git commit -m "Description of what you changed"
```

**Example commit messages:**
- `"Add contact form validation"`
- `"Fix analytics tracking issue"`
- `"Update about page content"`
- `"Improve mobile responsiveness"`

### 4. Push to GitHub:
```bash
git push
```

---

## 🚀 Quick Deploy to Vercel from GitHub

Now that your code is on GitHub, you can easily deploy:

### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository: `dr-mogal-shah-portfolio`
5. Vercel auto-detects settings
6. Click "Deploy"
7. Wait 2-3 minutes
8. 🎉 Your site is live!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
```

Your site will be live at: `https://your-project.vercel.app`

### Add Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `drmogalshah.com.np`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

---

## 📝 Common Git Commands Cheat Sheet

| Command | Description |
|---------|-------------|
| `git status` | Check what files have changed |
| `git add .` | Stage all changes |
| `git add filename.tsx` | Stage specific file |
| `git commit -m "message"` | Commit staged changes |
| `git push` | Upload to GitHub |
| `git pull` | Download latest from GitHub |
| `git log` | View commit history |
| `git diff` | See what changed |
| `git branch` | List branches |
| `git checkout -b new-branch` | Create new branch |

---

## 🆘 Troubleshooting

### "Git is not recognized as a command"

**Solution**: Install Git from [git-scm.com](https://git-scm.com/downloads)

### "Permission denied (publickey)"

**Solution**: Use Personal Access Token instead of SSH, or set up SSH keys properly.

### "Updates were rejected"

**Solution**: Pull first, then push:
```bash
git pull origin main
git push
```

### "Unable to access remote repository"

**Solution**: Check your internet connection and verify the repository URL:
```bash
git remote -v
```

### Large File Warning

**Solution**: Use `.gitignore` to exclude large files. Already configured in this project!

### Merge Conflicts

**Solution**: 
1. Open conflicted files
2. Look for `<<<<<<<` markers
3. Choose which version to keep
4. Remove the markers
5. Commit the resolution

---

## 🎓 Learn More About Git

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Interactive Git Tutorial](https://learngitbranching.js.org)

---

## 📊 Next Steps After Uploading

### 1. Enable GitHub Pages (Optional Free Hosting)

1. Go to Repository → Settings → Pages
2. Source: Deploy from branch
3. Branch: `main` → `/(root)`
4. Click "Save"
5. Your site will be live at: `https://YOUR_USERNAME.github.io/dr-mogal-shah-portfolio`

**Note**: Vercel is recommended for better performance and custom domains.

### 2. Add Repository Description

1. Go to your repository on GitHub
2. Click the gear icon ⚙️ next to "About"
3. Add description: "Professional portfolio for Dr. Mogal Prasad Shah"
4. Add website: `https://drmogalshah.com.np`
5. Add topics: `portfolio`, `react`, `typescript`, `livestock-development`

### 3. Create a Project Board (Optional)

Track future improvements:
1. Go to "Projects" tab
2. Create a new project
3. Add cards for features/fixes you want to add

### 4. Set Up Branch Protection (Optional)

Prevent accidental changes to main branch:
1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable protections as needed

---

## ✅ Final Checklist

- [ ] Created GitHub repository
- [ ] Initialized Git in project folder
- [ ] Added all files with `git add .`
- [ ] Made first commit
- [ ] Connected to GitHub remote
- [ ] Pushed to GitHub
- [ ] Verified files are on GitHub
- [ ] Configured analytics IDs (see `/ANALYTICS_SETUP.md`)
- [ ] Deployed to Vercel/Netlify
- [ ] Tested live website
- [ ] Added custom domain (optional)
- [ ] Shared website link with Dr. Shah

---

## 🎉 Congratulations!

Your portfolio website is now:
- ✅ Version controlled with Git
- ✅ Backed up on GitHub
- ✅ Ready for deployment
- ✅ Easy to collaborate on
- ✅ Professional and shareable

**Repository URL**: `https://github.com/YOUR_USERNAME/dr-mogal-shah-portfolio`

---

## 📞 Need Help?

- **Git Issues**: [Stack Overflow - Git](https://stackoverflow.com/questions/tagged/git)
- **GitHub Issues**: [GitHub Support](https://support.github.com)
- **Deployment Issues**: [Vercel Support](https://vercel.com/support)

---

**Happy Coding! 🚀**
