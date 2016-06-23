module.exports = {
  entry: './build/glass.js',
  output: {
    path: './build',
    filename: 'glass.bundle.js'
  }
  // Q: Why not use babel-loader?
  // A: It doesn't work on my workstation so I don't.
}
