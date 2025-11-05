# Documentation Rules & Guidelines

This document outlines the standards and rules for documenting projects in this system.

## Table of Contents

1. [Project Requirements](#project-requirements)
2. [Progress Tracking Rules](#progress-tracking-rules)
3. [Naming Conventions](#naming-conventions)
4. [Update Frequency](#update-frequency)
5. [Quality Standards](#quality-standards)

## Project Requirements

### Required Sections

Every project documentation MUST include these sections:

#### 1. Header (Required)
- Project name (H1)
- Status (one of: Planning, In Progress, On Hold, Completed)
- Last Updated date (YYYY-MM-DD format)
- Overall progress bar (see format below)

#### 2. Overview (Required)
- Clear project description (2-3 sentences minimum)
- 3-5 project goals (bullet points)

#### 3. Current Status (Required)
- Recent accomplishments (2-4 bullet points)
- Current focus areas (2-4 bullet points)

#### 4. Milestones & Progress (Required)
- Minimum 3 milestones
- Maximum recommended: 10 milestones
- Each milestone must have all fields filled

#### 5. Resources & Links (Required)
- Documentation links
- Tools & technologies list
- Related projects (if applicable)

#### 6. Notes (Required)
- Important decisions (at least 2-3)
- Challenges & blockers (document even if none currently)
- Future considerations

## Progress Tracking Rules

### Overall Progress Bar Format

```html
<div class="overall-progress">
  <strong>Overall Progress: X%</strong>
  <div class="progress-bar-container progress-bar-large">
    <div class="progress-bar-fill progress-X" data-progress="X">X%</div>
  </div>
</div>
```

**Rules:**
- X must be rounded to nearest 5 (0, 5, 10, 15, 20, ..., 95, 100)
- `data-progress` attribute must match the percentage
- Percentage text must be displayed inside the div

### Milestone Progress Bar Format

```html
<div class="progress-bar-container progress-bar-small">
  <div class="progress-bar-fill progress-X" data-progress="X">X%</div>
</div>
```

**Rules:**
- Use `progress-bar-small` class (not `progress-bar-large`)
- Include the complete HTML in the table cell
- Never use just text percentages (e.g., "60%")

### Progress Calculation

**Formula:**
```
Overall Progress = (Sum of all milestone percentages) ÷ (Number of milestones)
Round result to nearest 5%
```

**Example:**
```
Milestones: 100% + 60% + 0% + 30% + 0% = 190%
190% ÷ 5 = 38%
Round to nearest 5% = 40%
```

**Rules:**
- Calculate honestly
- Update when milestones change
- Round to nearest 5% for consistency

### Progress Percentage Guidelines

| Range | Meaning | When to Use |
|-------|---------|-------------|
| 0% | Not started | Milestone hasn't begun |
| 1-25% | Early stages | Planning, setup, initial work |
| 26-50% | Core development | Main features being built |
| 51-75% | Advanced features | Additional features, integration |
| 76-99% | Final polish | Testing, bug fixes, documentation |
| 100% | Completed | Fully done and deployed |

## Naming Conventions

### File Names

**Format:** `kebab-case.md`

**Rules:**
- ✅ Use lowercase letters only
- ✅ Use hyphens to separate words
- ✅ Be descriptive but concise
- ❌ No spaces
- ❌ No underscores
- ❌ No uppercase letters
- ❌ No special characters

**Examples:**
- ✅ `e-commerce-platform.md`
- ✅ `mobile-app-development.md`
- ✅ `api-integration.md`
- ❌ `E-Commerce Platform.md`
- ❌ `mobile_app.md`
- ❌ `API Integration.md`

### Milestone Names

**Format:** Clear, specific, action-oriented

**Rules:**
- ✅ Be specific about what's being built
- ✅ Use action-oriented language
- ✅ Include scope/context
- ❌ Vague or generic terms
- ❌ Single words without context

**Examples:**
- ✅ "User Authentication System"
- ✅ "Database Migration from MySQL to PostgreSQL"
- ✅ "Frontend Dashboard Implementation"
- ✅ "API Documentation and Testing"
- ❌ "Auth"
- ❌ "Database"
- ❌ "Frontend"
- ❌ "Stuff"
- ❌ "More Work"

## Status Values

### Project Status

Use these exact values (case-sensitive):

- `Planning`
- `In Progress`
- `On Hold`
- `Completed`

### Milestone Status

Use these exact values (case-sensitive):

- `Not Started`
- `In Progress`
- `Completed`

## Update Frequency

### Weekly Updates (Recommended)

- Update progress percentages
- Update "Last Updated" date
- Add notes about recent work
- Document any blockers

### When Milestone Completes

- Change status to "Completed"
- Set progress to 100%
- Update overall progress calculation
- Add completion notes

### When Blockers Arise

- Document immediately in "Challenges & Blockers"
- Update affected milestone status if needed
- Add notes about resolution plan

### Monthly Reviews

- Review all milestones
- Add new milestones if project scope changed
- Update target dates if needed
- Archive completed projects

## Quality Standards

### Content Quality

**Do:**
- ✅ Be specific and detailed
- ✅ Use clear, professional language
- ✅ Include context and background
- ✅ Document decisions and rationale
- ✅ Keep information current

**Don't:**
- ❌ Use vague descriptions
- ❌ Leave sections empty
- ❌ Use informal language excessively
- ❌ Skip important details
- ❌ Let information become stale

### Formatting Quality

**Do:**
- ✅ Follow the template exactly
- ✅ Use consistent formatting
- ✅ Include all required sections
- ✅ Format progress bars correctly
- ✅ Test all links

**Don't:**
- ❌ Deviate from the template structure
- ❌ Mix formatting styles
- ❌ Skip required sections
- ❌ Use incorrect progress bar format
- ❌ Include broken links

### Pre-Submission Checklist

Before adding or updating a project:

- [ ] All required sections filled in
- [ ] Progress bars properly formatted (not just text)
- [ ] Progress percentages calculated correctly
- [ ] "Last Updated" date is current
- [ ] Project added to sidebar (`sidebars.js`)
- [ ] Project added to dashboard (`docs/index.md`)
- [ ] All links tested and working
- [ ] File name follows naming conventions
- [ ] Milestone names are clear and specific
- [ ] Status values match allowed options
- [ ] No placeholder text remaining
- [ ] Dates are in YYYY-MM-DD format
- [ ] Overall progress matches calculated value

## Common Mistakes

### ❌ Mistake: Missing Progress Bars
```markdown
| Milestone | Status | Progress | Date | Notes |
|-----------|--------|----------|------|-------|
| Setup | Done | 100% | 2025-01-01 | Completed |
```

### ✅ Correct: Proper Progress Bars
```markdown
| Milestone | Status | Progress | Date | Notes |
|-----------|--------|----------|------|-------|
| Setup | Completed | <div class="progress-bar-container progress-bar-small"><div class="progress-bar-fill progress-100" data-progress="100">100%</div></div> | 2025-01-01 | Completed |
```

### ❌ Mistake: Wrong Class Name
```html
<div class="progress-bar-fill progress-83" data-progress="83">83%</div>
```

### ✅ Correct: Rounded to Nearest 5
```html
<div class="progress-bar-fill progress-85" data-progress="85">85%</div>
```

### ❌ Mistake: Broken Link Format
```markdown
[View Project](projects/project-name.md)
```

### ✅ Correct: Docusaurus Link Format
```markdown
[View Project](projects/project-name)
```

## Enforcement

### Review Process

- All new projects should be reviewed before being added to dashboard
- Updates should follow the same standards
- Regular audits of existing documentation

### Getting Help

If you're unsure about any rule:
1. Check this document
2. Review the template: `docs/projects/project-template.md`
3. Look at existing projects for examples
4. Ask your team lead or project manager

---

**Remember**: Consistent, high-quality documentation helps everyone understand project status and make better decisions. Take the time to do it right!

