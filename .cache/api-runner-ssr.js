var plugins = [
  {
    plugin: require("C:/Users/anmol/OneDrive/Anmol-OneDriveDocs/Documents/GitHub/prize-website/node_modules/gatsby-plugin-styled-components/gatsby-ssr"),
    options: {
      plugins: [],
      displayName: true,
      fileName: true,
      minify: true,
      namespace: "",
      transpileTemplateLiterals: true,
      pure: false,
    },
  },
  {
    plugin: require("C:/Users/anmol/OneDrive/Anmol-OneDriveDocs/Documents/GitHub/prize-website/node_modules/gatsby-plugin-react-helmet/gatsby-ssr"),
    options: { plugins: [] },
  },
  {
    plugin: require("C:/Users/anmol/OneDrive/Anmol-OneDriveDocs/Documents/GitHub/prize-website/node_modules/gatsby-plugin-manifest/gatsby-ssr"),
    options: {
      plugins: [],
      name: "Penn Climate Ventures Prize7",
      short_name: "PCV Prize",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#3083BC",
      display: "standalone",
      icon: "src/images/favicon.png",
      legacy: true,
      theme_color_in_head: true,
      cache_busting_mode: "query",
      crossOrigin: "anonymous",
      include_favicon: true,
      cacheDigest: "de72ab87ffe040503edf45985985a0a0",
    },
  },
];
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`);

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api);
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map((plugin) => {
    if (!plugin.plugin[api]) {
      return undefined;
    }
    const result = plugin.plugin[api](args, plugin.options);
    if (result && argTransform) {
      args = argTransform({ args, result });
    }
    return result;
  });

  // Filter out undefined results.
  results = results.filter((result) => typeof result !== `undefined`);

  if (results.length > 0) {
    return results;
  } else {
    return [defaultReturn];
  }
};
