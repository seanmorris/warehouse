exports.files = {
	javascripts: {
		joinTo: {
			'app.js': /app\/*/
			, 'curvature.js': /node_modules\/curvature\/.+/
			, 'vendor.js': /node_modules\/((?!curvature).)+\/.+?/
		}
	},
	stylesheets: { joinTo: 'app.css' }
};

exports.paths = { public: './docs', watched: ['./app'] };

exports.plugins = {
  babel: {
  	plugins:   ["@babel/plugin-proposal-class-properties"]
  	, presets: ['@babel/preset-env']
  },
  raw: {
	wrapper:   content => `module.exports = ${JSON.stringify(content)}`
	, pattern: /\.(jss|html|php|tmp\.+?)$/
  }
};

exports.watcher = { awaitWriteFinish: true };
