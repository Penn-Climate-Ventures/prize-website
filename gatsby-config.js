module.exports = {
  siteMetadata: {
    title: "PCV Prize Competition",
    description: "Penn Climate Ventures. Catalyzing climate action.",
    author: "PCV",
    keywords: [
      "competition",
      "pitch",
      "prize",
      "climate",
      "environment",
      "startup",
      "venture",
      "tech",
      "Penn",
    ],
    image: "/web_preview.png"
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Penn Climate Ventures Prize",
        short_name: "PCV Prize",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#3083BC",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/favicon.png" // This path is relative to the root of the site.
      }
    }
  ],
};
