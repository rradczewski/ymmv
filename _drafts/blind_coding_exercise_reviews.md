---
layout: post
title: "Blind reviews on coding exercises"
---
A coding assignment can give you lots of valuable insights into how a candidate approaches a problem, their thought processes and how they document their changes. There's only one thing I want to avoid, though: *Unconscious bias*. This is why I mask the original committer and then ask a colleague to review the assignment.

As I laid out in my blog posts on [*Awesome Technical Interviews*]({% link _posts/2018-01-23-Awesome_technical_interviews_part_0.md %}), I let candidates choose between a take-home exercise or a Pair Programming session as a coding exercise. While pair programming will allow me to interact with the candidate and empathize with them, the code review of a take-home exercise lacks this context and thus is even more subject to the reviewers internalized [biases](http://blog.dizzyd.com/blog/2014/11/24/bias/).

In order to avoid this, I will A) ask a colleague to review the code and B) anonymize the submission in order to let the code speak for itself.

Luckily, and with a few tweaks, we can use *Pull Requests* to make reviewing as easy and convenient for the reviewer as possible, all while keeping the commit history and preserving the anonymity of the candidate.

![A screenshot of a repository's open Pull Requests on GitHub showing three pending code assignments]({% link assets/blind_reviews_pr_screenshot.png %})

## Setting up the repository

I created a repository on GitHub (`coding-assignments`) that will contain all the coding exercises that are due to be reviewed on an individual branch.
On the `master` branch, you should lay out all information the reviewer needs to do a proper review. The [`README.md`]({% link _posts/2017-10-15-What-makes-a-good-README.md %}) should contain all guidelines regarding the review, the context in which the code was produced and the expectations towards the reviewer.

Now, candidates usually send me either a tarball with their repository, or they invite me to a repository. Either way, the following commands add the repository as a remote, fetch the commits and checkout the branch I'm interested in.

```sh
# Depending on if you have a remote repository or a tarball,
#  add the remote site to the repo as FOOBAR
git remote add FOOBAR git@github.com:candidate/solution.git
git remote add FOOBAR file:///tmp/from-tarball

# Retrieve all commits from the remote
git fetch FOOBAR

# Checkout FOOBAR/master to the new local branch foobar
git checkout -b foobar FOOBAR/master
```

## Masking the author

To remove the original author from the branch, we will use `git filter-branch`, one of the more powerful commands `git` exposes. It's basically a `map` over a range of commits, allowing you to change a commits content and metadata through a shell script.

```sh
git filter-branch --env-filter '
CORRECT_NAME="Some Applicant"
CORRECT_EMAIL="applicant@example.com"

export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
' foobar
```

This snippet is a simplified version of the command [GitHub recommends if you want to change an author in your repository](https://help.github.com/articles/changing-author-info/). We only want to mask one particular branch, which is why we drop the `--tag-name-filter cat -- --branches --tags` part of the command and replace it with our branch name.

After running this command, all commits on this branch should have their committers name and mail address replaced with `Some Applicant <applicant@example.com>`

## Rewriting history

Now, in case the coding assignment isn't done on a repository forked from the one we are working on, we have to rewrite history a little as to integrate the branch into our repository.

In order for GitHub to let us create a Pull Request, the branches `master` and `foobar` need to have a common ancestor, which is why we're going to rebase `foobar` onto `master`. We need to specify  [`theirs`](https://git-scm.com/docs/merge-strategies#merge-strategies-ours) as the strategy-option to the `recursive` merging algorithm because we want to have the committers version of e.g. the `README.md`.

```sh
git rebase master foobar --strategy-option=theirs
```

The branch should now have the same commits as `master`, followed by all commits the applicant made, just masked.

![A screenshot of a list of commits with me as the committer and "Some Applicant" as the masked author of the commit]({% link assets/blind_reviews_commit_history_screenshot.png %})

## Creating the Pull Request

Our branch is now ready to be pushed to the GitHub repository, a simple `git push origin foobar` should suffice. You can now create a Pull Request as usual and request a review from one or more of your colleagues 🎉.

The last step is of course to invite the candidate to a meeting where the reviewer will offer their constructive feedback on the code.

*If you want me to bring this process and my approach towards hiring to your company, send me a mail at [hello@craftswerk.io](mailto:hello@craftswerk.io) so we can talk about the specifics over a coffee or via video chat.*
