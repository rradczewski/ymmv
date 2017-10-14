---
layout: post
title: Why your repository needs a good README
image: /assets/readme_background.jpg
image_preview: /assets/readme_background_preview.jpg
image_alt: The README of the SoftwareCrafters/website project
---
Have a look at your `README` right now. How easy is it to get your project up and running from scratch? What does someone need to know about making changes to the codebase? Chances are, if your README is not providing definite and up to date answers to these questions, you're making it harder than necessary for people to contribute and experiment.

If you're the newest hire in a company or their onboarding-buddy, here's a good housekeeping task **for both of you**: Whatever project you need to setup on your machine, make sure to update the README and document all your findings as you set up the project. You reached your goal if someone completely unfamiliar with your project can set it up in a few minutes without major issues.

If you could use some guidance, the following post explains how I'd like to setup READMEs.

## Your project at a glance: What and how?

Your `README` is the first thing you see when you go on a project repository, be it on github oder gitlab. The first question it should answer is: *Is this what I'm looking for?*

What is the project good for? Is it the frontend? Is it the backend? Is it a collection of database migration scripts?

## Prerequisites: What do you need to get started?

> Run this once
> ```shell
$ brew install nvm gnu-sed watchman  # Mac
$ yaourt -S nvm                      # Linux
```

There's always something. You usually need to install a version manager (looking at you, nvm, rvm and such), docker or vagrant. If your dependencies need some specific setup, place it here to make it visible before people start to setup the project.

It's always a good idea to cover the major platforms and ecosystems your colleagues might have.

## Running it - You need this all the time

> ```shell
$ git pull origin   # Get the latest changes
$ nvm install       # Make sure you're running the node version we need
$ npm install       # Make sure all dependencies are up-to-date
$ npm start         # Run the application
```

Why bother adding `git pull` here you may ask. The answer is, I want everyone in the company to be able to run the latest version of our project on their machine, so I rather mention one more command than leaving them with an old version.

What I also do here (with `nvm install` and `npm install`), is cover updating dependencies should they have changed.

## Housekeeping / Troubleshooting

> ```shell
$ git checkout -f master  # Make sure you're on master
$ git reset --hard HEAD   # Undo all changes you did
$ git pull origin         # Retrieve latest commit
>
$ nvm install             # Make sure you're running the node version we need
$ npm install             # Reinstall all dependencies
>
$ npm test                # Run the tests
$ npm start               # Does this work now?
```

If someone is running into problems setting up your project, chances are they have unstaged changes, broken dependencies, or happened to pull the latest changes that contain severe bugs. This is the paragraph you need to make sure to narrow down if it's an issue with the codebase or the persons machine.

Make sure to warn them about commands like `git clean -xfd` or `git checkout -f master` though - these will remove all untracked files, even those ignored through `.gitignore`, and undo all changes they did to tracked files - possibly resulting in data loss.

# contributing

## contribution workflow

## verification and tests

# development

## repository structure

## guidelines for style, conventions

# resources

## further readings

## workshops, talks

## important libraries
