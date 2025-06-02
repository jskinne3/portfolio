const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("screen.css");
  eleventyConfig.addPassthroughCopy("print.css");
  eleventyConfig.addPassthroughCopy("old_main.css");
  eleventyConfig.addPassthroughCopy("old_blog.css");
  //eleventyConfig.addPassthroughCopy("**/*.woff2"); // broken
  eleventyConfig.addPassthroughCopy("fonts/*.woff2");
  eleventyConfig.addPassthroughCopy("img/*.jpg");
  eleventyConfig.addPassthroughCopy("img/*.png");
  eleventyConfig.addPassthroughCopy("img/*.gif");
  eleventyConfig.addPassthroughCopy("vid/*.mp4");
  eleventyConfig.addPassthroughCopy("_redirects");

  eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "John Skiles Skinner",
			subtitle: "Now is the website of our discontent",
			base: "https://johnskinnerportfolio.com/",
			author: {
				name: "John Skiles Skinner",
			}
		}
	});

  // As suggested by https://11ty.rocks/eleventyjs/dates/
  const { DateTime } = require("luxon");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });


  return {};
};
