module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("blogscreen.css");
  eleventyConfig.addPassthroughCopy("blogprint.css");
  //eleventyConfig.addPassthroughCopy("**/*.woff2"); // broken
  eleventyConfig.addPassthroughCopy("fonts/*.woff2");
  eleventyConfig.addPassthroughCopy("**/*.jpg");

  return {};
};
