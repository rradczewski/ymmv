---
layout: post
title: "Coffee Kanban & the case for stopping the line"
image: /assets/the-case-for-stopping-the-line.jpg
image_alt: "An aeropress coffee maker in front of a tea pot"
excerpt: "At multiple occasions this year, I ran a workshop that combined two of my dearest topics: Coffee and Kanban. I got consultants, developers, testers and product managers to try to optimize the flow of coffee. The most interesting insight for me? You should make people feel comfortable to stop the line."
---
*<small>Cover photo by [Daniel Temme](https://twitter.com/dtemme)</small>*

{{ page.excerpt }}

## What is Coffee Kanban?

Coffee Kanban is a workshop I had the idea for when preparing for [SoCraTes 2018](https://www.socrates-conference.de/). Just like every year, I packed all my coffee equipment and got some fresh coffee beans from my local roasters to share with the other attendees, and so did they. Between us, we must have had about 5 kilos of delicious third wave coffee and every conceivable method of brewing it.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Some more to be jealous about <br>You missed the coffee Kanban <a href="https://twitter.com/hashtag/socrates2018?src=hash&amp;ref_src=twsrc%5Etfw">#socrates2018</a> <a href="https://t.co/sc0JZ5GY61">pic.twitter.com/sc0JZ5GY61</a></p>&mdash; nat ann (@AnnNat) <a href="https://twitter.com/AnnNat/status/1033015354967121921?ref_src=twsrc%5Etfw">August 24, 2018</a></blockquote>

In the last years, a lot of attendees of SoCraTes conference were eager to learn how to make a good coffee themselves but it was difficult for them to find someone to show them as our skilled baristas mostly just rushed from session to session and stopped only to quickly make a coffee for themselves.

Add to this grave deficiency the fact that I'm very fond of Kanban and its origins in manufacturing and with that, the idea was born to create a coffee manufacturing line utilizing Kanban principles. Other than for my other workshops, I didn't have a a specific goal in mind. I merely believed that designing it would be an interesting challenge and that the workshop would hold lots insights to gain which can easily be applied to product development!

After running the workshop a couple of times now, I'm convinced that it didn't just only teach people how to brew better coffee, but also helped us understand how to continuously improve a moving system and what parts and effects we should pay attention to.

## Designing the factory floor

The one thing I find most challenging about mentoring is teaching something that comes completely natural to me after having done it hundreds of times in my life. Coffee making is one of these - every morning, every move I do is spot on:  
From first weighting the water so it can heat while I weight and grind the beans and prepare the AeroPress, to slightly tilting and then lifting the stamp after pouring the water to create suction that will keep the water inside the AeroPress - each of these moves happens subconsciously. Explicating each of those steps didn't come that easy to me, something I found very peculiar.

{% include responsive-image.html image="assets/coffee-kanban-cards.jpg" classes="no-decoration" %}

What I ended up where 13 distinct steps[^1] that I had index cards designed for. These would serve as the **Stations** of the factory floor, with people being assigned to at most one station at any time.

## Insights from the workshops at Leanovate, SoCraTes 2018 & ProductCamp Berlin 2018

I owe a big **Thank You** to [Leanovate](https://www.leanovate.de/) for letting me crash yet another one of their company-internal LeanovateDays to test-drive this workshop and for their invaluable feedback. We ended up producing a mess in their kitchen after lunch, but the workshop and the retrospective provided me with so many things to revisit that it really helped flesh out the workshop right in time for the upcoming first public run of the workshop.

For SoCraTes 2018, I iterated over the station setup, aggregating them so a person is assigned to a station, such as **Grind** or **Brew**, each with around 4 distinct but related tasks.
I further designated the cups to be the "kanban container", the item that flows through the system, and added an order-sticker to it so we could keep track of an order and its metrics as it passes from station to station.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/socrates2018?src=hash&amp;ref_src=twsrc%5Etfw">#socrates2018</a> the awesome <a href="https://twitter.com/rradczewski?ref_src=twsrc%5Etfw">@rradczewski</a> prepped the a super cool workshop about coffee and kanban. Don’t miss it! <a href="https://t.co/dBe9eRhxoF">pic.twitter.com/dBe9eRhxoF</a></p>&mdash; Benjamin Reitzammer (@benjamin) <a href="https://twitter.com/benjamin/status/1032892909874499585?ref_src=twsrc%5Etfw">August 24, 2018</a></blockquote>

We set up the factory floor where we always put our coffee gear, right in the hallway where people could order a coffee before they go to another session. The session on Friday turned out to be so interesting that we ran another one on Saturday. We made sure to measure both **Cycle Time** (the time it takes to brew a coffee, from grabbing the order cup) and **Lead Time** (the time it takes from ordering to receiving the coffee).

Let me spill the beans to you right away: Putting it mildly, we were rather slow in the first session. Average **Lead Time** was about 18 minutes, even though we **Cycle Time** floated around at about 9 minutes. One poor soul had to wait 40 minutes for their coffee 😱.

But the first session was purely about experimenting with the format, so we didn't take time to think and reflect about the intricacies of the process. For example, we picked orders at random, not by any measure of priority. We never made the conscious decision between prioritizing already late orders or dropping late orders to be quick with the orders still coming in. I was trying to assign people to the stations as soon as I saw a station running at full capacity, but I couldn't keep up and it felt a bit like my presence ruined the notion of self-organization - there was no moment where one of the workers "**Stopped The Line**" in order to make the others aware of an issue they had.

<table class="collapsing-table">
<tr>
<td style="width: 50%; padding: 5px;">{% include responsive-image.html image="/assets/coffee-kanban-socrates2018-1.jpg" %}</td>
<td style="width: 50%; padding: 5px;">{% include responsive-image.html image="/assets/coffee-kanban-socrates2018-2.jpg" %}</td>
</tr>
</table>

### Insight #1: Optimizing for speed risks everything

The room was buzzing with noise and hectic movements, with people rushing to pick up an order and work on it but never paying close attention to the system load or issues other stations had. There was one particular issue that stuck with me as it mirrored back a typical organizational dysfunction as deadlines approach and everyone puts their blinders on and stops looking left and right:

At one point, the "customers" had to wash previously used cups in order to put in an order. More often than not, the cups - our designated kanban container - would still be wet inside. The **Grind**-station did as they were told, grinding the beans directly into the cup. Once they were done, they placed the cup in their output queue and moved on to the next order.  
As the **Preparing**-station picked up the order, their next step would've been to pour the ground coffee from the cup into the AeroPress, but they struggled with the coffee sticking to the wet cup. They helped themselves with a spoon, but they lacked the space to give feedback to the **Grind**-station. Purely by chance, I became aware of the issue and made sure to mention it to the people at the **Grind**-station, who immediately started wiping the cups dry before grinding the coffee into them.s

The next day, the second session went much better. We managed to get the average **Lead Time** down to 11 minutes and **Cycle Time** was stable at 8 minutes. No one waited more than 16 minutes for their coffee 💪.

At another workshop where we had only two AeroPresses, one scale and one coffee mill, it was amazing to watch the participants spend the resulting, system-imposed slack time: Either the time was spent explaining new participants how their station works, onboarding them so to say, or it was spent improving the station, e.g. by cleaning up or stepping forward and improving their process. At no point, people were idling even though there would have been things to be worked on!

**Lesson Learned:** If you impose too much stress on a system like this, efficiency will plunge, while effectiveness at the same time can't possibly improve.

### Insight #2: Stop The Line, be it on-demand or regularly

After the situation that lead to the first insight, I decided to inject regular reflection meetings after every 5 minutes. The **Stop The Line**-moment never came organically by someone from the trenches, but as soon as we started having those quick "daily standups", collaboration visibly improved!

Suddenly we were discussing micro-optimizations to the process the participants thought up in the previous five minutes and implemented them right away. After five minutes, we reiterated over the optimization and discussed further changes.

Once a station seemed to be overwhelmed with work, thereby risking to run at full capacity and loosing its slack, the participants would reassign themselves to help out at that station.

The **Heating**-station, tasked with supplying a steady stream of teapots with hot water from the otherwise unused coffee machine (😅) to the **Brewing**-station, discussed demands and adjusted their WIP limits so that water is delivered at the best temperature.

**Lesson Learned:** Retrospectives (or Daily-Standups!) are necessary means to encourage stepping out of the trenches and reflect on the collaboration itself. Regular check-points for introspection will lead to smaller optimizations that steer towards more productivity.

Related to this insight: [*From The Toolbox: Everything Needs A Retrospective*]({% link _drafts/ftt-everything-needs-a-retrospective.md %})

### Insight #3: Encourage self-organization, make conscious decisions

As mentioned already, at the ProductCamp Berlin, we had to run the workshop with very limited resources. In particular, having only one scale was problematic, as it had to be used at the **Grind**-station to weigh the beans and at the **Brew**-station to pour the right amount of hot water.

With enough slack at hand, one worker at the **Brew**-station thought of the following improvement: Instead of measuring the hot water by weight, thus having to wait for the scale to be available, they would instead remember the water levels required for "blooming" and for the full pouring. They announced it and we came to the conclusion, that this is a pragmatic improvement to the process that would only marginally impact the quality of the coffee. With the scale now being required by only one station, the flow drastically improved and the factory floor got noticeable calmer. The coffee kept being delicious - I personally verified that!

**Lesson Learned:** Pragmatic decisions can be made from the team members, if you let them. Facilitate these decisions to be made consciously, instead of impromptu.

## A simulation with a nice side-effect

I consider the time and money I spent on creating *Coffee Kanban* well spent. Not just did teach more people than ever how to make good coffee using an AeroPress, but we also simulated a Kanban system, packed with valuable insights about process management, collaboration and agile principles. And of course, the conference attendees and I had great coffee made for us!

There are more simulations like *Coffee Kanban* out there, such as [getKanban](https://getkanban.com/), the [Kanban Pizza Game](https://www.agile42.com/en/training/kanban-pizza-game/) or [FeatureBan](https://www.agendashift.com/featureban), that I'm eager to take a look at and to try them out at another conference, but I'm also really satisfied with the insights we gathered through these workshops at Leanovate, SoCraTes 2018 and the ProductCamp Berlin 2018.

I'm not surprised that coffee making proved to be such a great topic for the workshop, mostly because it's something a lot of people know, do or at least see every day. It's fascinating to me to see how the process changes as you scale it from me preparing my morning coffee to serving it to dozens and hundreds of customers in a café; how some shops focus on the artisan qualities of hand-brewed coffee, while others scale towards lower **Lead Times** and compensate the lesser quality with lifestyle aspects and fancy toppings.

I'm equally unsurprised that this has been picked up by more people fond of agile principles  and process management, like [Samir](https://twitter.com/SamirTalwar), who has written more on this in "[A Continuous Flow Of Coffee
](https://monospacedmonologues.com/2018/01/a-continuous-flow-of-coffee/)". I suggest you pour yourself another cup and head over to his blog!

[^1]: I only pictured 12 of the 13 steps above, because aligning 13 elements in a grid never looks good and the only missing one is the last one asking to "Serve The Coffee".

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
