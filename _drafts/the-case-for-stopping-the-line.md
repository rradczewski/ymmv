---
layout: post
title: "Coffee Kanban & the case for stopping the line"
image: /assets/the-case-for-stopping-the-line.jpg
image_alt: "An aeropress coffee maker in front of a tea pot"
excerpt: "At multiple occasions this year, I ran a workshop that combined two of my dearest topics: Coffee and Kanban. I got consultants, developers, testers and product managers to work together to optimize the flow of coffee. My most interesting insight? In any flurry of activity, you should make people feel comfortable enough to stop the line."
---
*<small>Cover photo by [Daniel Temme](https://twitter.com/dtemme)</small>*

{{ page.excerpt }}

## What is Coffee Kanban?

The Coffee Kanban workshop was the brainchild of my preparation for my favorite conference of each year, the [SoCraTes 2018](https://www.socrates-conference.de/) unconference held in Soltau in the north of Germany.

Just like every year, I packed all my coffee equipment and got some fresh coffee beans from my local roasters to share with the other attendees, and so did others. Between us, we must have had about 5 kilos of delicious third wave coffee and every conceivable method of brewing it.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Some more to be jealous about <br>You missed the coffee Kanban <a href="https://twitter.com/hashtag/socrates2018?src=hash&amp;ref_src=twsrc%5Etfw">#socrates2018</a> <a href="https://t.co/sc0JZ5GY61">pic.twitter.com/sc0JZ5GY61</a></p>&mdash; nat ann (@AnnNat) <a href="https://twitter.com/AnnNat/status/1033015354967121921?ref_src=twsrc%5Etfw">August 24, 2018</a></blockquote>

There has always been a tradition for this kind of coffee co-creation at SoCraTes. In previous years, many attendees were itching to learn how to make a good coffee themselves. But with the seasoned baristas rushing from session to session, it was difficult to get the on hand expertise to make that perfect cuppa.

Now luckily, we can blend this grave deficiency with the coincidence that I’m very fond of Kanban and I’m even more curious about its origins in manufacturing. And with that, the idea was born to create a coffee manufacturing line utilizing Kanban principles. Unlike with the other workshops I give, I didn’t have a specific goal in mind. This was about the interesting challenge of the design process and a keen lookout for applicable product development insights!

After running the workshop a couple of times now, I’m convinced that it didn’t merely teach people how to brew better coffee. The workshop also helped us understand how to continuously improve a moving system and to pay attention and prioritise its component parts.

## Designing the factory floor

The one thing I find most challenging about mentoring is teaching something that is second nature after doing it hundreds of times. Coffee making is one of these - every morning, every move I make is on point:  
From first weighting the water so it can heat while I weigh and grind the beans to preparing the AeroPress. To slightly tilting and then lifting the stamp after pouring the water to create suction that will keep the water inside the AeroPress - each of these moves happens subconsciously, as if in a trance. But, explicating each of those steps didn’t come easy to me and it makes for quite a particular process.

{% include responsive-image.html image="assets/coffee-kanban-cards.jpg" classes="no-decoration" image_alt="The station descriptions of every station used in coffee kanban, from weighting and grinding the beans to blooming the coffee a bit and then pouring the rest" %}

In fact, I ended up with 13 distinct steps[^1] that I turned into index cards. These would serve as the **Stations** of the factory floor, with people being assigned to one station at any given time.

## Insights from the workshops at Leanovate, SoCraTes 2018 & ProductCamp Berlin 2018

I owe a big **Thank You** to [Leanovate](https://www.leanovate.de/) for letting me crash yet another one of their company-internal LeanovateDays to test-drive this workshop and for their invaluable feedback. We ended up causing a right mess in their kitchen after lunch. But after the chaos, the retrospective provided me with so many things to revisit that it really helped flesh out the workshop right in time for the first upcoming public run.

{% include responsive-image.html image="assets/coffee-kanban-order-cup.jpg" image_alt="The cup we used for Coffee Kanban with an order sticker on it that has the name of the customer, their order, the start and finish time on it." %}

For SoCraTes 2018, I iterated over the station setup, aggregating them so a person was assigned to a station, such as **Grind** or **Brew**, each with around 4 distinct but related tasks. I further designated the cups to be the “kanban container”, the item that flows through the system. To keep track of the orders flying in and their metrics, I added an order-sticker to keep which would pass from station to station.

We set up the factory floor where we always put our coffee gear, right in the hallway where people could order a coffee before they go to another session. The session on Friday turned out to be so interesting that we ran another one on Saturday. We made sure to measure both **Cycle Time** (the time it takes to brew a coffee, from grabbing the order cup) and **Lead Time** (the time it takes from ordering to receiving the coffee).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/socrates2018?src=hash&amp;ref_src=twsrc%5Etfw">#socrates2018</a> the awesome <a href="https://twitter.com/rradczewski?ref_src=twsrc%5Etfw">@rradczewski</a> prepped the a super cool workshop about coffee and kanban. Don’t miss it! <a href="https://t.co/dBe9eRhxoF">pic.twitter.com/dBe9eRhxoF</a></p>&mdash; Benjamin Reitzammer (@benjamin) <a href="https://twitter.com/benjamin/status/1032892909874499585?ref_src=twsrc%5Etfw">August 24, 2018</a></blockquote>

Let me spill the beans to you right away: Putting it mildly, we were rather slow in the first session. Average **Lead Time** was about 18 minutes, even though the **Cycle Time** floated around at about 9 minutes. One poor soul even had to wait 40 minutes for their coffee 😱.

But the first session was purely about experimenting with the format, so we didn’t take time to think and reflect about the intricacies of the process. For example, we picked orders at random, not by any measure of priority. We never made the conscious decision between prioritizing already late orders or dropping late orders to be quick with the orders still coming in. I was trying to assign people to the stations. I felt from the start that my presence on this role was ruining station self-organization.

As the stations built to full capacity and became overloaded, I couldn't keep up with the pace. I stopped in my tracks in a dizzy haze- there was no moment where someone of the team **Stopped The Line** to make the others aware of an issue they had.

<table class="collapsing-table">
<tr>
<td style="width: 50%; padding: 5px;">{% include responsive-image.html image="/assets/coffee-kanban-socrates2018-1.jpg" image_alt="the statistics for the first day" %}</td>
<td style="width: 50%; padding: 5px;">{% include responsive-image.html image="/assets/coffee-kanban-socrates2018-2.jpg" image_alt="the statistics for the second day" %}</td>
</tr>
</table>

### Insight #1: Optimizing for speed risks everything

The room was buzzing with noise and hectic movements, with people rushing to pick up an order and work on it but never paying close attention to the system load or the issues other stations had. There was one particular issue that stuck with me as it mirrored a typical dysfunctional organization as deadlines approach and everyone gets into tunnel vision and stops looking left and right:

At some point, the “customers” had to wash previously used cups in order to put in an order. More often than not, the cups - our designated kanban container - would still be wet inside. The **Grind**-station dutifully grinded the beans directly into the cup. Once they were done, they placed the cup in their output queue and moved on to the next order.

As the **Preparing**-station picked up the order, their next step would’ve been to pour the ground coffee from the cup into the AeroPress, but they struggled with the coffee sticking to the wet cup. They helped themselves with a spoon, but they lacked the space to give feedback to the **Grind**-station. Purely by chance, I became aware of the issue and made sure to mention it to the people at the **Grind**-station, who immediately started wiping the cups dry before grinding the coffee into them.

The next day, the second session went much better. We managed to get the average **Lead Time** down to 11 minutes and **Cycle Time** was stable at 8 minutes. No one waited more than 16 minutes for their coffee 💪.

At another workshop where we had only two AeroPresses, one scale and one coffee mill, it was amazing to watch the participants spend the resulting, system-imposed slack time. Either it was spent explaining new participants how their station works, onboarding them so to say, or it was spent improving the station, e.g. by cleaning up or stepping forward and improving their process. At no point, people were idling even though there would have been things to be improved!

**Lesson Learned**: If you impose too much stress on a system like this, efficiency will plunge, while effectiveness at the same time can’t possibly improve.

### Insight #2: Stop The Line, be it on-demand or regularly

After the situation that lead to the first insight, I decided to inject regular reflection meetings after every 5 minutes. The **Stop The Line**-moment never came from the “factory floor", but as soon as we started having those quick “daily standups”, collaboration visibly improved!

Suddenly we were discussing smart micro-optimizations to the process that participants had thought up. We implemented them right away. After five minutes, we reiterated over the optimization and discussed further changes. No stone was left unturned.

Once a station seemed to be overwhelmed with work, thereby risking to run at full capacity and loosing its slack, the participants would reassign themselves to help out at that station.

For example, the people working at the **Heating**-station, tasked with supplying a steady stream of teapots with hot water from the otherwise unused coffee machine (😅) to the Brewing-station, took the time and discussed demands and adjusted their WIP limits so that water is delivered at the best temperature.

**Lesson Learned**: Retrospectives (or Daily-Standups!) are an important means to step out of the station silos and reflect on the working parts - collaboration itself. Those regular check-points for introspection will lead to smaller optimizations that steer towards more productivity.

Related to this insight: [*From The Toolbox: Everything Needs A Retrospective*]({% link _posts/2018-10-17-ftt-everything-needs-a-retrospective.md %})

### Insight #3: Encourage self-organization, make conscious decisions

As I mentioned already, at the ProductCamp Berlin, we had to run the workshop with very limited resources. In particular, having only one scale was problematic, as it had to be used at the **Grind**-station to weigh the beans and at the **Brew**-station to pour the right amount of hot water.

With enough slack time to reflect, one team member at the **Brew**-station thought of the following improvement: Instead of measuring the hot water by weight, thus having to wait for the scale to be available, they would instead remember the water levels required for “blooming” and for the full pouring. We discussed it and we came to the conclusion that this is a pragmatic improvement to the process that would only marginally impact the quality of the coffee. With the scale now being required by only one station, the flow drastically improved and the factory floor got noticeable calmer. The coffee kept being delicious - I was on hand to verify that ;)

**Lesson Learned**: Pragmatic decisions can be made from the team members, if you let them. Facilitate these decisions to be made consciously, instead of impromptu.

## A simulation with a nice side-effect

I consider the time and money I spent on creating *Coffee Kanban* well spent. Not only did it teach more people than ever how to make good coffee using an AeroPress, but we also simulated a Kanban system, packed with valuable insights about process management, collaboration and agile principles. And of course, the conference attendees and I had access to great coffee!

There are more simulations like *Coffee Kanban* out there, such as [getKanban](https://getkanban.com/), the [paper boat exercise](https://www.leanability.com/en/blog-en/2015/09/flow-exercise-building-paper-boats/), the [Kanban Pizza Game](https://www.agile42.com/en/training/kanban-pizza-game/) or [FeatureBan](https://www.agendashift.com/featureban), that I'm eager to take a look at and to try them out at another conference, but I'm also really satisfied with the insights we gathered through these workshops at Leanovate, SoCraTes 2018 and the ProductCamp Berlin 2018.

I’m not surprised that coffee making proved to be such a great topic for the workshop, mostly because it’s something a lot of people know, do or at least see every day. It’s fascinating to me to see how the process changes as you scale it from me preparing my morning coffee to serving it to dozens and hundreds of customers in a café; how some shops focus on the artisan qualities of hand-brewed coffee, while others scale towards lower **Lead Times** and compensate the lesser quality with lifestyle aspects and fancy toppings.

I'm equally unsurprised that this has been picked up by more people fond of agile principles and process management, like [Samir](https://twitter.com/SamirTalwar), who has written more on this in "[A Continuous Flow Of Coffee
](https://monospacedmonologues.com/2018/01/a-continuous-flow-of-coffee/)". I suggest you pour yourself another cup and head over to his blog!

[^1]: I only pictured 12 of the 13 steps above, because aligning 13 elements in a grid never looks good and the only missing one is the last one asking to "Serve The Coffee".

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
