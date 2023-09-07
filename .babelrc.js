module.exports = {
  presets: [
    [
      'next/babel',
      {
        'babel-plugin-twin': {
          debug: false,
        }
      }
    ]
  ],
  plugins: [
    'babel-plugin-macros'
  ]
}
