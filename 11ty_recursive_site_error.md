---
layout: blog.njk
title: 11ty recursive _site error
description: Before today I blogged with raw HTML, like an animal. When I switched to Eleventy, I got an intriguing recursive error.
---

# {{ title }}

[John Skiles Skinner](https://johnskinnerportfolio.com/) \
9 October 2024

---

Before today I blogged with raw HTML, like an animal. This is my first post using Eleventy instead.

Although [getting started](https://www.11ty.dev/docs/) with Eleventy was pretty easy, I did encounter an error [adding assets](https://www.11ty.dev/docs/assets/), namely fonts. The error is recursive in nature, which always intrigues the particular subgenre of computer nerd to which I belong.

## My problem

The docs for Passthrough File Copy <a href="https://www.11ty.dev/docs/copy/#using-globs">imply that using globs</a> to specify my font files should be fine:
```
eleventyConfig.addPassthroughCopy("**/*.woff2");
```
With this line in my .eleventy.js file, `npx @11ty/eleventy` behaves strangely. Every time I run this command, it creates a new `_site` directory *within the previous one*:

* _site
  * _site
    * _site
      * _site
        * _site
          * _site

Wow it was fun to type out that silly nested list with just markdown. Thanks, Eleventy! Wish you were not lost in the sauce.

After adding another layer to the nested pile of directories, the `npx @11ty/eleventy` command then fails when trying to access a font file in the innermost directory:
```
1. Having trouble copying (via EleventyPassthroughCopyError)
2. Having trouble copying './**/*.woff2' (via TemplatePassthroughManagerCopyError)
3. Error copying passthrough files: ENOENT: no such file or directory, open '_site/_site/_site/_site/_site/_site/fonts/Duospace-Italic.woff2' (via TemplatePassthroughError)
4. ENOENT: no such file or directory, open '_site/_site/_site/_site/_site/_site/fonts/Duospace-Italic.woff2'
```
Notice the many nestings of the `_site` directory in that error message!

You can view my Eleventy configuration file and other code [in GitHub](https://github.com/jskinne3/portfolio). I encounter the problem in both v2.0.1 and the latest, v3.0.0 of Eleventy.

## My solution

My solution was to specify the folder my fonts live in by name, eliminating the double asterisks glob notation:
```
eleventyConfig.addPassthroughCopy("fonts/*.woff2");
```

My friend [Cassey Lottman](https://cassey.dev/) opened [an issue about this problem](https://github.com/11ty/eleventy/issues/3475) in the Eleventy GitHub repo. Thanks Cassey!
