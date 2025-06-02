---
tags: posts
layout: blog.njk
title: "Ship of Theseus beats strangler fig"
description: Parasitic plants are not as popular as boats 🌱⛵
date: 2024-10-22T12:00:00
---

# {{ title }}
## {{ description }}

John Skiles Skinner \
{{ date | postDate }}

---

Blogger Martin Fowler [observed a software pattern](https://martinfowler.com/bliki/StranglerFigApplication.html) that he named the *strangler fig pattern*. I think his observation is astute but the name is bad. I have been experimenting with the name *Ship of Theseus pattern*. I believe it is better.

---

Fowler's main idea is simple: You shouldn't try to replace a software system all at once, like a lightbulb. This is likely to fail. Instead, you should replace it gradually. 

The truth of this observation is pretty obvious if you are a software engineer who has done a few modernization projects. But your clients lack that experience, so the observation must be explained to them. A metaphor would be useful for this.

The metaphor Fowler offers is a parasitic plant, the strangler fig, which gradually kills a host tree until the fig grows in the tree's place. Though this metaphor has become common in software, in my work the strangler fig is a *lousy* way to sell gradual replacement to clients. The plant itself is unfamiliar; explaining it is a drag. I think this metaphor confuses and scares clients. It makes them want to say no.

Further, the metaphor's meaning is confused even among engineers. After Fowler coined the term, *strangler fig pattern* acquired a new meaning that Fowler didn't write about: wrapping. For example, Sam Newman [defines the strangler fig pattern](https://samnewman.io/patterns/refactoring/strangler-fig-application/) as new a system that "wraps around" the old one, "intercepting calls to old functionality, and redirecting those calls to the new system as that functionality is ported." I have also heard the inverse: the strangler fig wraps new API calls and redirects them to the old system's features. These definitions make *strangler fig pattern* into an approximate synonym for [facade pattern](https://en.wikipedia.org/wiki/Facade_pattern) or [adapter pattern](https://en.wikipedia.org/wiki/Adapter_pattern).

While wrapping may be a useful technique in a software modernization project, it is not what Fowler actually wrote about. He wrote about any process of incremental replacement; he was not prescriptive about the technique.

![A strangler fig wrapping a boulder](https://upload.wikimedia.org/wikipedia/commons/a/af/Strangler_fig_boulder_katandra.jpg)

I think this drift in meaning may have come about because the literal strangler fig tree does wrap around its host tree. This botanical fact has distracted from the original intent of the metaphor. But, another fact presents a *far larger* problem: strangulation is a terrifying act of violence.

Most people outside the tropics do not know what a strangler fig tree is, but everyone knows about strangulation, the crime. In a large majority of cases, it is a crime against women. Because I am a male engineer who has typically worked in a mostly-male software shop, I suspect I lack intuition on how menacing the "strangler" name may sound to clients and coworkers who are women. If you feel unaware of this, read [the introduction to *Down Girl*](https://books.google.com/books?id=Opc4DwAAQBAJ&pg=PA1) by Kate Manne on how strangulation is used to enforce misogyny.

Worse, a lot of people just call the pattern "strangler" with no "fig." Fowler has updated his writing to insist on always using the full name of the tree, but I don't think this helps much. The violent meaning of the word is too strong. I think we should feel very awkward saying "strangler" aloud to clients.

Listen: replacing legacy software systems is scary for people. Our clients' livelihood and wellbeing depend upon these systems. They often feel justified fear that the replacement will fail, making their lives worse. We should be sensitive to these fears in our language.

---

Moreover, we are not merely changing our users' software; we are asking *the people themselves* to change. Often more than we are aware.

We engineers remember what Fowler says about software; but not what he says about people:

> Threaded through all of this is broader organizational change. Legacy systems become rigid and brittle because the design thinking and organizational processes that produced them built them that way. If there's no change in organizational culture and leadership, the new systems will end up in a similar mess. So we also need to introduce new development practices, including reorganizing the development organization and its connections with the wider business in recognition of [Conways Law](https://martinfowler.com/bliki/ConwaysLaw.html).

A software system in use is inseparable from its social context; it is a [sociotechnical system](https://en.wikipedia.org/wiki/Sociotechnical_system). The social component will have to be modernized along with the code. Fowler notes the need for new dev practices; I will add that IT, security, and administrative practices must also grow and change. All users, actually.

I have noticed that much user behavior in legacy systems consists of workarounds to the flaws in the system. At the outset of modernization, those workarounds will appear to be user requirements. We can only distinguish these false user requirements from real ones by a process of gradual unwinding. Thus, in sociotechnical systems, gradual replacement is the only replacement. People never change like a lightbulb.

It is easy for users to see what they stand to lose from change; illustrating what they stand to gain is harder. The metaphor of the strangler fig encourages users to identify with the struggling tree at center. By focusing on loss, it makes change unappealing. This is a big miss, because gradual change *should* be the *easiest* kind to sell. What we need is a better metaphor.

Though I am unsure how many people know of the ancient Ship of Theseus, I daresay it is more widely known than the strangler fig tree. For the unaware, the ship was replaced [like this](https://en.wikipedia.org/wiki/Ship_of_Theseus#History):

> they took away the old planks as they decayed, putting in new and strong timber in their places, insomuch that this ship became a standing example among the philosophers, for the logical question of things that grow

This goofy boat has worked as an example of incremental replacement for much longer than the fig tree metaphor. It works fine for a software system. It allows us to say: we will fix your ship but keep the same crew, the same mission. There is no need for the crew to swim while their ship is wholly replaced.

Thus the ship allows us to tell a story with far more positive emotional implications than any story about a parasite. It helps our clients and partners face change, excited about what they will gain.

Philosophers employ the Ship of Theseus as a metaphor for growth, like human growth. Software engineers want this meaning as well, because we are asking people to grow. We invite our partners to rebuild the Ship of Theseus with us, and to be transformed by it.

![Ivan Konstantinovich Aivazovsky's painting of a ship](https://upload.wikimedia.org/wikipedia/commons/3/37/Aivazovsky_-_Sea_coast_at_night._Near_the_beacon.jpg)

### Credit

My coworker [Laura Nash](https://18f.gsa.gov/author/laura-nash/) suggested the term Ship of Theseus to me when I was complaining about the strangler fig name. I found that others — among them [Nicolas Carlo](https://understandlegacycode.com/blog/ship-of-theseus-avoid-rewrite-legacy-system/), [Matt Eland](https://matteland.medium.com/the-software-of-theseus-5a826effcd3), [Brian Bassett](https://corgibytes.com/blog/2018/01/15/theseus-paradox-software/), and [Sharon Stern](https://noti.st/sharonstern/3s9Qo5/slides) — have used the term in a similar way.

I added Ship of Theseus as an alternative name of this pattern on Wikipedia, citing Carlo. As a personal blog is not considered a reliable source by Wikipedia, I would appreciate it if someone (you?) would use this term in a book that I could cite.

Thanks also to [Bret Mogilefsky](https://18f.gsa.gov/author/bret/) for pointing out the resemblance to the facade and adapter patterns. Finally, thanks to [Caley Woods](https://www.linkedin.com/in/caleywoods/) for reminding me that the right metaphor can refocus the conversation from loss to gain.
