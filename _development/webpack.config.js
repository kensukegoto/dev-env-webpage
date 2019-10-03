module.exports = (mode = "development") => {
    
  return {
      mode: mode,
      entry: {
          "js/index": "./es6/index.js",
      },
      output:{
          filename: "[name].bundle.js",
      },
      module: {
          rules: [
          { 
              test: /\.js$/, 
              loader: "babel-loader",
              include:[
                /es6/,
                /node_modules\/modal_npm/,
                /node_modules\/timeline_npm/
              ]
          }
          ]
      },
      devtool: (mode === "development") ? "inline-source-map" : false
  }
}