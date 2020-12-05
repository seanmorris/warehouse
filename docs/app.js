(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("form.html", function(exports, require, module) {
module.exports = "<h1>Content-Type changer</h1>\n\n<!-- <div class = \"url-bar row\">\n\t<label class = \"bordered column\">\n\t\tendpoint\n\t\t<div class = \"row input-row\">\n\t\t\t<input cv-bind = \"urlPath\" />\n\t\t\t<button>GET</button>\n\t\t</div>\n\t</label>\n</div> -->\n\n<label class = \"bordered column\">\n\tinput\n\t<textarea cv-bind = \"input\" class = \"input\"></textarea>\n</label>\n\n<div class = \"mid-bar\">\n\n\t<div class = \"left-bar\">\n\n\t\t<label cv-if = \"inputCanHaveHeaders\">\n\t\t\tinput has headers\n\t\t\t<input type = \"checkbox\" cv-bind = \"inputHeaders\" value = \"1\" />\n\t\t</label>\n\n\t</div>\n\n\t<div class = \"center-bar\">\n\n\t\t<select cv-bind = \"inputType\">\n\t\t\t<option value = \"text/plain\">text/plain</option>\n\t\t\t<option value = \"text/csv\">text/csv</option>\n\t\t\t<option value = \"text/tsv\">text/tsv</option>\n\t\t\t<option value = \"text/json\">text/json</option>\n\t\t\t<!-- <option value = \"text/yaml\">text/yaml</option> -->\n\t\t</select>\n\n\t\t<button cv-on = \"click:submitRequest(event)\"> → </button>\n\n\t\t<select cv-bind = \"outputType\">\n\t\t\t<option value = \"text/plain\">text/plain</option>\n\t\t\t<option value = \"text/csv\">text/csv</option>\n\t\t\t<option value = \"text/tsv\">text/tsv</option>\n\t\t\t<option value = \"text/json\">text/json</option>\n\t\t\t<!-- <option value = \"text/yaml\">text/yaml</option> -->\n\t\t</select>\n\n\t</div>\n\n\t<div class = \"right-bar\">\n\t\t<label class = \"wide\" cv-if = \"outputCanHaveHeaders\">\n\t\t\t<input type = \"checkbox\" cv-bind = \"outputHeaders\" value = \"1\" />\n\t\t\toutput has headers\n\t\t</label>\n\t\t<button cv-on = \"click:switch(event)\">⇅</button>\n\t</div>\n\n</div>\n\n<label class = \"bordered column\">\n\t<textarea cv-bind = \"output\" class = \"output\" readonly=\"readonly\"></textarea>\n\toutput\n</label>\n\n<div class = \"bordered status-bar\">\n\t[[status]]\n</div>\n"
});

;require.register("home.html", function(exports, require, module) {
module.exports = "<h1>Index of /</h1>\n\n<ul cv-each = \"links:link:title\">\n\t<li>\n\t\t<a href = \"[[link]]\">\n\t\t\t[[title]]\n\t\t</a>\n\t</li>\n</ul>\n\n"
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _Router = require("curvature/base/Router");

var _RuleSet = require("curvature/base/RuleSet");

var _Config = require("curvature/base/Config");

var _View = require("curvature/base/View");

_Config.Config.set('backend-origin', '//seanmorris-warehouse.herokuapp.com/');

if (location.hostname == 'localhost') {
  _Config.Config.set('backend-origin', '//localhost:2020');
}

document.addEventListener('DOMContentLoaded', function () {
  fetch(_Config.Config.get('backend-origin'));
  var routes = {
    '': function _() {
      var view = _View.View.from(require('./home.html'));

      view.args.links = {
        home: '/',
        'type changer': 'type-changer',
        streams: 'streams'
      };
      return view;
    },
    streams: function streams() {
      var view = _View.View.from(require('./streams.html'));

      view.publishMessage = function (event) {
        var message = {};
        var channel = 'test';
      };

      return view;
    },
    'type-changer': function typeChanger() {
      var view = _View.View.from(require('./form.html'));

      view.args.status = 'ready.';
      view.args.bindTo('inputType', function (v) {
        return view.args.inputCanHaveHeaders = v && v.substr(-2, 2) === 'sv';
      });
      view.args.bindTo('outputType', function (v) {
        return view.args.outputCanHaveHeaders = v && v.substr(-2, 2) === 'sv';
      });

      view.submitRequest = function (event) {
        view.args.status = 'executing request...';
        fetch(_Config.Config.get('backend-origin') + '/changeTypes', {
          method: 'POST',
          body: view.args.input,
          headers: {
            'Content-Type': view.args.inputType,
            'Accept': view.args.outputType,
            'Ids-Output-Headers': view.args.outputHeaders ? 'true' : 'false',
            'Ids-Input-Headers': view.args.inputHeaders ? 'true' : 'false'
          }
        }).then(function (response) {
          return response.text();
        }).then(function (response) {
          view.args.output = response;
          view.args.status = 'ready.';
        });
      };

      view["switch"] = function (event) {
        var outputHeaders = view.args.outputHeaders;
        var inputHeaders = view.args.inputHeaders;
        var outputType = view.args.outputType;
        var inputType = view.args.inputType;
        view.args.outputType = inputType;
        view.args.inputType = outputType;
        view.args.outputHeaders = inputHeaders;
        view.args.inputHeaders = outputHeaders;
        var _ref = [view.args.output, view.args.input];
        view.args.input = _ref[0];
        view.args.output = _ref[1];
      };

      return view;
    }
  };

  var view = _View.View.from('[[content]]');

  _RuleSet.RuleSet.add('body', view);

  _RuleSet.RuleSet.apply();

  _Router.Router.listen(view, routes);
});
});

require.register("streams.html", function(exports, require, module) {
module.exports = "<button cv-on = \"click:publishMessage(event)\">pub</button>\n"
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map