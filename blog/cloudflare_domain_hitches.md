---
tags: posts
layout: blog.njk
title: Cloudflare domain hitches
description: DNS and SSL certificate gottcha when finding a new home for a website
date: 2025-08-14T12:00:00
---

# {{ title }}
## {{ description }}

John Skiles Skinner \
{{ date | postDate }}

---

### Situation: moving to Cloudflare Pages

I wanted to replace a website and host the new one on Cloudflare Pages. So I hooked up my favorite static site generator, [Eleventy](https://www.11ty.dev/), to Cloudflare and started writing code. My work is deployed to `<project>.pages.dev` by Cloudflare. When the work is finished it's time to point the domain name away from the existing website, over to Cloudflare.

I used Clouflare's "Onboard a domain" tool. It imported `A` and `AAAA` records explicitly setting the IP address of the domain to the prior website's IP address. These seemed misleading to me, so I deleted them. I probably veered away at that point from the proper usage of the onboarding tool.

Instead I tried to manually set up what seemed to me the simplest configuration to launch the website, consisting of two parts:
1. Create a proxied CNAME DNS record in Cloudflare that points the domain name to `<project>.pages.dev` 
2. Point the registrar to Cloudflare's nameservers, replacing whatever nameservers the registrar was previously using

I was wrong! Here are the problems I experienced before I discovered the *secret third configuration step* I had missed:

### Problems: timeout and certificate errors

Once I changed the nameservers and that change propagated, the website was broken. Using https, a visitor to the domain name sees a certificate error. Using http, the visitor sees this 522 timeout error page:

![Connection timed out; Error code 522](/img/http522.png)

Further, within Cloudflare's SSL/TLS menu, under Edge Certificates, a certificate was stuck in the status "Pending Validation (TXT)" and was not resolving after 24 hours as it is supposed to. My attempts to push the validation along by creating the DNS TXT records it was asking for resulted in the error "An identical record already exists" in spite of the fact that no such record was visible.

### Solution: custom domain settings

I found the solution in these instructions on how to [add a custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#add-a-custom-domain).

The biggest trick is navigating to the right place. As [my friend Cassey points out](https://cassey.dev/static-sites-on-cloudflare/#ux-gotchas-on-cloudflare), the Cloudflare web UI is bifurcated: the settings for your site's code are difficult to reach from the domain settings, and vice versa. Knowing that, here's the tricky part: this step takes place *within the code part* of the UI, not the domain part.

1. Within the [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Click on "Compute (Workers)" on the left menu
3. Select "Workers & Pages"
4. From the list of Pages projects, the project you are working on. This is probably where you are accustomed to working with your code's deployments, but there is a secret domain-related thing here.
5. Find the tab at the top called "Custom domains"
6. Press the "Set up a custom domain" button:
  ![Set up a custom domain button within Compute (Workers) menu](/img/custom_domain_button.png)
7. Enter your domain name in the text box
8. "Activate domain" to accept the suggested DNS record:
  ![Activate custom domain button with a suggested CNAME root record](/img/activate_domain_button.png)

You should then see your domain name listed with:

🟡 Verifying

Which in a few minutes will become

🟢 Active

Shortly after this, the SSL certificate that was stuck on "Pending Validation (TXT)" changes to "Active"
