# Quick Start Guide

Get up and running with the Master Documentation template in 5 minutes!

## Step 1: Install (2 minutes)

```bash
npm install
```

## Step 2: Start (1 minute)

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## Step 3: Add Your First Project (2 minutes)

1. **Copy the template:**
   ```bash
   cp docs/projects/project-template.md docs/projects/my-project.md
   ```

2. **Edit `docs/projects/my-project.md`:**
   - Fill in project name, description, goals
   - Add milestones
   - Update progress bars

3. **Add to sidebar** (`sidebars.js`):
   ```javascript
   items: [
     'projects/project-template',
     'projects/sample-project',
     'projects/my-project',  // Add this
   ],
   ```

4. **Add to dashboard** (`docs/index.md`):
   - Add your project to the Projects Overview table

5. **Refresh your browser** - Your project should appear!

## That's It! 🎉

You now have a working documentation site. For more details, see:

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Documentation standards
- **[TEMPLATE_README.md](TEMPLATE_README.md)** - Complete feature guide

## Need Help?

- Check the [Rules & Guidelines](rules-and-guidelines)
- Review the [Project Template](projects/project-template)
- Look at the [Sample Project](projects/sample-project) for examples

---

**Happy documenting!** 📚

