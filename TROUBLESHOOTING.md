# Troubleshooting Guide

Common issues and solutions when setting up or running the Master Documentation project.

## Automatic Fix

**First, try the automatic fix:**
```bash
npm run verify
# or
npm run fix-install
```

This script will:
- ✅ Detect your platform (Windows/Mac/Linux)
- ✅ Check installation integrity
- ✅ Automatically clean and reinstall if needed
- ✅ Handle Windows-specific issues

The script also runs automatically before `npm start` and `npm run build`.

## Installation Issues

### Error: Cannot find package '@docusaurus/logger'

**Symptoms:**
```
Error: Cannot find package '...@docusaurus\logger\lib\index.js'
```

**Automatic Solution:**
```bash
npm run fix-install
```

**Manual Solution (if automatic fix doesn't work):**
1. Delete `node_modules` folder and `package-lock.json`:
   ```bash
   # Windows (PowerShell)
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   
   # Mac/Linux
   rm -rf node_modules
   rm -f package-lock.json
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

4. **Important for Windows users:** Avoid spaces in folder paths. If your path is `E:\master docs\master-docs`, rename the folder to `E:\master-docs` (without spaces).

### npm install fails or hangs

**Solutions:**
- Check your internet connection
- Try using a different network (some corporate networks block npm)
- Use `npm install --legacy-peer-deps` if you see peer dependency warnings
- Try `npm install --verbose` to see detailed error messages
- Ensure Node.js version is 18.0 or higher: `node --version`

### Permission errors on Windows

**Solution:**
- Run terminal/PowerShell as Administrator
- Or install Node.js for the current user only (not system-wide)

## Runtime Issues

### Projects not showing in sidebar

**Solution:**
1. Run discovery manually:
   ```bash
   npm run discover
   ```

2. Check if project files exist:
   ```bash
   # Windows
   dir docs\projects\*.md
   
   # Mac/Linux
   ls docs/projects/*.md
   ```

3. Clear Docusaurus cache:
   ```bash
   npm run clear
   npm start
   ```

### Sidebar shows invalid document IDs

**Solution:**
1. The auto-discovery script should handle this automatically
2. If you see errors about missing document IDs, run:
   ```bash
   npm run discover
   npm start
   ```

### Port 3000 already in use

**Solution:**
1. Find and close the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:3000 | xargs kill
   ```

2. Or use a different port:
   ```bash
   npm start -- --port 3001
   ```

## Development Server Issues

### Server won't start

**Checklist:**
1. ✅ Dependencies installed: `npm install` completed successfully
2. ✅ Node.js version: `node --version` shows 18.0 or higher
3. ✅ No port conflicts: Port 3000 is available
4. ✅ Correct directory: You're in the project root folder
5. ✅ No syntax errors: Check `sidebars.js` and `docusaurus.config.js`

### Build fails

**Solution:**
1. Clear cache and rebuild:
   ```bash
   npm run clear
   npm run build
   ```

2. Check for errors in the console output
3. Verify all markdown files are valid (no syntax errors)

## Git Issues

### Personal projects showing in git status

**Solution:**
This is expected! Personal projects are in `.gitignore` and won't be committed. They're only visible locally.

### Can't push changes

**Solution:**
1. Make sure you're on the correct branch
2. Pull latest changes first:
   ```bash
   git pull origin main
   ```
3. Resolve any conflicts
4. Push again

## Multi-Folder Discovery Issues

### No projects discovered

**Check:**
1. Configuration file exists: `project-discovery.config.json`
2. Source folders are correct and accessible
3. Projects have indicators (package.json, .git, etc.)
4. Check console output for warnings

### Wrong project information

**Solution:**
1. Manually edit the generated documentation files in `docs/projects/`
2. Re-run discovery to update:
   ```bash
   npm run discover:folders
   ```

## Getting Help

If you're still experiencing issues:

1. Check the error message carefully
2. Verify your Node.js and npm versions
3. Try the solutions above
4. Check the [Docusaurus documentation](https://docusaurus.io/docs)
5. Open an issue on GitHub with:
   - Your Node.js version
   - Your operating system
   - The full error message
   - Steps to reproduce

---

**Quick Fix Checklist:**
- [ ] Deleted `node_modules` and `package-lock.json`
- [ ] Ran `npm cache clean --force`
- [ ] Ran `npm install` successfully
- [ ] Verified Node.js version (18.0+)
- [ ] Checked folder path (no spaces on Windows)
- [ ] Cleared Docusaurus cache: `npm run clear`
- [ ] Tried running `npm start` again

