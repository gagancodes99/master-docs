# Quick Start Workflow

This guide explains how to use the auto-discovery system to document your projects.

## 🚀 Workflow Overview

1. **Clone the repository**
2. **Install dependencies**
3. **Ask AI to document your projects** (Cursor/Claude)
4. **Projects automatically appear** - no manual configuration needed!

## Step-by-Step Guide

### 1. Clone and Setup

```bash
git clone https://github.com/gagancodes99/master-docs.git
cd master-docs
npm install
```

### 2. Ask AI to Document Your Projects

Open Cursor or Claude Code and ask:

```
Explore my Desktop/Work folder (or wherever your projects are) 
and document all projects according to the template rules in this repository.
Create documentation files in docs/projects/ using the project-template.md format.
```

The AI will:
- ✅ Discover all your projects
- ✅ Create documentation files for each project
- ✅ Add progress bars and milestones
- ✅ Follow the template rules

### 3. Auto-Discovery Runs Automatically

When you run `npm start` or `npm run build`, the auto-discovery script will:
- ✅ Scan `docs/projects/` directory
- ✅ Automatically add all projects to the sidebar
- ✅ Update the dashboard with all projects
- ✅ Extract project info (name, status, progress, dates)

**No manual configuration needed!**

### 4. View Your Projects

```bash
npm start
```

Open `http://localhost:3000` and you'll see:
- All your projects in the sidebar
- All projects on the dashboard
- Progress bars and milestones

## Sync Button

There's a **"Sync Projects"** button on the dashboard that allows you to:
- Manually trigger project discovery
- Refresh the sidebar and dashboard
- Works even if you've added new projects

**Note**: For the sync button to work with API calls, start the dev server with:
```bash
npm run sync-api  # In one terminal (runs the sync API server)
npm start         # In another terminal (runs Docusaurus)
```

Or simply click the button - it will refresh the page and auto-discovery runs on page load anyway!

## Manual Discovery (Optional)

If you want to manually trigger discovery from the command line:

```bash
npm run discover
```

This will update the sidebar and dashboard without starting the server.

## How It Works

1. **Auto-Discovery Script** (`scripts/auto-discover-projects.js`):
   - Scans `docs/projects/*.md` files
   - Excludes `project-template.md` (always)
   - Updates `sidebars.js` automatically
   - Updates `docs/index.md` dashboard table

2. **Pre-Start Hook**:
   - Runs automatically before `npm start`
   - Runs automatically before `npm run build`
   - Ensures sidebar/dashboard are always up-to-date

3. **Git Protection**:
   - `.gitignore` excludes all project files except template/sample
   - Your projects stay local-only
   - Never committed to the repository

## Adding New Projects

### Method 1: Use AI (Recommended)

Just ask AI:
```
Create documentation for my new project "My New Project" 
in docs/projects/my-new-project.md using the template.
```

Then run `npm start` - it will automatically appear!

### Method 2: Manual Copy

```bash
cp docs/projects/project-template.md docs/projects/my-new-project.md
# Edit the file
npm run discover  # Update sidebar/dashboard
npm start
```

## Project File Naming

- Use **kebab-case**: `my-awesome-project.md`
- No spaces or underscores
- Lowercase only
- Descriptive names

## What Gets Auto-Discovered

The script automatically:
- ✅ Finds all `.md` files in `docs/projects/`
- ✅ Extracts project name from the title (`# Project Name`)
- ✅ Extracts status, progress, and last updated date
- ✅ Adds to sidebar alphabetically
- ✅ Adds to dashboard table

## Troubleshooting

### Projects not showing in sidebar?

1. Check files exist: `ls docs/projects/*.md`
2. Run discovery manually: `npm run discover`
3. Restart dev server: `npm start`
4. Clear cache: `npm run clear && npm start`

### Sidebar/Dashboard not updating?

1. Make sure files are in `docs/projects/` directory
2. Files must end with `.md`
3. Files must have valid frontmatter/title
4. Run `npm run discover` manually

### Want to exclude a project?

Remove it from `docs/projects/` or rename it (don't use `.md` extension)

## Best Practices

1. **Use AI for initial setup** - It's faster and follows the template
2. **Update regularly** - Progress bars and dates stay current
3. **Follow naming conventions** - Makes discovery easier
4. **Keep projects local** - They're automatically excluded from git

## Example AI Prompt

```
I have projects in my Desktop/Work folder. Please:
1. Explore the folder structure
2. For each project you find, create a documentation file in docs/projects/
3. Use the project-template.md as the format
4. Extract project info from README files, package.json, or other docs
5. Add realistic milestones and progress tracking
6. Follow all the rules in CONTRIBUTING.md

After you're done, I'll run npm start to see them all!
```

---

**That's it!** The system is fully automated. Just create project files and they'll appear automatically! 🎉

