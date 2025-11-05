# Setup Guide for New Users

This guide will help you set up the Master Documentation template for the first time.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18.0 or higher** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

### Verify Installation

```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 8.0.0 or higher
```

## Step 1: Clone or Download

### Option A: If using Git
```bash
git clone <repository-url>
cd MasterDocs
```

### Option B: If downloading ZIP
1. Download and extract the ZIP file
2. Open terminal in the extracted folder
3. Navigate to the MasterDocs directory

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages. It may take a few minutes.

### Troubleshooting Installation Issues

If you encounter errors during installation:

1. **Delete existing node_modules and lock file:**
   ```bash
   # On Windows (PowerShell)
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   
   # On Mac/Linux
   rm -rf node_modules
   rm -f package-lock.json
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Reinstall dependencies:**
   ```bash
   npm install
   ```

4. **Windows-specific issues:**
   - Avoid spaces in folder paths (e.g., use `master-docs` instead of `master docs`)
   - Run terminal as Administrator if you encounter permission errors
   - Ensure Node.js version is 18.0 or higher: `node --version`

5. **If you see "Cannot find package" errors:**
   - Make sure you're in the correct directory
   - Verify `package.json` exists
   - Try `npm install --legacy-peer-deps` if peer dependency warnings occur

## Step 3: Start Development Server

```bash
npm start
```

The server will start and automatically open your browser to `http://localhost:3000`

You should see:
- The dashboard with project overview
- Navigation sidebar
- Sample project documentation

## Step 4: Customize for Your Team

### Update Site Information

Edit `docusaurus.config.js`:

```javascript
const config = {
  title: 'Your Team Documentation',  // Change this
  tagline: 'Your team tagline here',  // Change this
  // ... rest of config
};
```

### Update Dashboard

Edit `docs/index.md`:

1. Update the welcome message
2. Remove sample projects (or keep as examples)
3. Customize the status legend if needed
4. Update "Getting Started" instructions

### Update Colors (Optional)

Edit `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #YOUR_COLOR; /* Your brand color */
}
```

## Step 5: Add Your First Project

1. **Copy the template:**
   ```bash
   cp docs/projects/project-template.md docs/projects/my-first-project.md
   ```

2. **Edit the file:**
   - Open `docs/projects/my-first-project.md`
   - Fill in all sections
   - Update progress bars

3. **Add to sidebar:**
   - Edit `sidebars.js`
   - Add `'projects/my-first-project'` to the Projects items array

4. **Add to dashboard:**
   - Edit `docs/index.md`
   - Add your project to the "Projects Overview" table

5. **Verify:**
   - Restart the dev server (`npm start`)
   - Check that your project appears in the sidebar
   - Check that it's listed on the dashboard
   - Click through to verify the page loads

## Step 6: Remove Sample Content (Optional)

If you want to start fresh:

1. **Remove sample project:**
   ```bash
   rm docs/projects/sample-project.md
   ```

2. **Update sidebar:**
   - Edit `sidebars.js`
   - Remove `'projects/sample-project'` from the items array

3. **Update dashboard:**
   - Edit `docs/index.md`
   - Remove the sample project from the table

## Common Issues

### Port Already in Use

If port 3000 is busy:
```bash
PORT=3001 npm start
```

### Module Not Found Errors

Try:
```bash
rm -rf node_modules
npm install
```

### Build Errors

Check:
1. All markdown files are valid
2. All links use correct format (no `.md` extension)
3. Progress bars are properly formatted

## Next Steps

1. **Read the Rules**: Review [CONTRIBUTING.md](CONTRIBUTING.md)
2. **Follow Guidelines**: Use the template and standards
3. **Document Regularly**: Update progress weekly
4. **Share with Team**: Once ready, share the setup with colleagues

## Deployment (Optional)

### Deploy to GitHub Pages

1. Update `docusaurus.config.js`:
   ```javascript
   url: 'https://yourusername.github.io',
   baseUrl: '/repository-name/',
   ```

2. Deploy:
   ```bash
   GIT_USER=yourusername npm run deploy
   ```

### Deploy to Netlify/Vercel

1. Build the site:
   ```bash
   npm run build
   ```

2. Upload the `build/` folder to your hosting service

## Getting Help

- Check [TEMPLATE_README.md](TEMPLATE_README.md) for features and usage
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for documentation standards
- Look at `docs/projects/project-template.md` for examples
- Consult [Docusaurus docs](https://docusaurus.io/docs) for advanced topics

---

**You're all set!** Start documenting your projects and tracking progress. 🚀

