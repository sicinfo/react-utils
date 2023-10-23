const path = require("path");

module.exports = (
  /** @type {any} */ env
) => {

  const { production = false, clean = false } = env;

  const mode = production ? 'production' : 'development';

  const entry = {
    index: './src/index.js'
  };

  const experiments = {
    outputModule: true,
  }

  const output = {
    clean,
    filename: `react_utils.${mode}.js`,
    path: path.resolve(__dirname, 'dist')
  };

  const optimization = {
    splitChunks: {
      chunks: 'all'
    }
  }

  const common_config = {
    mode, entry, optimization, output, experiments
  }

  const prod_config = {
    output: Object.assign(output, {
      library: {
        type: 'module'
      }
    })
  }

  const dev_config = {}

  return Object.assign(common_config, production ? prod_config : dev_config)
}

// module.exports = {
//   mode: 'development',
//   entry: {
//     index: {
//       import: './src/index.js',
//       dependOn: 'shared'
//     },
//     wrapPromise: {
//       import: './src/wrap-promise.js',
//       dependOn: 'shared'
//     }
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   optimization: {
//     runtimeChunk: 'single'
//   }
// }