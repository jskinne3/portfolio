---
tags: posts
layout: blog.njk
title: Qubes installation hitch
description: Stuck on accounts-daemon.service
date: 2025-09-06T12:00:00
---

# {{ title }}
## {{ description }}

John Skiles Skinner \
{{ date | postDate }}

---

Today I installed Qubes for the first time! Here are symptoms of a problem I encountered. The solution was to reinstall with the `kernel-latest` option rather than the default.

### Problems I saw

Installing Qubes onto a Framework laptop via a USB drive I encountered a few different versions of a frozen screen. Freezing happened after [initial setup](https://www.qubes-os.org/doc/installation-guide/#initial-setup) step, and after that, upon reboot and entering my disk password.

Sometimes I was seeing text output getting stuck just after this message:
```
Started accounts-daemon.service - Accounts Service
```

At other times I was seeing a progress bar advance, gradually reaching 100% and then nothing would happen after. The loading screen with the progress bar was frozen.

### My solution

To solve the problem, I booted again from the USB drive to reinstall Qubes. At the Qubes installer screen, where previously I had selected `Test media and install Qubes OS` I now selected:
```
Install Qubes OS using kernel-latest
```
(I have omitted the version numbers above)

Upon reinstalling, I saw a warning that free space for reinstall was unavailable. I was guided to delete and reclaim space from the prior, nonworking installation of Qubes. After completing the reinstallation, I was able to use the Qubes desktop.

I think this works because the newer kernal [supports newer hardware](https://forum.qubes-os.org/t/what-is-the-point-of-not-choosing-the-latest-kernel-in-the-installation-process/17968). In particular some display-related hardware appears to have been the hitch in this case. This solution came from user [apparatus](https://forum.qubes-os.org/t/i-type-my-disk-password-in-then-just-stuck-on-loading/29013/48?page=3) on the Qubes OS forum.
