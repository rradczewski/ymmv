---
layout: post
title: "Where we're going, we don't need headphones!"
image: /assets/office_noise_background.jpg
image_preview: /assets/office_noise_background_preview.jpg
image_alt: Headphones on the keyboard on a laptop, depicting a typical way to flee loud environments
---

If there is one single complaint about work I hear most often from clients and friends, it's that they have a hard time focusing in their office. No matter if you're pairing with someone or need some quiet time - if you can't escape the background noise, you'll have a hard time getting any work done.  
Let me share with you how I try to have people happily leave their headphones in their backpack.

## Fix your office or don't force people to come

A strong position, granted, but let's be honest: If a company can't provide room for focus time, it needs to create a decent remote/home office culture and policies.

See for example how [vaamo](https://codecraft.vaamo.de/jobs/web-frontend-dev.html), my previous employer, describes their *Remote Culture* in one of their current job offerings:

>Your workplace is no-bullshit, like many other things at vaamo: Work where you want! You need an office? No problem, we have a beautiful office space in Frankfurt, which is easily reachable with public transit. You want to work from home or a coworking space? No problem! GitHub, Slack, Screenhero, Hangout etc will make sure nothing gets lost and we stay up to date. Except for that you miss being challenged at the soccer table … just sayin’.

If that's out of the question though - and I understand there are plenty of reasons why remote might does not fit your company right now - it might be time to consider a new office or some serious investments in noise canceling features in the present office.

Get some [sound barriers](http://www.ikea.com/de/de/catalog/products/70268811/) for workstations, [acoustic foam](https://acousticalsolutions.com/product-category/acoustic-foam/) for phone booths and [ceiling baffles](https://acousticalsolutions.com/product-category/ceiling-treatments/ceiling-sound-baffles/) for the whole office. Create extra spaces for people to have a conversation. This is no cost compared to the loss in productivity that interruptions create throughout everyone's workday.

## Design offices for functionality

In recent weeks, I've seen two particular office designs that stuck with me: First, [Markus Tacker](https://twitter.com/coderbyheart) shared his efforts of creating [his vision of an office](https://coderbyheart.com/office-design-by-an-office-hater/), a tour worth doing. He also mentions *visual noise*, distractions that happen in your field of view, as something to account for, with which I fully agree.

The second encounter was visiting friends from [Zweitag](http://zweitag.de/) in Münster a few weeks ago. For two weeks, I worked in their office and was amazed by how they manage to provide enclosed spaces to focus on work, all while also creating spaces and opportunities for smalltalk and collaboration in the hallways.  
Their office is fairly large, divided into offices for four people each. The rooms are not directly connected, but the same small part of the wall in each room is replaced with framed glass, giving you the opportunity to glance into the other offices in order to see if people are still working there ("light's still on").  
In their hallways, there are places to sit and work sprinkled across, a coffee bar, a terrace for smokers 😅 and plenty of other occasions to have a chat throughout the day.

*I tried to sketch the office in SketchUp but failed miserably. If you're curious, you either have to visit them in beautiful Münster or wait for me to get my hands on a decent mouse 😅.*

## Enable people to raise awareness about loudness

At the core of the issue with noise is, like so often, a *people problem*; One can, without bad intentions, be completely oblivious to the fact of how loud they're talking or how disrupting it is to shout across a room.
Making it visible that people are actively being disturbed in their work is a good starting point in order to sensitise people.
This way, they might move into a meeting room before the noise level gets out of hand.

This is where *Noisy* comes into play, a small Slackbot I wrote that enables people to anonymously raise the issue for everyone else to see.

![Noisy, the awareness-creating-Slackbot, asking people to tune it down a little after someone issued a particular slack command anonymously]({{ "/assets/noisy.png" | relative_url }})

Mind you that Noisy does not help stopping an immediate interruption as the people talking most likely are not looking at Slack in that particular moment, but only afterwards makes them notice how their behavior was affecting people. It further lowers the barrier of people coming forward and speaking out about the noise. At the same time, it does not address or blame individuals.

Setting up something like *Noisy* is easy as pie: It's an *AWS Lambda*-Function being called through a Slack [Slash Command](https://api.slack.com/slash-commands) Webhook that uses the [Incoming Webhooks](https://api.slack.com/incoming-webhooks) API from Slack to send a message to `#general` without mentioning the person who triggered the command.

![Noisy Invocations after deploying it: Day 1: 1, Day 2: 2, Day 3: 0, Day 4: 1, Day 5: 3, Day 6: 7, Day 7: 0 ]({{ "/assets/office_noise_noisy_invocations.png" | relative_url }})

I assembled this chart to show how this can already have an impact five days into the experiment: At some days, people triggered *Noisy* (dark grey) more than once a day, provoking some 👍 (light grey) that further drove the point across.

But Noisy is just the start. I wondered how I could create a mindful atmosphere in the office so I could remove *Noisy* from the Slack Team at some point.

## Automating the loudness indicator

Going a step further, I'd love to have people learn to look for a meeting room before it gets too loud. *Cleware*, a company in North Germany, sells a [USB Traffic Light](http://www.cleware-shop.de/epages/63698188.sf/en_US/?ViewObjectPath=%2FShops%2F63698188%2FProducts%2F42%2FSubProducts%2F42-1). I set it up with a Raspberry Pi and a microphone to permanently measure the noise level in the office.

![USB Traffic Light (green is on) and a microphone attached to a raspberry pi]({{ "/assets/traffic_light.jpg" | relative_url }})

The color coding is straight forward:
- If the traffic light is **green**, all is well.
- If it turns **yellow**, the mic picked up a raise in noise over the last few seconds
- If it turns **red**, someone issued the by now familiar `/noisy` command in Slack.

This all needs some tweaking, especially the [sensitivity of the microphone](https://twitter.com/fdeberle/status/875324353096896512), but I'm looking forward to seeing how [this experiment](https://twitter.com/rradczewski/status/874563225781755904) turns out.

## No headphones beyond this point

There is no black or white in handling this. While you might be able to create *Quiet Zones*, just as you can create *Collaboration Zones*, people working together in a room will make noise and hopefully it's productive noise most of the time.

The first step here is being aware that there are different types of people in your company; some who like the background noise, some who very much dislike it.  Giving them both the option to work the way they enjoy the most is something to start with. Working on their awareness of each other is the next step.
