module.exports = ({ file, options, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
      'autoprefixer': env == 'production' ? options.autoprefixer : false,
    }
  })