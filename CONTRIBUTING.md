# 🤝 Contributing to Dr. Mogal Shah Portfolio

Thank you for your interest in contributing to this project!

## 🔒 Project Status

This is a **private portfolio website** for Dr. Mogal Prasad Shah. Contributions are limited to authorized developers only.

## 📋 Development Guidelines

### Before You Start

1. Ensure you have Node.js 18+ installed
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Test changes locally before committing

### Code Standards

#### TypeScript
- Use TypeScript for all new files
- Add proper type definitions
- Avoid using `any` type

#### React
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

#### Styling
- Use Tailwind CSS v4 classes
- Follow the existing color scheme:
  - Primary: `#0A2540` (Deep Navy)
  - Accent: `#D4AF37` (Luxurious Gold)
- Maintain responsive design
- Test on mobile, tablet, and desktop

#### File Structure
- Components: `/src/app/components/`
- Pages: `/src/app/pages/`
- Hooks: `/src/app/hooks/`
- Config: `/src/app/config/`
- Styles: `/src/styles/`

### Git Workflow

#### Branch Naming
- Feature: `feature/feature-name`
- Fix: `fix/bug-description`
- Update: `update/what-changed`

#### Commit Messages
Follow this format:
```
<type>: <description>

[optional body]
[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat: Add contact form validation
fix: Resolve mobile menu navigation issue
docs: Update README with deployment instructions
style: Format code with Prettier
refactor: Simplify analytics tracking logic
```

#### Pull Request Process

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub
5. Wait for review and approval
6. Address any review comments
7. Merge when approved

### Testing Checklist

Before submitting changes, ensure:

- [ ] Code builds without errors (`npm run build`)
- [ ] No console errors or warnings
- [ ] All pages load correctly
- [ ] Mobile responsive (test on phone)
- [ ] Forms validate properly
- [ ] Links work correctly
- [ ] Images load properly
- [ ] Analytics tracking works
- [ ] SEO meta tags are correct
- [ ] Accessibility: Can navigate with keyboard
- [ ] Performance: Pages load quickly

### Content Updates

When updating content:

1. **Text Content**: Edit page files in `/src/app/pages/`
2. **Images**: Use `ImageWithFallback` component
3. **SEO**: Update meta tags in each page's `<SEO />` component
4. **Analytics**: Test events in Google Analytics dashboard

### Important Files

**Don't Modify:**
- `/src/app/components/figma/ImageWithFallback.tsx` (protected)
- `/pnpm-lock.yaml` (auto-generated)

**Sensitive Data:**
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Keep analytics IDs in `/src/app/config/analytics.ts`

### Performance Guidelines

- Optimize images before adding
- Use lazy loading for images
- Minimize bundle size
- Avoid unnecessary re-renders
- Use React.memo() for expensive components

### Accessibility Guidelines

- Add alt text to all images
- Use semantic HTML elements
- Ensure keyboard navigation works
- Maintain good color contrast
- Add ARIA labels where needed
- Test with screen readers

### SEO Guidelines

- Update page titles and descriptions
- Use proper heading hierarchy (h1 → h2 → h3)
- Add structured data where appropriate
- Ensure URLs are descriptive
- Maintain fast load times

## 🐛 Reporting Issues

If you find a bug:

1. Check if it's already reported in GitHub Issues
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser/device info

## 💡 Suggesting Features

To suggest a new feature:

1. Create a GitHub Issue
2. Use the "Feature Request" template
3. Describe the feature clearly
4. Explain the use case
5. Wait for feedback before implementing

## 📞 Contact

For questions or clarifications:

- **Email**: info@drmogalshah.com.np
- **GitHub Issues**: Use for technical discussions
- **Pull Requests**: For code contributions

## 📜 Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help maintain code quality
- Document your changes
- Test thoroughly before submitting

## 🙏 Thank You

Your contributions help make this portfolio website better!

---

**Remember**: This is a professional portfolio. Maintain high standards in:
- Code quality
- Design consistency
- Content accuracy
- Performance
- Accessibility
- SEO optimization
