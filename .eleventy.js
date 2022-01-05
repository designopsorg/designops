const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")

module.exports = function  (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addWatchTarget("./src/sass/")
    eleventyConfig.addPassthroughCopy("./src/assets/")
    
    return {
        dir: {
            input: "src",
            output: "public",
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: [ "md", "njk", "html", ],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    }
}