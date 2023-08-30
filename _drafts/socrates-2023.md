---
layout: post
title: SoCraTes 2023 - SoCraTes is bowling today
image: "assets/socrates-2023-heute-kegelt-socrates.jpg"
image_center: true
image_alt: "A welcome sign from 2016/2017 at Hotel Park Soltau, welcoming us with the proclamation 'SoCraTes is bowling today', suggesting we'd use their bowling alley."
---
_After missing my first SoCraTes since 2014 last year, I couldn't have hoped for a better (albeit delayed) reunification with everyone in 2023_

It's been a fantastic experience returning to Soltau. It's not just all the people travelling there, but it's the familiarity with the space and the joy of discovering a hidden pathway I've never recognized, and the personell, who have been nothing but kind and accomodating to us, and of whom some have been there since the very beginning.

## Organizing food for 200+ people, or making it harder for those who do

This year, there have been 5 volunteers taking up the task of sorting out the food with the restaurant. It turned out to be just about enough, as our goal was very ambitious:

> To make sure that there's enough food for everyone despite allergies or dietary requirements, and to make it so they don't have to ask or wonder about allergies during the conference.

We had to assume that the hotel didn't have enough label stands to label all food. As someone who's always happy to justify his evergrowing obsession with 3d modelling and printing, I was happy to fire up the printers and print about 30 label stands. Other participants joined the effort, and we've ended up with more stands than we needed. I will recycle the stands at [https://recyclingfabrik.com/](Recycling Fabrik), hoping they won't end up in a landfill.

{% include responsive-image.html style="width: 30%" container_classes="right" image="assets/socrates-2023-label-stand.png" image_alt="The label stand we printed about 30 times, optimized to use as little plastic as possible." %}

The first meal provided a proper reality check for us though, as our involvement extended to be a 2+ hour effort every day, just to read ingredients off packaging and create labels from that, and I'm very grateful for the hotel staff who helped us with that, and in particular [Njan](https://chaos.social/@njan), who sacrificed a considerable amount of their conference to be extra thorough. 

It is obvious we need to change gears for next years, everyone involved agrees with that. Make the pain obvious, the coach in me says. Onto the next step then I sigh in response to that thought.

## Running a 3-node kubernetes cluster for a digital schedule web-app

Since the beginning of this year, [Chris](https://hachyderm.io/@krys) and I have been on a seemingly never-ending yakshave into kubernetes as part of a client engagement as Technical Agile Coaches. The yakshave involved [putting a kubernetes cluster and the infrastructure applications under test in a CI pipeline](https://gitlab.com/with-humans/devops-workshop/socrates/infrastructure/-/blob/main/.gitlab-ci.yml?ref_type=heads), testing out almost every ServiceMesh implementation there is (we ended up with [Linkerd](https://linkerd.io/)), adding observability ([LGTM](https://github.com/grafana)), a workflow runner ([Tekton](https://tekton.dev/)), an auth provider ([supertokens](https://supertokens.com/)) and finally glueing all of it together with IaC (using [pulumi](https://www.pulumi.com/)) and GitOps ([flux](https://fluxcd.io/)). At some point, we nested 2 layers of virtualization and 3 layers of docker daemons, an undertaking that I couldn't imagine working as flawless as it did.

{% include responsive-image.html style="width: 30%" container_classes="right" image="assets/socrates-2023-ping-screenshot.png" image_alt="The app we built in SvelteKit for the conference, showing a map of the venue and the next sessions." %}

This all ultimately served a purpose: We were honored to be trainers for this years training day, and the cluster served as the practical application of the principles we tought around **Continuous Delivery** and **Extreme Programming**. Unfortunately, the training turned out to be very compressed – the organizers apparently thought I was joking when we suggested we'd need 4-8 hours – and we ended up with only 1.5 hours 😬.

Not just for the workshop, but as a treat for SoCraTes, we've built a digital floor plan of the venue in SvelteKit (thank you [Daniel](https://www.linkedin.com/in/daniel-irvine/) for your book on testing svelte 😉) and integrated it with the digital schedule written by [Jay](https://github.com/jay-peper) and [Toni](https://github.com/offbyoni) which we hosted as well. 

The floor plan was built in a pipeline running on the cluster, was fully tested and progressively rolled out after the smoke tests passed. A full delivery pipeline run took less than 4 minutes to production, and as we of course have to practice what we preach, we've re-created the whole cluster from the ground the night before the conference. Our next goal will be to get the pipeline down to less than a minute – courtesy of our attention span not accomodating 4 minutes of watching a docker build anymore.

## Everything (else)

Apart from organizing a few things (although I decisively reject the title of an organizer as my involvement doesn't come anywhere close to what the "real" organizers pull off each year), there of course have been excellent sessions, hallway chats, rants and discoveries, which I will try to summarize as follows:

- Software Architect
- Michel Grootjans on Flow
- A new technique from Juke (numbering)
- CI/CD Workshop on Training Day
- Schedule making and K8s
- Ensemble Exploratory Testing
- Technical Agile Coaching
- Monorepos
- Trunk-based development