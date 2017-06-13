---
layout: post
title: "Where we're going, we don't need headphones!"
image: /assets/office_noise_background.jpg
image_alt: Headphones on the keyboard on a laptop, depicting a typical way to flee loud environments
---

If there is one single complaint about work I hear most often from clients and friends, it's that they have a hard time focusing in their office. No matter if you're pairing with someone or need some quiet time - if you can't escape the background noise, you'll have a hard time getting any work done.  

Let me share with you how I try to have people happily leave their headphones in their backpack.

## Improve your office or don't force people to come

A strong position, given, but let's be honest: If an office can't provide room for focus time, a company needs at least to have a decent remote/home office policy and culture.

See for example how [vaamo](https://codecraft.vaamo.de/jobs/web-frontend-dev.html), my previous employer, describes their *Remote Culture*:

>Your workplace is no-bullshit, like many other things at vaamo: Work where you want! You need an office? No problem, we have a beautiful office space in Frankfurt, which is easily reachable with public transit. You want to work from home or a coworking space? No problem! GitHub, Slack, Screenhero, Hangout etc will make sure nothing gets lost and we stay up to date. Except for that you miss being challenged at the soccer table … just sayin’.

If that's out of the question though - and I understand there are plenty of reasons why remote might does not fit your company right now - it might be time to consider a new office or some serious investments in noise canceling features in the present office.

Get some sound barriers, recording studio foam for the ceilings, add phone booths or other opportunities for people to retreat.

## Enable people to raise awareness about loudness

At the core of the issue with noise is, like so often, a *people problem*; People can be oblivious to the fact of how loud they're talking or how disrupting it is to shout across a room. Making it visible that people are actively being disturbed in their work is a good starting point of sensitise people so they might move into a meeting room before the noise level gets out of hand.

This is where *Noisy* comes into play, a small Slackbot I wrote that enables people to anonymously raise the issue for everyone else to see.

![Noisy, the awareness-creating-Slackbot, asking people to tune it down a little after someone issued a particular slack command anonymously]({{ "/assets/noisy.png" | relative_url }})

Mind you that Noisy does not help to counter an immediate interruption (as the people talking most likely are not looking at Slack in that particular moment), but only afterwards makes them note how their behavior was bothering people. It further lowers the barrier of people coming forward and speaking out against the noise and at the same time does not blame nor address individuals.

Setting up something like *Noisy* is easy as pie: It's an *AWS Lambda*-Function being called through a Slack [Slash Command](https://api.slack.com/slash-commands) Webhook, that uses the [Incoming Webhooks](https://api.slack.com/incoming-webhooks) API from Slack to send a message to `#general` without mentioning the person who triggered the command.

![Noisy Invocations after deploying it: Day 1: 1, Day 2: 2, Day 3: 0, Day 4: 1, Day 5: 3 ]({{ "/assets/office_noise_noisy_invocations.png" | relative_url }})

## Automating the loudness indicator

Going a step further, I'd love to have people learn to look for a meeting room before the noise level gets out of hand. *Cleware*, a company in North Germany, sells a [USB Traffic Light](http://www.cleware-shop.de/epages/63698188.sf/en_US/?ViewObjectPath=%2FShops%2F63698188%2FProducts%2F42%2FSubProducts%2F42-1), which I hooked up to a Raspberry Pi equipped with a microphone and setup to permanently measure the noise level in the office.

![USB Traffic Light (green is on) and a microphone attached to a raspberry pi]({{ "/assets/traffic_light.jpg" | relative_url }})

The color coding is rather obvious:
- If the traffic light is **green**, all is well.
- If it turns **yellow**, the mic picked up a raise in noise over the last few seconds
- If it turns **red**, someone issued the by now familiar `/noisy` command in Slack.

<todo>
Appendix: Markus' Office Space plus maybe Zweitag
</todo>
