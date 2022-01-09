const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require("markdown-it-anchor");
const markdownItEmoji = require("markdown-it-emoji");
const slugify = require("slugify");

const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
    class: "anchor",
    symbol: "<span hidden>#</span>",
    style: "aria-labelledby",
});

const markdownItAnchorOptions = {
    level: [2, 3],
    slugify: (str) =>
    slugify(str, {
        lower: true,
        strict: true,
        remove: /["]/g,
    }),
    tabIndex: false,
    permalink(slug, opts, state, idx) {
        state.tokens.splice(
            idx,
            0,
            Object.assign(new state.Token("div_open", "div", 1), {
            // Add class "header-wrapper [h1 or h2 or h3]"
            attrs: [["class", `heading ${state.tokens[idx].tag}`]],
            block: true,
            })
        );
        state.tokens.splice(
            idx + 4,
            0,
            Object.assign(new state.Token("div_close", "div", -1), {
            block: true,
            })
        );
        linkAfterHeader(slug, opts, state, idx + 1);
    },
};

let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true, 
}).use(markdownItAttrs, markdownItEmoji, markdownItAnchor, markdownItAnchorOptions);

module.exports = function  (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addWatchTarget("./src/sass/");
    eleventyConfig.addPassthroughCopy("./src/assets/");
    eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.setDataDeepMerge(true);
    
    return {
        dir: {
            input: "src",
            output: "public",
            layouts: '_layouts',
        },
        templateFormats: [ "md", "njk", "html", ],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    }
}