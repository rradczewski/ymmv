---
title: "A useful metric for CI: Build Stability"
---

# Measuring CI Stability

- contrast to code coverage and other metrics
- if the build is failing 50% of the time, it's more like half-continuous integration and deployment

## What does it mean if its low?

What should a CI/CD do?

- Build the app and make sure dev's weren't sloppy (you might as well just have a git-pre-push hook that makes sure 90% of the cases are covered)
- Deploy the app so we can keep the feedback loop narrow


- PR Workflow: Features are too big and/or too strongly coupled
- Trunk Workflow:
  - Bad Integration Tests
  - Flaky Deployment Strategies
  - 3rd Party Dependencies
  - Sloppy Developers (without push-hooks)
