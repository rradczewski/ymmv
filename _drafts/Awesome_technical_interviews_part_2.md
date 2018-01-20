---
layout: post
title: "Awesome Technical Interviews #2: Conducting the interview"
image: /assets/interview_background.jpg
image_share: /assets/interview_background_card.jpg
image_preview: /assets/interview_background_preview.jpg
image_alt: A photo of a screen showing FizzBuzz a popular albeit horribly ineffective coding exercise.
---
Think about it - there are only a few occasions in your professional life that are as exceptional and stressful as interviewing for a new job. The power balances lined up against you, the unknown ahead of you. As an interviewer, it is now your task to mitigate all that.

*This is Part #2 of my series on [Awesome Technical Interviews]({% link _drafts/Awesome_technical_interviews_part_0.md %}). Part #1 can be found [here]({% link _drafts/Awesome_technical_interviews_part_1.md %}).*

## Preparations

The invitation is sent out, the interviewee accepted and the interview is still a week or two away; Time to plan the day! That interview will be the most important meeting I'm having that day, so I go and reschedule everything before and after the interview.

I will be the *Navigator*, so I'm making sure I understand the task I picked. In case I chose to use the production code base, I delete the folder and setup everything from scratch. If you chose the same, repeat this until you are sure that it can be done in the matter of a few minutes. If you're unsure, try it on a colleague's machine as well. Export the working directory to a fresh git repository and make sure you know the candidate's credentials so you can invite them to the repository just before the pairing starts.

Whenever I'm very unsure about the experience of the interviewee, I make sure to make up your mind about which guidance I want to give and how I could change and steer the task to become easier or harder. This is a crucial part of my preparations because it is up to me to make the interview a pleasant and insightful experience.

## Managing expectations

I'll keep reiterating my goal from [Part #1]({% link _drafts/Awesome_technical_interviews_part_1.md %}):

**Minimize surprises for the interviewee and everyone else involved at every point in the hiring process.**

Let's start with my own expectations: I want the interview to go well. I am investing a lot of time in it, the company is paying for it and the goal is that it ultimately results in a new colleague. I want to get to know my new colleague. At this point, my default assumption is that I want to work with the person I'm going to interview with.

The more aware I am of these expectations towards me and the interview itself, the better I will be able to empathize with the interviewee. Just as with the invitation, the way I will soon explain the expectations towards the interviewee to them will help mitigate their nervousness and will allow me to get a better and authentic idea of the person in front of me. As a pleasant side-effect, this will also help me with my nervousness on the day of the interview.

## Good to see you!

On the day of the interview, I unmute my phone so I don't miss a message from the interviewee. Once they arrive, I try to be the first person to greet them. From this point on, I have to be aware of the fact that there will be a power imbalance in my interactions with the interviewee: I will be calling the shots on everything that's going to happen and the interviewee's well-being is in my hand.

Once the two of us settled down, the first important question I ask is:  
*"Are you well? I promise that there is no disadvantage for you if we reschedule this interview because you are not feeling well."*  

And I mean that. Bad luck happens and *Moore's Law* by definition strikes on the worst occasions. The interview is one of the most important meetings someone will have during their employment at a company; if their mind is somewhere else or they are feeling sick, I accept that and reschedule the interview.

If everything is well, I proceed with explaining the agenda of the day: We will pair for exactly one hour, then have a short retrospective about the session over a coffee.

## The pairing

In the case that the interviewee brought their own laptop, the next few minutes will be spent waiting for *git*, *npm*, *IntelliJ* or about every tool needed to set up the code base and run the tests, so I take this time to explain the interviewee that the next hour is not about getting things done or finishing the task (**!**), but about seeing how our collaboration works out and how they approach the problem in a pairing setup. There is no need to be mysterious about this - quite the opposite! The more explicitly you lay out your expectations, the more comfortable the interviewee is going to be with showing their best.

Not everyone is used to pairing, so it's important for me to explain that I'm their partner in this and that I'm looking to have discussions with them, not quiz them on the task. I will answer every question they will have and should I be at a loss too, it's completely fine for us to resort to *StackOverflow*.

Pairing with them also means getting a grasp of their overall skill level: How fast they are with the IDE, how knowledgeable they are in the programming language and its ecosystem, what kind of questions they ask or discussions they start. It's important for me to not be too picky here though: You should have certain expectations towards someone who's applying for a *Senior Developer* role, but an hour is nowhere enough to categorize someone on an engineering ladder, so I tick this box as early as possible and move on.

## My observations

I will closely watch our interactions throughout the pairing session and take notes whenever I deem something to be relevant enough. This can irritate the interviewee, which is why I make sure to warn them about me writing down something every so often. Again, I can be completely transparent with them about why I do this: I need to relay my impression to others at some point later. Writing down notes now prevents me from recalling something from memory, which gets worse the more time passes and the more things I do between the pairing session and writing down my impression.

What I'm looking for is to have a productive discussion about the problem and the approach we should take. I'm a huge fan of using *Test-driven Development* in this situation as it helps align the two of us on the steps we need to take next. With less experienced candidates, this might turn into a lesson in test-driving an implementation - which is perfectly fine in my opinion, as I get an insight into their thought processes, even if we spent most of the time coming up with the test cases.

On a more personal note: Even after running *Coding Dojos* for hundreds of people over the last five years, I can find myself being impatient as the Navigator at times. My personal challenge in this situation is to not just let the candidate decide how they want to implement the solution and not push my ideas onto them, but also to let them make mistakes that I've seen in the past. It's actually a good thing to run into these mistakes, as we can start discussing the impact of e.g. a design mistake and the possible refactorings we could do to get rid of it.

## The retrospective

When the alarm I set when we started pairing goes off, I politely ask the candidate to delete the repository from the machine first. A very intense hour has passed since the last break, so we're going to take a rest first before heading into a short retrospective. If I find myself idle, I will go through my notes and add more observations.

In the retrospective, I want to understand the candidates experience with the pairing. It will not be a safe retrospective, so don't expect to see the candidate expressing their concerns and vulnerability - it's a job interview after all.

The retrospective is about seeing them reflect on the previous hour. I will share positive observations I made (e.g. *I liked how you extracted a function for choosing between singular and plural*) and will ask questions to see how the candidate reflects on their work:

- How do you like our solution to the problem?
- Did you learn anything new in the last hour?
- What would you change from here?

With the retrospective closed off, I thank the candidate for their time and explain how we go from here. I usually ask if they have a deadline until which they would like to hear back from us and that they could reach out to me anytime in case they have questions about the company.

The meeting doesn't end here for me though: The next half hour is spent on me refining my notes and actively looking for biases I could have overlooked that might influence my impression. After that, I meet with the line manager and relay my impression to them (not the notes though).

## That's it!

So this is how I have been conducting technical interviews at my clients'. If you like to read more, make sure to check out the [*Further Readings*]({% link _drafts/Awesome_technical_interviews_part_0.md %}#-further-readings) I added in the introduction post.

If you want me to bring this process to your company, send me a mail at [hello@craftswerk.io](mailto:hello@craftswerk.io) so we can talk about the specifics over a coffee.
