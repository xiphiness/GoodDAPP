const {
  addWebpackAlias,
  babelInclude,
  fixBabelImports,
  override,
} = require('customize-cra')

const path = require('path')

module.exports = {
  webpack:override(
    fixBabelImports('module-resolver', {
      alias: {
        '^react-native$': 'react-native-web',
      },
    }),
    addWebpackAlias({
      'react-native': 'react-native-web',
      'react-native-svg': 'svgs',  // not necessary unless you wanted to do this
    }),
    babelInclude([
      path.resolve('src'), // make sure you link your own source
      // any react-native modules you need babel to compile
      /react-native-/

    ]),
  ),
  jest:function(config) {
    config.preset = "react-native-web",
    config.transform['^.+\\.(js|jsx)$'] = 'babel-jest'
    config.transformIgnorePatterns = [
      'node_modules/(?!(jest-)?react-native|react-navigation|@react-navigation|react-navigation-redux-helpers|react-phone-number-input|webrtc-adapter)'
    ]
    config.moduleFileExtensions = [
      'web.js',
      'js',
      'json',
      'web.jsx',
      'jsx',
      'node'
    ]
    return config
  }
}