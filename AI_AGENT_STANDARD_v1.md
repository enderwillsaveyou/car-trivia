# AI Agent Standard (v1.0)

> Read this document before making changes to this project.

## Purpose

This document defines the standard operating procedure for every AI
assistant working on this project.

The GitHub repository is the permanent source of truth. The local
project folder is the working workspace. The conversation is temporary
working memory.

Important information should eventually be written into the repository.

------------------------------------------------------------------------

# Core Mission

-   Act as a collaborative engineering partner.
-   Improve the project with every interaction.
-   Preserve project knowledge.
-   Keep documentation synchronized with implementation.

------------------------------------------------------------------------

# Development Principles

Always prefer:

-   Small, incremental improvements
-   Clear documentation
-   Maintainable code
-   Version control
-   Reusable architecture
-   Simplicity over cleverness

Avoid:

-   Large rewrites without approval
-   Unnecessary complexity
-   Hidden assumptions
-   Undocumented decisions

------------------------------------------------------------------------

# Standard Repository Layout

``` text
README.md

docs/
ideas/
prompts/
agents/
src/
assets/
tests/
scripts/
.github/
```

Only create folders that are appropriate for the project.

------------------------------------------------------------------------

# README

Keep the README current.

Include:

-   Project purpose
-   Current status
-   Technology stack
-   Setup
-   Folder overview
-   Roadmap

------------------------------------------------------------------------

# Documentation

Update documentation whenever meaningful work is completed.

Typical files:

-   docs/vision.md
-   docs/architecture.md
-   docs/roadmap.md
-   docs/decisions.md
-   docs/changelog.md

------------------------------------------------------------------------

# Decision Tracking

Record significant technical decisions in:

`docs/decisions.md`

Include:

-   Date
-   Decision
-   Reason
-   Alternatives
-   Expected impact

------------------------------------------------------------------------

# Ideas

New ideas → `ideas/inbox.md`

Active work → `ideas/active.md`

Completed ideas → `ideas/completed.md`

Never delete ideas without instruction.

------------------------------------------------------------------------

# Prompts

Store valuable prompts inside the `prompts/` folder.

Continue improving prompts over time.

------------------------------------------------------------------------

# AI Collaboration

Assume multiple AI systems will contribute.

Maintain consistency.

Respect existing architecture.

Explain significant changes before implementing them.

------------------------------------------------------------------------

# Local Workflow

1.  Understand the project.
2.  Read existing documentation.
3.  Make the smallest reasonable change.
4.  Update documentation when appropriate.
5.  Recommend a commit.

------------------------------------------------------------------------

# GitHub Workflow

GitHub is the project's permanent memory.

Prefer:

-   Frequent small commits
-   Clear commit messages
-   Updated documentation
-   Preserved history

------------------------------------------------------------------------

# Coding

Prefer:

-   Readability
-   Simplicity
-   Consistency
-   Reusability

------------------------------------------------------------------------

# Communication

Before major work:

-   Explain the plan.
-   Implement incrementally.
-   Explain important changes.
-   Recommend documentation updates.
-   Recommend commit points.

------------------------------------------------------------------------

# Long-Term Goal

A future AI assistant should be able to understand this project by
reading the repository without relying on previous conversations.

Leave the project better than you found it.
