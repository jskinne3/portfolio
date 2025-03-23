const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("blogscreen.css");
  eleventyConfig.addPassthroughCopy("blogprint.css");
  //eleventyConfig.addPassthroughCopy("**/*.woff2"); // broken
  eleventyConfig.addPassthroughCopy("fonts/*.woff2");
  eleventyConfig.addPassthroughCopy("**/*.jpg");

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

  return {};
};
