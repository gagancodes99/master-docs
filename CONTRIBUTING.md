# Contributing to Master Documentation

Thank you for contributing to our master documentation! This guide will help you document your projects effectively.

## Getting Started

1. **Setup**: Follow the [TEMPLATE_README.md](TEMPLATE_README.md) for initial setup
2. **Read the Rules**: Review the documentation standards below
3. **Use the Template**: Always start from `docs/projects/project-template.md`

## Documentation Standards

### Project Requirements

Every project documentation MUST include:

#### 1. Header Section
```markdown
# Project Name

**Status**: [Planning | In Progress | On Hold | Completed]
**Last Updated**: YYYY-MM-DD

<div class="overall-progress">
  <strong>Overall Progress: X%</strong>
  <div class="progress-bar-container progress-bar-large">
    <div class="progress-bar-fill progress-X" data-progress="X">X%</div>
  </div>
</div>
```

#### 2. Overview Section
- Clear project description (2-3 sentences)
- 3-5 project goals (bullet points)

#### 3. Current Status Section
- **Recent Accomplishments**: What was completed recently
- **Current Focus**: What's being worked on now

#### 4. Milestones & Progress Table
Minimum 3 milestones, each with:
- Milestone name
- Status (Not Started/In Progress/Completed)
- Progress bar (see format below)
- Target date
- Notes/description

#### 5. Resources & Links
- Documentation links
- Tools & technologies list
- Related projects (if applicable)

#### 6. Notes Section
- Important decisions
- Challenges & blockers
- Future considerations

### Progress Bar Rules

#### Overall Progress Bar
```html
<div class="overall-progress">
  <strong>Overall Progress: 85%</strong>
  <div class="progress-bar-container progress-bar-large">
    <div class="progress-bar-fill progress-85" data-progress="85">85%</div>
  </div>
</div>
```

**Important**: 
- Use `progress-X` class where X is rounded to nearest 5 (0, 5, 10, 15, ..., 100)
- Keep `data-progress` attribute matching the percentage
- Display percentage text inside the div

#### Milestone Progress Bar (in table)
```html
<div class="progress-bar-container progress-bar-small">
  <div class="progress-bar-fill progress-60" data-progress="60">60%</div>
</div>
```

**Important**:
- Use `progress-bar-small` class for milestone bars
- Always include the full progress bar HTML in the table cell
- Don't use just text percentages

### Naming Conventions

#### File Names
- ✅ Use kebab-case: `my-awesome-project.md`
- ✅ Use lowercase only
- ✅ Replace spaces with hyphens
- ❌ No spaces: `my awesome project.md`
- ❌ No underscores: `my_awesome_project.md`
- ❌ No uppercase: `MyAwesomeProject.md`

#### Milestone Names
- ✅ Be specific: "User Authentication System"
- ✅ Action-oriented: "Database Migration"
- ✅ Clear scope: "Frontend Dashboard Implementation"
- ❌ Vague: "Stuff", "More Work", "Things"
- ❌ Too generic: "Development", "Testing"

### Status Values

Use these exact status values:

**Project Status:**
- `Planning`
- `In Progress`
- `On Hold`
- `Completed`

**Milestone Status:**
- `Not Started`
- `In Progress`
- `Completed`

### Progress Percentage Guidelines

| Percentage | Meaning | When to Use |
|------------|---------|-------------|
| 0% | Not started | Milestone hasn't begun |
| 1-25% | Early stages | Planning, setup, initial work |
| 26-50% | Core development | Main features being built |
| 51-75% | Advanced features | Additional features, integration |
| 76-99% | Final polish | Testing, bug fixes, documentation |
| 100% | Completed | Fully done and deployed |

### Progress Calculation Rules

1. **Calculate Overall Progress:**
   ```
   Sum of all milestone percentages ÷ Number of milestones = Overall Progress
   Round to nearest 5%
   ```

2. **Example:**
   ```
   Milestones: 100% + 60% + 0% + 30% + 0% = 190%
   190% ÷ 5 milestones = 38%
   Round to nearest 5% = 40%
   ```

3. **Keep It Honest:**
   - Don't inflate percentages
   - Be realistic about completion
   - Update regularly (weekly recommended)

### Update Frequency

- **Weekly**: Update progress percentages and "Last Updated" date
- **When Milestone Completes**: Change status to "Completed", set to 100%
- **When Blockers Arise**: Document in "Challenges & Blockers" section
- **Monthly**: Review all milestones, add new ones if needed

### Adding Your Project

#### Step 1: Create Project File
```bash
cp docs/projects/project-template.md docs/projects/your-project-name.md
```

#### Step 2: Fill in Project Details
- Replace all placeholder text
- Add real milestones
- Update progress bars
- Include actual dates

#### Step 3: Update Sidebar
Edit `sidebars.js`:
```javascript
{
  type: 'category',
  label: 'Projects',
  items: [
    // ... existing projects
    'projects/your-project-name',  // Add this line
  ],
}
```

#### Step 4: Update Dashboard
Edit `docs/index.md` and add to the table:
```markdown
| Your Project Name | In Progress | 45% | 2025-01-15 | [View Project](projects/your-project-name) |
```

### Common Mistakes to Avoid

1. ❌ **Missing Progress Bars**: Always include progress bar HTML, not just text
2. ❌ **Wrong Class Names**: Use `progress-85` not `progress-80` or `progress-90`
3. ❌ **Broken Links**: Use `projects/project-name` not `projects/project-name.md`
4. ❌ **Outdated Dates**: Update "Last Updated" date when making changes
5. ❌ **Vague Descriptions**: Be specific about what's done and what's next
6. ❌ **Missing Milestones**: Include at least 3-5 meaningful milestones
7. ❌ **Inconsistent Formatting**: Follow the template exactly

### Quality Checklist

Before submitting your project documentation:

- [ ] All required sections are filled in
- [ ] Progress bars are properly formatted (not just text)
- [ ] Progress percentages are calculated correctly
- [ ] "Last Updated" date is current
- [ ] Project is added to sidebar (`sidebars.js`)
- [ ] Project is added to dashboard table (`docs/index.md`)
- [ ] All links work (test them)
- [ ] File name follows naming conventions
- [ ] Milestone names are clear and specific
- [ ] Status values match the allowed options

### Example: Good vs Bad

#### ✅ Good Project Header
```markdown
# E-Commerce Platform

**Status**: In Progress  
**Last Updated**: 2025-01-15

<div class="overall-progress">
  <strong>Overall Progress: 65%</strong>
  <div class="progress-bar-container progress-bar-large">
    <div class="progress-bar-fill progress-65" data-progress="65">65%</div>
  </div>
</div>
```

#### ❌ Bad Project Header
```markdown
# My Project

Status: working on it
Progress: about half way

Overall Progress: 50%
```

#### ✅ Good Milestone
```markdown
| User Authentication | In Progress | <div class="progress-bar-container progress-bar-small"><div class="progress-bar-fill progress-75" data-progress="75">75%</div></div> | 2025-02-15 | Login, registration, and password reset implemented |
```

#### ❌ Bad Milestone
```markdown
| Auth | Done | 75% | Soon | Working on it |
```

## Questions?

If you're unsure about anything:
1. Check the template: `docs/projects/project-template.md`
2. Look at existing projects for examples
3. Review this CONTRIBUTING.md guide
4. Ask your team lead or project manager

---

**Remember**: Good documentation helps everyone understand project status and progress. Take the time to do it right!

