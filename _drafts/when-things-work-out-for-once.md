---
layout: post
title: "What happens when things work out for once"
---
<TODO>
Image of Donuts? *Blatantly stealing Lara Hogan's celebration donuts for this one*
</TODO>
<TODO>
Alternative titles:
- Four stories of success
- Looking back and smiling
- Tales of succeeding for once
- Four tales with a happy ending
</TODO>

Being around in the industry for 10 years and having worked for companies of all sizes, from my 4-ppl startup working from a corner office that was let to us for free to enterprises where it took two months for me to get local admin rights on my machine, I have lots of anecdotes of things going awfully wrong.

This is not a blogpost about those kinds of rants though, but about the times where things just worked out; where the team was great, where we had buy-in from management and where a courageous move paid out at the end.

## No. 1 - A less-dumb click dummy

<TODO> Picture of a crashtest dummy in an anthropomorphic setting?</TODO>

The first tale is the oldest one as it happens. Back when I funded a B2B startup with three colleagues, one of them being my favorite product person I ever worked with, [Delia](), we spend a considerable amount of our time finding the right market fit by visiting companies, showing them our solution and convince them to become our alpha partners.

The challenge we found ourselves confronted with was, that the end-product had to be rock-solid software that would fit into existing enterprise landscape of the target group we were aiming for. Very early, that meant WAR-files that could be deployed to application servers and database abstractions that allowed us to talk to any of the prominent enterprise database out there.

These requirements made it hard for us to show off something when we were visiting the client, because developing in this environment doesn't really allow for too much prototyping or spiking and the deployment wasn't that straightforward either.

At the same time, those of us doing sales would've loved to go the extra mile and show our potential customers how the software could look like if it were in use in their company already, but customizing wasn't easy either.

During that time, *PayPal* released [krakenjs](http://krakenjs.com/), the first abstraction on top of express that I looked into until then. I gave it a try and ported all "clickable" features of our software at its current state back then to NodeJS, but without all the care that we put into resilience, error handling. As the title of this tale implies, it was a less-dumb click-dummy with some persistence and more than just a demo-path that was working.

The ease of setting up a NodeJS app suddenly allowed us to keep different branches of this prototype for different clients. Before a meeting, every one of us was able to swap out the logo and colorscheme to match the clients brand by editing a few files and restarting their local server.

Now whenever we came up with a new idea for a feature, we implemented it in the prototype first, ran it through our clients and fed the results back into the fully-fledged software.

## No. 2 - Building a skateboard first

## No. 3 - Why persist what you can calculate

## No. 4 - Eat your own dog-food
