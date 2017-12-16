---
layout: post
title: "Awesome Technical Interviews #1: Preparing the interview"
image: /assets/interview_background.jpg
image_share: /assets/interview_background_card.jpg
image_preview: /assets/interview_background_preview.jpg
image_alt: A photo of a screen showing FizzBuzz a popular albeit horribly ineffective coding exercise.
---
From managing expectations throughout the company to writing the invitation mail, preparing an interview takes a considerable amount of time - Righteously so, because it's the most important meeting you'll be having this week.

*This is Part #1 of my series on [Awesome Technical Interviews](). Part #2 can be found [here]().*

## Context

I guess a fair bit of warning is appropriate at this point: My experience comes from working with young companies, with teams that like to be involved in processes like hiring. My clients never did rocket science, but develop apps and software for businesses and private people.

The environment is important here as there needs to be a mutual understanding and support for an interview process like this in every part of the company.

## Seeking clarification

Let's start with a simple goal of everything laid out in this blogpost series:

**Minimize surprises for the interviewee and everyone else involved at every point in the hiring process.**

Everyone means everyone. **Everyone** in the company should know the criteria applied to the interviews. **You** should know everything about the companies expectations towards the new-hire. **The interviewee** should know everything about what is going to happen on the interview. **Your colleagues** should know who's going to visit the office and why.

Make sure you understand the [complexity of the project and the role](https://lizkeogh.com/2013/07/21/estimating-complexity/) you're hiring for and make sure it is well communicated between the teams and line-managers. Chances are, your company does nothing that hasn't been done before on a technical level, so you might not need a specialist, but a curious person that is willing to get familiar with a new ecosystem.  

Do you have the capacity to train people and a proper mentor ship process in your company? If so, that means technical requirements become less important - what else is it you should focus on?

Make sure everyone is aware and in agreement about the criteria *important* to your company and of the criteria that you deemed *not important*. Interviewing handbooks like the [the one Medium published this year](https://medium.engineering/mediums-engineering-interview-process-b8d6b67927c4) are a valuable resource for you to find out what your companies criteria should be.

## Take-Home exercise or Pair Programming?

You should leave it to the interviewee to choose between a take-home exercise or a Pair Programming interview. There are [some downsides](https://cate.blog/2016/02/10/bad-interviews-are-a-company-problem-not-a-candidate-problem/) to take-home exercises, just as there are for on-site Pair Programming interviews, but remember that the person interviewing for the job might have other obligations that make it hard for them to visit your office for a few hours - just imagine having every company you're applying to ask you to come by for an afternoon very early into the process!

Should the interviewee choose a take-home exercise, make sure you don't let this factor into your decision at all. After they sent around their solution, invite them to the office and let them walk you through the code for half an hour as an exercise.

In the following, I'm assuming that the interviewee picked the *Pair Programming interview*.

## Picking a task

Next up is picking the task. Having facilitated countless coding katas at our meetup in Berlin, I hereby promise that a task can not be small enough for an hour of Pair Programming. Check out the [Kata-Log](http://kata-log.rocks/), a list of coding exercises compiled by the amazing [@egga_de](http://kata-log.rocks/) for inspiration if you like.

My personal take on this is: I love to use production code as an exercise. What I did in the past is to pick something I have done recently in our code base and delete most tests and the implementation. If your code base is too big, it might make sense to delete distracting aspects of it for the exercise.

Using your production code has some great advantages: You'll be deeply familiar with the Ins and Outs of the code in front of you. You have solved the problem before and can explain the requirements in depth, the interviewee can catch a short glimpse at the code they'd be working with and ultimately, they will get to know the domain you are working with a little.

Fair warning though: If you're frustrated with the current state of your code base and if things can unexpectedly break, it might not be the perfect fit for an interview.

No matter if you choose a coding kata or your production code base, there is one thing to keep in mind: The task should be as easy as possible, solvable by someone familiar with the code base in less than 30 minutes.

Let me give you two examples:

> You can filter the displayed results by limiting the price already. Our task will be similar, adding a filter to limit the results by their rating. Please implement the proper business logic and UI parts.

> Implement a function that will return a human readable presentation of a given time span in seconds, e.g. `prettyPrint(140) => "2 minutes, 20 seconds"`.  
> After that, add an option to only show the biggest unit and the second-biggest unit, given that it is not zero, e.g. `prettyPrint(90012, brevity: true) => "1 day, 1 hour`.

## The invitation

Now that you've picked the task, it's time to draft the invitation for the interviewee.

I of course remember how nervous I've been at every interview, checking the location of the office and the scheduled time every other minute as the interview came closer, which is why I now pay close attention to being very verbose when it comes to how the interview is going to happen.

Remember the goal: **Minimize surprises for the interviewee and everyone else involved at every point in the hiring process.**

<blockquote class="letter" markdown="1">
Hi _$NAME_,

nice to meet you! I'm the freelancer currently developing the front-end at _$COMPANY_ (find me on [Twitter](https://twitter.com/rradczewski)! 😄) and I'm very much looking forward to pairing with you next Tuesday.

If you want, feel free to bring **your own laptop with the dev setup you are comfortable with**. I will have my laptop (Atom, Chrome & GNOME3 on a Dell XPS) with me as well.

The codebase is a [create-react-app](https://github.com/facebookincubator/create-react-app) app with [react-router v4](https://github.com/ReactTraining/react-router/) and [redux](http://redux.js.org/). Right now, I'm working on filtering the search results and presenting them to the user. I imagine we could pair on getting a specific filter to work (e.g. filtering by price).

We will have water and coffee provided by the facilities at the office. Our office is on the 4th floor right next to the bathrooms in the lobby.
I will send you a calendar invitation with the exact address.

We will pair for at most one hour, the whole interview will take at most two hours.

Should you have any trouble finding the office, **feel free to give me a call via +491XXXXXXXXX**.  
Until then, if you have any other questions, feel free to send me a mail :)

Looking forward to meeting you!
</blockquote>

With the invitation sent, let me explain how the day of the interview is going to go down in [Part #2]().
