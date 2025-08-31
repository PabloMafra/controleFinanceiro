const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const config = getDefaultConfig(__dirname);

config.resolver.blockList = exclusionList([
  /node_modules\/ws\/.*/,
]);

config.resolver.extraNodeModules = {
  stream: require.resolve("stream-browserify"),
};

module.exports = config;
