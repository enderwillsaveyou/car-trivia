# Project_Custom_Instructions_GitHub_Repo_Setup_Template.md

## Purpose

Use this file when an AI assistant is asked to create, initialize, or manage a GitHub repository for a project that follows Mike's AI Project Operating System standards.

This file is focused only on GitHub repository setup and GitHub-based project management. It should be used together with:

- `Project_Custom_Instructions_AI_Agent_Standard.md`
- `Project_Custom_Instructions_Project_Context.md`

The goal is to make GitHub the permanent source of truth for project files, decisions, prompts, documentation, and long-term AI collaboration.

---

# Core Rule

Do not assume a GitHub repository already exists.

Before doing any GitHub work, confirm whether the project already has a repository.

If the repository exists, inspect it before changing anything.

If the repository does not exist, follow the repository creation workflow below.

---

# Repository Setup Checklist

Before creating or initializing a repository, confirm or derive the following:

- GitHub owner or organization:
- Repository name:
- Repository full name, such as `owner/repo-name`:
- Visibility: `private` or `public`
- Default branch: usually `main`
- Project name:
- Project purpose:
- Initial project stage:
- Whether this repository is documentation-only, code-based, or mixed:
- Whether the repository should be used as a reusable template:
- Whether the user wants issues, labels, and GitHub project tracking initialized:

Default recommendation for new personal AI workflow projects:

```text
Visibility: private
Default branch: main
Initial mode: documentation-first
Repository type: reusable workflow/template foundation
```

---

# Repository Creation Rules

## If the AI tool can create repositories

Ask for confirmation before creating the repository.

Confirm:

```text
I can create the GitHub repository now with these settings:

Owner:
Repository name:
Visibility:
Default branch:
Purpose:

Please confirm before I create it.
```

After confirmation, create the repository and then initialize the files listed in this template.

## If the AI tool cannot create repositories

Tell the user that repo creation is not available from the current AI environment, then give one of these options.

### Manual GitHub creation

Tell the user to create a new GitHub repository with:

```text
Repository name: <repo-name>
Visibility: Private unless the user says otherwise
Initialize with README: No, unless the user wants GitHub to create it
Add .gitignore: No, unless the project stack is already known
Choose a license: No license unless the user requests one
```

Then ask the user to provide the repository full name:

```text
owner/repo-name
```

### GitHub CLI creation

If the user uses GitHub CLI, recommend:

```bash
gh repo create <repo-name> --private --description "<project description>"
```

For a public repo:

```bash
gh repo create <repo-name> --public --description "<project description>"
```

Only recommend CLI commands. Do not assume the user has GitHub CLI installed.

---

# Repository Inspection Rules

If the repository already exists, inspect before modifying.

Check for:

- Existing README
- Existing project context file
- Existing AI instruction files
- Existing docs folder
- Existing prompts folder
- Existing issues
- Existing branches
- Existing GitHub Actions workflows
- Existing codebase

Do not overwrite existing files unless explicitly instructed.

Prefer merging, appending, or creating a new versioned file.

---

# Initial Repository Structure

For a new AI workflow/template repository, initialize this structure:

```text
README.md
Project_Custom_Instructions_AI_Agent_Standard.md
Project_Custom_Instructions_Project_Context.md
Project_Custom_Instructions_GitHub_Repo_Setup_Template.md

agents/
  README.md
  handoff.md
  tool-compatibility.md

docs/
  vision.md
  roadmap.md
  decisions.md
  changelog.md
  github-workflow.md

ideas/
  inbox.md
  active.md
  completed.md

prompts/
  README.md
  project-startup.md
  github-bootstrap.md
  agent-handoff.md

.github/
  copilot-instructions.md
  ISSUE_TEMPLATE/
    task.md
    decision.md
    prompt-improvement.md
```

Only create `src/`, `tests/`, `assets/`, and `scripts/` when the project requires them.

For a documentation-first workflow repository, these folders may remain absent until needed:

```text
src/
tests/
assets/
scripts/
```

---

# Required Initial Files

## `README.md`

Purpose: Front door of the repository.

Include:

- Project name
- Purpose
- Current stage
- How this repo should be used
- Folder overview
- Current priorities
- How AI assistants should work with the repo

Recommended initial status:

```text
Stage: Planning / Validation
Mode: Documentation-first
Source of truth: GitHub repository
```

---

## `Project_Custom_Instructions_AI_Agent_Standard.md`

Purpose: Reusable AI operating standard.

This file defines how AI assistants should behave across projects.

It should include:

- Mission
- Engineering standards
- Documentation expectations
- GitHub workflow expectations
- AI collaboration expectations
- Source-of-truth model

Do not bury project-specific details in this file.

---

## `Project_Custom_Instructions_Project_Context.md`

Purpose: Project-specific context.

This file should be updated for each new project.

Include:

- Project name
- Purpose
- Vision
- Target users
- Technology stack
- Current status
- Success criteria
- Constraints
- Current priorities
- Known issues
- Important links
- Notes for AI assistants

Add this repository section when GitHub is used:

```markdown
## Repository Setup

- Repository Exists:
- GitHub Owner:
- Repository Name:
- Repository Full Name:
- Visibility:
- Default Branch:
- Initial Repo Purpose:
- First Commit Goal:
```

---

## `Project_Custom_Instructions_GitHub_Repo_Setup_Template.md`

Purpose: This file.

It tells AI assistants how to create, initialize, and manage the GitHub repository correctly.

Keep this file focused only on GitHub setup and repo management.

---

## `agents/handoff.md`

Purpose: Help future AI assistants continue work without relying on old chat history.

Include:

```markdown
# AI Handoff

## Current Status

## Last Completed Work

## Current Open Task

## Important Decisions

## Known Issues

## Recommended Next Step

## Files Recently Changed
```

Update this file after meaningful project changes.

---

## `agents/tool-compatibility.md`

Purpose: Track how different AI tools should interact with the project.

Include sections for:

- ChatGPT Projects
- Claude Projects
- Google Gemini / Gems
- GitHub Copilot
- GitHub-connected coding agents
- Local coding agents
- Future AI tools

---

## `docs/vision.md`

Purpose: Define the long-term reason this project exists.

Include:

- Problem being solved
- Long-term goal
- Who benefits
- What success looks like

---

## `docs/roadmap.md`

Purpose: Track project phases.

Recommended starting phases:

```markdown
# Roadmap

## Phase 1 — Validate AI Project Standards

## Phase 2 — Finalize Template Files

## Phase 3 — Test GitHub Workflow from AI Chat

## Phase 4 — Test Cross-Platform AI Compatibility

## Phase 5 — Use Template on a Real Project
```

---

## `docs/decisions.md`

Purpose: Record important project decisions.

Use this format:

```markdown
## Decision: <Title>

- Date:
- Status: Proposed / Accepted / Replaced / Deprecated
- Decision:
- Reason:
- Alternatives Considered:
- Impact:
```

Record decisions that affect:

- Repo structure
- AI workflow
- Prompt management
- Documentation strategy
- Deployment
- Security
- Tooling
- Long-term maintainability

---

## `docs/changelog.md`

Purpose: Track meaningful changes.

Use this format:

```markdown
# Changelog

## YYYY-MM-DD

### Added

### Changed

### Fixed

### Removed
```

---

## `docs/github-workflow.md`

Purpose: Explain how GitHub should be used for this project.

Include:

- Branch strategy
- Commit strategy
- Issue workflow
- Pull request expectations
- Documentation update rules
- AI assistant workflow

---

## `ideas/`

Purpose: Capture ideas without derailing active work.

Use:

```text
ideas/inbox.md      New ideas
ideas/active.md     Ideas being actively explored
ideas/completed.md  Implemented or closed ideas
```

Never delete ideas unless the user explicitly asks.

---

## `prompts/`

Purpose: Store reusable prompts.

Every saved prompt should include:

```markdown
# Prompt Title

## Purpose

## Best Used With

## Inputs Needed

## Prompt

## Expected Output

## Notes

## Version
```

---

# GitHub Issue Setup

If the AI tool can create GitHub issues, create starter issues after the repo is initialized.

Recommended starter issues:

1. Finalize AI Agent Standard v2
2. Finalize Project Context Template v2
3. Create GitHub bootstrap prompt
4. Create prompt tracking workflow
5. Create decision tracking workflow
6. Test ChatGPT to GitHub file creation workflow
7. Test Claude compatibility workflow
8. Test Gemini compatibility workflow
9. Document first successful AI-assisted GitHub workflow

---

# Recommended Labels

If labels can be created or managed, use these:

```text
documentation
prompt
workflow
github
ai-agent
decision
idea
template
testing
blocked
needs-review
```

If label creation is not available, list the recommended labels in `docs/github-workflow.md`.

---

# Branch Strategy

For solo personal workflow projects, keep branching simple.

Default branches:

```text
main
```

Optional working branches:

```text
docs/<topic>
prompts/<topic>
workflow/<topic>
fix/<topic>
```

Examples:

```text
docs/v2-agent-standard
prompts/github-bootstrap
workflow/decision-tracking
fix/project-context-formatting
```

Do not create unnecessary branches for tiny documentation edits unless the user wants pull-request review practice.

---

# Commit Strategy

Use small, descriptive commits.

Good examples:

```text
Initialize AI workflow validation repository
Add GitHub repository setup template
Add project context template
Document decision tracking workflow
Add prompt management structure
Update AI agent standard with repo bootstrap rules
```

Avoid vague commit messages:

```text
updates
stuff
changes
final
misc
```

For meaningful project changes, update documentation in the same commit when practical.

---

# Pull Request Strategy

For a personal learning repo, pull requests are optional but useful for practicing workflow.

Use pull requests when:

- Testing AI-assisted GitHub workflows
- Reviewing larger documentation changes
- Changing the project standard
- Adding reusable templates
- Testing collaboration between multiple AI assistants

A pull request should include:

- Summary
- Files changed
- Reason for change
- Testing or validation performed
- Follow-up work

---

# Prompt Management Workflow

When the user creates or improves a prompt:

1. Decide whether it is reusable.
2. If reusable, save it under `prompts/`.
3. Include purpose, target tool, inputs, expected output, and notes.
4. Update changelog if the prompt is important.
5. Recommend a commit message.

Useful prompt categories:

```text
prompts/project-startup.md
prompts/github-bootstrap.md
prompts/agent-handoff.md
prompts/documentation-update.md
prompts/debugging.md
prompts/research.md
```

---

# Decision Tracking Workflow

When a meaningful decision is made:

1. Summarize the decision.
2. Explain the reason.
3. Note alternatives considered.
4. Add it to `docs/decisions.md`.
5. Update `agents/handoff.md` if future assistants need to know.
6. Recommend a commit message.

---

# Documentation Update Rules

Update documentation when:

- Project purpose changes
- Repo structure changes
- A new workflow is adopted
- A new prompt becomes reusable
- A significant decision is made
- A GitHub workflow is validated
- Deployment is added
- Another AI assistant contributes

Do not let important knowledge live only in chat.

---

# Security Rules

Never commit secrets.

Do not place these in repository files:

- API keys
- Passwords
- Tokens
- Private credentials
- Personal financial data
- Sensitive work data
- Customer/client confidential data

If environment variables are needed later, create:

```text
.env.example
```

Do not create or commit:

```text
.env
```

Document secret names only, not secret values.

---

# AI Agent Operating Instructions for GitHub Work

When working with GitHub, the AI assistant should follow this sequence:

1. Read the project context.
2. Read the AI agent standard.
3. Check whether the GitHub repo exists.
4. If no repo exists, guide or perform repo creation depending on tool capability.
5. If repo exists, inspect existing files before modifying.
6. Make the smallest reasonable change.
7. Preserve existing documentation.
8. Do not overwrite files unless instructed.
9. Update related documentation when appropriate.
10. Recommend a commit message.
11. Recommend issue or PR updates if relevant.
12. Update handoff notes after meaningful work.

---

# First Repo Initialization Commit

Recommended first commit message:

```text
Initialize AI workflow validation repository
```

Recommended first commit contents:

```text
README.md
Project_Custom_Instructions_AI_Agent_Standard.md
Project_Custom_Instructions_Project_Context.md
Project_Custom_Instructions_GitHub_Repo_Setup_Template.md
agents/README.md
agents/handoff.md
agents/tool-compatibility.md
docs/vision.md
docs/roadmap.md
docs/decisions.md
docs/changelog.md
docs/github-workflow.md
ideas/inbox.md
ideas/active.md
ideas/completed.md
prompts/README.md
prompts/project-startup.md
prompts/github-bootstrap.md
prompts/agent-handoff.md
.github/copilot-instructions.md
.github/ISSUE_TEMPLATE/task.md
.github/ISSUE_TEMPLATE/decision.md
.github/ISSUE_TEMPLATE/prompt-improvement.md
```

---

# First Repo Initialization Summary Template

After initializing the repo, report back with:

```markdown
## Repository Initialized

Repository:
Visibility:
Default branch:

## Files Created

## Issues Created

## Decisions Recorded

## Recommended Next Step

## Recommended Commit Message
```

---

# Default Recommendation for Mike's AI Workflow Validation Repo

If this template is being used for Mike's first AI workflow validation repository, recommend:

```text
Repository name: ai-workflow-validation
GitHub owner: enderwillsaveyou
Visibility: private
Default branch: main
Initial mode: documentation-first
Purpose: Build, test, and refine reusable AI project standards, GitHub workflows, project context templates, prompt management, decision tracking, and multi-assistant collaboration.
```

The repo should begin as a documentation and workflow repository. Do not generate app code until the project moves beyond workflow validation.

