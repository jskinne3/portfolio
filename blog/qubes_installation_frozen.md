---
tags: posts
layout: blog.njk
title: Qubes installation frozen
description: And un-sticking it with kernel-latest
date: 2025-09-06T12:00:00
---

# {{ title }}
## {{ description }}

John Skiles Skinner \
{{ date | postDate }}

---

Today I installed Qubes for the first time! Here are symptoms of a problem I encountered. The solution was to reinstall with the `kernel-latest` option rather than the default.

### Problems I saw

Installing Qubes onto a Framework laptop from a USB drive I encountered a few different versions of a frozen or stalled screen. Freezing happened after [initial setup](https://www.qubes-os.org/doc/installation-guide/#initial-setup) step. Upon reboot and entering my disk password it would freeze again. Here are variations I saw:

1. Text output getting stuck just after this message:
    ```
    Started accounts-daemon.service - Accounts Service
    ```

2. A progress bar, which appears to indicate the disk unencrypting, freezing after reaching 100%

3. A screen totally black except for a single flashing white line (a cursor?) at the very left edge of the screen, upper corner

### My solution

To solve the problem, I booted again from the USB drive to reinstall Qubes. At the installer screen I picked:
```
Install Qubes OS Rx.x.x using kernel-latest (x.x.x-x.qubes.fcxx)
```

(Note that my previous, non-working installation was, per [the instructions](https://www.qubes-os.org/doc/installation-guide/#getting-to-the-boot-screen), done instead with the "test media and install" option from this screen.)

While reinstalling with kernel-latest I saw a warning that free hard drive space for the reinstall was unavailable. I was guided to delete and reclaim space from the prior, nonworking installation of Qubes with the "delete all" button &mdash; but obviously don't do this if you have anything of value on your hard drive. After completing the reinstallation, I was able to use the Qubes desktop.

I think this works because the newer kernal [supports newer hardware](https://forum.qubes-os.org/t/what-is-the-point-of-not-choosing-the-latest-kernel-in-the-installation-process/17968). In particular some GPU or display-related hardware appears to have been the hitch in this case. This solution came from [apparatus](https://forum.qubes-os.org/t/i-type-my-disk-password-in-then-just-stuck-on-loading/29013/26?page=3) on the Qubes OS forum, so thank you to that user.
