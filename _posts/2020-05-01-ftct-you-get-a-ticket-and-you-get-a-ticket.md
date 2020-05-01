---
layout: post
tags:
- From The Community Toolbox
title: 'From The Community Toolbox: You get a ticket! And you get a ticket! Everyone
  (hopefully) gets a ticket!'
image: assets/ftct-you-get-a-ticket-and-you-get-a-ticket.jpg
image_alt: A lot of little lottery tickets in a pile
date: 2020-05-01 16:39 +0200
---
Organizing the lottery is probably the biggest task in the weeks before SoCraTes Day Berlin. But it's also the one where I can make a difference by extending a special invitation to people of underrepresented minorities and to those who have to make plans long beforehand. Here's how I create a reasonably fair lottery.

This post is part of a series I call "*From The Community Toolbox*". I hope it serves both people who want to join us at SoCraTes Day Berlin but would like to know what they're getting into first, and those who'd like to create something like SoCraTes Day Berlin themselves.

<hr/>

## Why the complexity anyway?

A lot of community events are working with lotteries to distribute their tickets (e.g. [SoCraTes Germany](https://socrates-conference.de/home)). Unlike commercial conferences, there's no need for price differentiation techniques like early bird tickets as the overall cost is fairly low (a ticket at SoCraTes Germany only pays for your hotel stay + the conference setup); no-shows have little impact on the overall cost of the event and not selling out isn't bad at all, as long as the venue swallows the opportunity costs of an empty hotel room.

Usually though, community events attract way more people than they have tickets to sell (especially if they're cheap), and marketing efforts are run by volunteers like me who can only put in so much work at once and thus only reach a smaller number of people outside of the communities. If I were to sell your tickets in FCFS (first-come-first-serve), I would put those at an advantage who've been following me before (and those with a faster internet connection). 

As I further want to employ affirmative action to counteract systemic discrimination, I want to offer extra tickets for members of disadvantaged groups. On top of that, I want to extend my invitation to people outside our local community. As they usually need to plan their travels long time in advance, they should thus get a ticket as soon as possible – another dimension that adds complexity to the already difficult job of selling the tickets!

## The parameters of a "fair" lottery

The cost of a ticket can be fairly difficult to assess for conferences that involve accomodation or any general service (such as conference setup). For SoCraTes Day Berlin, there are only neglectable costs as the venue and food is provided by our sponsor (usually [Leanovate](https://www.leanovate.de/)), so I generally sell free tickets with a deposit of 15€ to avoid no-shows and to recoup smaller costs like Post-Its or name tags.

So ignoring any cost calculations, a lottery has the following parameters:

- The maximum occupancy of the venue `T` (e.g. `50`).
- The number of tickets I want to set aside for affirmative action `A` (e.g. `20`).
- The number of tickets I want to set aside for people travelling from afar `B` (e.g. `10`).
- The number of tickets available to anyone `C` with `A+B+C=T`.

With these in mind, there are a few decisions regarding the lottery that I had to make 

(`#A` denotes the number of applicants, `A` the maximum number of tickets for that bucket):

- **Both people travelling from afar and those applying for diversity tickets enter the general lottery as well**  
This means that no matter how many people apply in either category, their chance of winning a ticket will always be higher than for the general group. If there's a surplus of applications in e.g. group `#A`, not only have my marketing efforts worked, but so did affirmative action, and I wouldn't want to send those people away.
- **You can enter both groups and thus will qualify for all ticket buckets**  
In the unlikely chance that this will become the majority of ticket holders, it's still better to adjust the `A` and `B` variables than to dismiss the overall practice. Affirmative action working out to level the playing field is exactly what we're working towards to, and people arriving from afar contribute a lot to the local community!
- **The general ticket bucket will be depleted first**  
Otherwise, you'd sell out your special tickets first and people applying for either `A` or `B`, in particular those joining the lottery after the first run, would only enter the general bucket. If you have a lot of applicants who only enter the general lottery, you'd end up almost completely removing the affirmative action part (except for the number of tickets `A` and `B`). Running a few simulations, I deemed it most "fair" to deplete the general bucket first and only then apply the second lottery.
- **You have 72 hours to confirm your attendance**
This is so that I still fill up as many seats as possible. After every 72 hours, I run another lottery to distribute the unclaimed tickets. This is a constant effort for the two weeks right before the conference.
- **You can cancel your attendance up to 24 hours before the conference starts**
The only variable cost occuring is the lunch order and 24 hours is the window our caterer gives us in which we can still adjust the order. Again, I'm sort of exploiting the system as this is the only actual cost of a no-show. Usually there are enough people on the waiting list who happily take the ticket, even 24 hours before the conference starts!

## Running the lottery

With the waiting lists hopefully overflowing, it's time to run the first lottery!

1. **General lottery run**  
Randomly draw `C` people out of the complete pool of applicants. These are the winners for the general ticket bucket. Remove those who won a ticket from the pool of applicants (and for the run in #2). The probability to win in this round is the same for everyone: `p = C/(#A+#B+#C)`

2. **Special lottery runs**  
Randomly draw `A` (resp. `B`) people out of the `#A` (resp. `#B`) group of applicants. Remove those who won a ticket from the pool of applicants. The probability to win in these rounds is `p = A/#A` resp. `p = B/#B`.

The chances of winning a ticket in the first lottery run will thus be `p_general = C/(#A+#B+#C)` for someone only applying for the general bucket and `p_group-a = C/(#A+#B+#C) + A/#A` resp. `p_group-b = C/(#A+#B+#C) + B/#B` for those applying for one of the extra buckets, and finally `p_group-a-b = C/(#A+#B+#C) + A/#A + B/#B` for someone applying for both extra buckets.

In case someone cancels their ticket or does not confirm their attendance, the ticket is returned to its original bucket. 

For SoCraTes Day Berlin 2018, I created a script that completely automates this process for me. In case you want to provide full transparency to your attendees, it can work with deterministic randomness and mask the email addresses to preserve anonimity. [It's available on GitHub](https://github.com/rradczewski/socratesdayberlin2018_lottery).

The script allows me to run simulations to get a feeling for the "fairness" of the algorithm and to show how effective it can be. Here's an example of 1000 simulations for a lottery with the ticket allocations as above:

| Category | Number of tickets | Number of applicants | Number of people competing in the bucket | Probability of winning a ticket in 1000 simulations | 
| -------- | ----------------- | -------------------- | ------------------------------- |
| **General** | 20 | 100 | 140 | 18.203% |
| **Diversity** | 20 | 20 | 30 | 83.77%* |
| **Journey** | 10 | 10 | 20 |  59.01%* |
| **Diversity & Journey** | - | - | 10 | 91.41% |

<small>\* The number is not 100% due to those applying for both groups (see last row). As they enter all three lotteries, their chance of winning is comparatively high</small>

The end result with a full waiting list will converge to match the original allocation of tickets to the specific buckets, the difference really only comes into play if the waiting lists aren't evenly filled up. For example, if I get fewer applicants than tickets allocated for the general pool when I run the lottery for the first time, by depleting it first I will not deplete the extra buckets completely but leave extra slots for people applying in the extra groups. Thus, even in later runs, people traveling from afar will still get a ticket quicker so they can make plans, and I have extra time for marketing efforts and reach-outs to communities of which people would apply for diversity tickets.

I've been running the lottery like this for every edition of SoCraTes Day Berlin and I'm very happy with the results. We always had several late cancellations which I could easily fill from the waiting list and both the affirmative action and the advantage given to those travelling from afar have made the event a better event in every regard.