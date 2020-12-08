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

require.register("curvature/form/multiField/FormWrapper.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "curvature");
  (function() {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormWrapper = void 0;

var _Repository = require("../../base/Repository");

var _Form = require("../../form/Form");

var _Toast = require("../../toast/Toast");

var _ToastAlert = require("../../toast/ToastAlert");

var _View2 = require("../../base/View");

var _Router = require("../../base/Router");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FormWrapper = /*#__PURE__*/function (_View) {
  _inherits(FormWrapper, _View);

  var _super = _createSuper(FormWrapper);

  function FormWrapper(args, path) {
    var _this;

    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
    var customFields = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, FormWrapper);

    _this = _super.call(this, args);
    _this.path = path;
    _this.args.method = method;
    _this.args.action = _this.args.action || null;
    _this.args.form = null;
    _this.args.title = null;
    _this.args["class"] = '';
    _this.template = "\n\t\t\t<div class = \"form constrict [[class]]\">\n\t\t\t\t<div cv-if = \"title\"><label>[[title]]</label></div>\n\t\t\t\t[[form]]\n\t\t\t</div>\n\t\t";
    _this._onLoad = [];
    _this._onSubmit = [];
    _this._onRender = [];
    _this._onRequest = [];
    _this._onError = [];
    _this._onResponse = [];

    if (path instanceof _Form.Form) {
      _this.loadForm(form, customFields);
    } else {
      _Repository.Repository.request(path).then(function (resp) {
        if (!resp || !resp.meta || !resp.meta.form || !(resp.meta.form instanceof Object)) {
          console.error('Cannot render form with ', resp); // Router.go('/');

          return;
        }

        _this.loadForm(new _Form.Form(resp.meta.form, customFields));

        _this.onLoad(_this.args.form, resp.body);
      });
    }

    return _this;
  }

  _createClass(FormWrapper, [{
    key: "loadForm",
    value: function loadForm(form) {
      var _this2 = this;

      this.args.form = form;
      this.args.form.addEventListener('submit', function (event) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        var formElement = form.tags.formTag.element;

        var uri = formElement.getAttribute('action') || _this2.args.action || _this2.path;

        var method = formElement.getAttribute('method') || _this2.args.method;

        var query = form.args.flatValue;
        method = method.toUpperCase(); // console.log(method, uri);

        if (method == 'GET') {
          var _query = {};

          if (_this2.args.content && _this2.args.content.args) {
            _this2.args.content.args.page = 0;
          }

          _query.page = 0;

          for (var i in query) {
            if (i === 'api') {
              continue;
            }

            _query[i] = query[i];
          }

          var promises = _this2.onRequest(_query);

          promises.then(function () {
            _this2.onResponse({});

            _Router.Router.go(uri + '?' + _Router.Router.queryToString(_query));

            _this2.update(_query);
          })["catch"](function (error) {
            _this2.onRequestError(error);
          });
        } else if (method == 'POST') {
          var formData = form.formData();

          var _iterator = _createForOfIteratorHelper(formData.entries()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {// console.log(pair[0]+ ', ' + pair[1]);

              var pair = _step.value;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          var _promises = _this2.onRequest(formData);

          if (_promises) {
            _promises.then(function () {
              _Repository.Repository.request(uri, {
                api: 'json'
              }, formData, false, {
                progressDown: function progressDown(event) {
                  _this2.progressDown(event);
                },
                progressUp: function progressUp(event) {
                  _this2.progressUp(event);
                }
              }).then(function (response) {
                _this2.onResponse(response);
              })["catch"](function (error) {
                _this2.onRequestError(error);
              });
            });
          }
        }
      });
    }
  }, {
    key: "onRequest",
    value: function onRequest(requestData) {
      var promises = [];

      for (var i in this._onRequest) {
        var onReq = this._onRequest[i](requestData, this);

        if (onReq) {
          promises.push(onReq);
        }
      }

      if (promises.length == 0) {
        return Promise.resolve();
      }

      return Promise.all(promises);
    }
  }, {
    key: "onRequestError",
    value: function onRequestError(error) {
      for (var i in this._onError) {
        this._onError[i](error, this);
      }

      if (error.messages) {
        for (var _i in error.messages) {
          _Toast.Toast.instance().alert(error.body && error.body.id ? 'Success!' : 'Error!', error.messages[_i], 3500);
        }
      }
    }
  }, {
    key: "onResponse",
    value: function onResponse(response) {
      for (var i in this._onResponse) {
        this._onResponse[i](response, this);
      }

      if (response.messages) {
        for (var _i2 in response.messages) {
          _Toast.Toast.instance().alert(response.body && response.body.id ? 'Success!' : 'Error!', response.messages[_i2], 3500);
        }
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad(form, model) {
      for (var i in this._onLoad) {
        this._onLoad[i](this, form, model);
      }
    } // onSubmit(form, event)
    // {
    // 	for(let i in this._onSubmit)
    // 	{
    // 		this._onSubmit[i](this, event);
    // 	}
    // }
    // postRender()
    // {
    // 	for(let i in this._onRender)
    // 	{
    // 		this._onRender[i](this.args.form);
    // 	}
    // }

  }, {
    key: "customFields",
    value: function customFields() {
      return {};
    }
  }, {
    key: "submit",
    value: function submit() {// console.log(this);
    }
  }, {
    key: "progressUp",
    value: function progressUp(event) {
      console.log(event.loaded, event.total, event.loaded / event.total);
    }
  }, {
    key: "progressDown",
    value: function progressDown(event) {
      console.log(event.loaded, event.total, event.loaded / event.total);
    }
  }]);

  return FormWrapper;
}(_View2.View);

exports.FormWrapper = FormWrapper;
  })();
});

require.register("curvature/form/multiField/Wrapper.js", function(exports, require, module) {
  require = __makeRelativeRequire(require, {}, "curvature");
  (function() {
    "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = void 0;

var _Config = require("../../base/Config");

var _View2 = require("../../base/View");

var _Repository = require("../../base/Repository");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Wrapper = /*#__PURE__*/function (_View) {
  _inherits(Wrapper, _View);

  var _super = _createSuper(Wrapper);

  function Wrapper(args) {
    var _this;

    _classCallCheck(this, Wrapper);

    _this = _super.call(this, args);
    _this.template = "\n\t\t\t<div\n\t\t\t\tclass = \"wrapped-field [[classes]]\"\n\t\t\t\tcv-on = \"click:editRecord(event, key)\"\n\t\t\t\ttitle = \"[[fieldName]]: [[id]]\"\n\t\t\t>\n\t\t\t\t<div\n\t\t\t\t\tcv-on = \"click:deleteImage(event, key)\"\n\t\t\t\t\tstyle = \"display: inline; cursor:pointer;\"\n\t\t\t\t>\n\t\t\t\t\t[[icon]]\n\t\t\t\t</div>\n\t\t\t\t<div class = \"field-content\">\n\t\t\t\t\t[[title]]\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div style = \"display:none\">[[field]]</div>\n\t\t"; // console.log(this.args.field);

    _this.args.field = _this.args.field || '!';
    _this.args.keyword = '';
    _this.args.title = '';
    _this.args.record = {};
    _this.args.key = _this.args.field.key;
    _this.args.classes = '';
    _this.args.icon = '×';
    _this.deleted = false;

    _this.args.field.args.bindTo('fieldName', function (v) {
      _this.args.fieldName = v;
    });

    _this.args.fieldName = _this.args.field.args.name;
    _this.args.id = _this.args.field.args.value.id;

    _this.args.bindTo('id', function (v) {
      _this.args.field.args.value.id = v;
    });

    _this.args.field.args.value.bindTo('id', function (v, k) {
      if (!v) {
        return;
      }

      _Repository.Repository.request(_this.backendPath(), {
        id: v
      }).then(function (response) {
        _this.args.id = v;
        var record = response.body[0];

        if (!record) {
          _this.args.publicId = null;
          _this.args.title = null;
          return;
        }

        _this.refresh(record);
      });
    }, {
      wait: 0
    });

    _this.args.field.args.value.bindTo('keyword', function (v) {
      _this.args.keyword = v;
    });

    return _this;
  }

  _createClass(Wrapper, [{
    key: "editRecord",
    value: function editRecord() {
      this.args.parent.editRecord(this.args.record, this);
    }
  }, {
    key: "deleteImage",
    value: function deleteImage(event, index) {
      event.stopPropagation();

      if (!this.deleted) {
        this.args.icon = '↺';
        this.args.parent.deleteImage(index);
        this.deleted = true;
      } else {
        this.args.icon = '×';
        this.args.parent.undeleteImage(index);
        this.deleted = false;
      }
    }
  }, {
    key: "backendPath",
    value: function backendPath() {
      var backend = _Config.Config.get('backend') || '//';
      return backend + this.args.parent.args.attrs['data-endpoint'];
    }
  }, {
    key: "getRecordTitle",
    value: function getRecordTitle(record) {
      if (record._titleField) {
        return record[record._titleField];
      }

      return record.title || record.publicId || record.id;
    }
  }, {
    key: "refresh",
    value: function refresh(model) {
      for (var i in model) {
        this.args[i] = model[i];
      }

      this.args.record = model;
      this.args.title = this.getRecordTitle(model);
    }
  }]);

  return Wrapper;
}(_View2.View);

exports.Wrapper = Wrapper;
  })();
});
require.register("database.html", function(exports, require, module) {
module.exports = "<h1>Database</h1>\n\n<p><a cv-link = \"/\">home</a></p>\n\nCreate a new table:\n\n<div class = \"row\" style = \"max-width: 20em;\">\n\t<form method = \"POST\" action = \"[[backend]]/createScaffold\" cv-on = \"submit:createTable(event)\">\n\t\t<input name = \"tableName\" cv-bind = \"newTable\" placeholder = \"enter a table name\">\n\t\t<input type = \"submit\" value = \"open stream\">\n\t</form>\n</div>\n\n\n<div class = \"column inline db-columns\">\n\t<div class = \"column\" cv-each = \"columns:column:c\"><input cv-bind = \"column\"></div>\n\t<button cv-on = \"click:newColumn(event)\">+</button>\n</div>\n"
});

;require.register("form.html", function(exports, require, module) {
module.exports = "<h1>Content-Type changer</h1>\n\n<p><a cv-link = \"/\">home</a></p>\n\n<!-- <div class = \"url-bar row\">\n\t<label class = \"bordered column\">\n\t\tendpoint\n\t\t<div class = \"row input-row\">\n\t\t\t<input cv-bind = \"urlPath\" />\n\t\t\t<button>GET</button>\n\t\t</div>\n\t</label>\n</div> -->\n\n<label class = \"bordered column\">\n\tinput\n\t<textarea cv-bind = \"input\" class = \"input\"></textarea>\n</label>\n\n<div class = \"mid-bar\">\n\n\t<div class = \"left-bar\">\n\n\t\t<label cv-if = \"inputCanHaveHeaders\">\n\t\t\tinput has headers\n\t\t\t<input type = \"checkbox\" cv-bind = \"inputHeaders\" value = \"1\" />\n\t\t</label>\n\n\t</div>\n\n\t<div class = \"center-bar\">\n\n\t\t<select cv-bind = \"inputType\">\n\t\t\t<option value = \"text/plain\">text/plain</option>\n\t\t\t<option value = \"text/csv\">text/csv</option>\n\t\t\t<option value = \"text/tsv\">text/tsv</option>\n\t\t\t<option value = \"text/json\">text/json</option>\n\t\t\t<!-- <option value = \"text/yaml\">text/yaml</option> -->\n\t\t</select>\n\n\t\t<button cv-on = \"click:submitRequest(event)\"> → </button>\n\n\t\t<select cv-bind = \"outputType\">\n\t\t\t<option value = \"text/plain\">text/plain</option>\n\t\t\t<option value = \"text/csv\">text/csv</option>\n\t\t\t<option value = \"text/tsv\">text/tsv</option>\n\t\t\t<option value = \"text/json\">text/json</option>\n\t\t\t<!-- <option value = \"text/yaml\">text/yaml</option> -->\n\t\t</select>\n\n\t</div>\n\n\t<div class = \"right-bar\">\n\t\t<label class = \"wide\" cv-if = \"outputCanHaveHeaders\">\n\t\t\t<input type = \"checkbox\" cv-bind = \"outputHeaders\" value = \"1\" />\n\t\t\toutput has headers\n\t\t</label>\n\t\t<button cv-on = \"click:switch(event)\">⇅</button>\n\t</div>\n\n</div>\n\n<label class = \"bordered column\">\n\t<textarea cv-bind = \"output\" class = \"output\" readonly=\"readonly\"></textarea>\n\toutput\n</label>\n\n<div class = \"bordered status-bar\">\n\t[[status]]\n</div>\n"
});

;require.register("home.html", function(exports, require, module) {
module.exports = "<h1>Index of /</h1>\n\n<ul cv-each = \"links:link:title\">\n\t<li>\n\t\t<a cv-link = \"[[link]]\">[[title]]</a>\n\t</li>\n</ul>\n\n"
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _Router = require("curvature/base/Router");

var _RuleSet = require("curvature/base/RuleSet");

var _Config = require("curvature/base/Config");

var _Model = require("curvature/model/Model");

var _View = require("curvature/base/View");

var _Form = require("curvature/form/Form");

var _View2 = require("curvature/form/multiField/View");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

_Config.Config.set('backend-origin', '//seanmorris-warehouse.herokuapp.com');

if (location.hostname == 'localhost:2020') {
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
        streams: 'streams' // , database: 'database'

      };
      return view;
    },
    database: function database() {
      return false;

      var view = _View.View.from(require('./database.html'));

      view.args.columns = ['a', 'b'];
      view.args.backend = _Config.Config.get('backend-origin');
      view.args.bindTo('columns', function (v, k, t, d, vv, kk, tt, dd) {
        console.log(JSON.stringify(tt));
      }, {
        children: true,
        wait: 0
      });

      view.createTable = function (event) {
        event.preventDefault();
        console.log(event.target);
        fetch(event.target.action, {
          method: event.target.method,
          body: new FormData(event.target),
          headers: {
            Accept: 'text/csv',
            'Ids-Output-Headers': true
          }
        }).then(function (response) {
          return response.text();
        }).then(function (response) {
          console.log(response);
        });
      };

      view.newColumn = function () {
        view.args.columns.push('');
      };

      return view;
    },
    'streams': function streams(_ref) {
      var streamName = _ref.streamName;

      var view = _View.View.from(require('./stream-index.html'));

      view.args.streams = [];
      var url = _Config.Config.get('backend-origin') + '/activeStreams';
      var options = {
        headers: {
          Accept: 'text/json'
        }
      };
      fetch(url, options).then(function (response) {
        return response.json();
      }).then(function (streams) {
        view.args.streams = streams;
      });

      view.openStream = function (event) {
        event.preventDefault();
        var path = "streams/".concat(view.args.newStream);
        console.log(path);

        _Router.Router.go(path, false);
      };

      return view;
    },
    'streams/%streamName': function streamsStreamName(_ref2) {
      var streamName = _ref2.streamName;

      var view = _View.View.from(require('./streams.html'));

      view.args.streamName = streamName;
      view.args.received = 0;
      view.args.eventLog = [];
      var eventBuffer = [];

      var onServerEvent = function onServerEvent(event) {
        view.args.received++;
        eventBuffer.unshift({
          "class": 'ServerEvent',
          data: JSON.parse(event.data),
          id: event.lastEventId
        });
        view.onNextFrame(function () {
          var _view$args$eventLog;

          (_view$args$eventLog = view.args.eventLog).unshift.apply(_view$args$eventLog, _toConsumableArray(eventBuffer.splice(0)));
        });
      };

      var url = _Config.Config.get('backend-origin') + '/subscribe/' + streamName;
      var eventSource = new EventSource(url, {
        withCredentials: true,
        retry: 500
      });
      view.onRemove(function () {
        return eventSource.close();
      });
      eventSource.addEventListener('ServerEvent', onServerEvent);
      view.onRemove(function () {
        eventSource.removeEventListener('happened', onServerEvent);
      });
      view.args.bindTo('inputType', function (v) {
        return view.args.inputCanHaveHeaders = v && v.substr(-2, 2) === 'sv';
      });

      view.publishMessage = function (event) {
        var _view$args$input;

        fetch(_Config.Config.get('backend-origin') + '/publish/' + streamName, {
          credentials: 'include',
          method: 'POST',
          body: (_view$args$input = view.args.input) !== null && _view$args$input !== void 0 ? _view$args$input : String.fromCharCode(0x0),
          headers: {
            'Content-Type': view.args.inputType,
            'Ids-Input-Headers': view.args.inputHeaders ? 'true' : 'false'
          }
        }).then(function (response) {
          return response.text();
        }).then(function (response) {
          view.args.output = response;
          view.args.status = 'ready.';
        });
      };

      view.toJson = function (x) {
        return JSON.stringify(x);
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
        var _ref3 = [view.args.output, view.args.input];
        view.args.input = _ref3[0];
        view.args.output = _ref3[1];
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

require.register("stream-index.html", function(exports, require, module) {
module.exports = "<h1>Streams</h1>\n\n<p><a cv-link = \"/\">home</a></p>\n\nOpen stream by name:\n\n<div class = \"row\" style = \"max-width: 20em;\">\n\t<form cv-on = \"submit:openStream(event)\">\n\t\t<input cv-bind = \"newStream\" placeholder = \"enter a stream name\">\n\t\t<input type = \"submit\" class = \"createStream\" value = \"open stream\">\n\t</form>\n</div>\n\n<h2>Active Streams</h2>\n\n<ul cv-each = \"streams:stream\">\n\t<li><a cv-link = \"/streams/[[stream]]\">[[stream]]</a></li>\n</ul>\n"
});

;require.register("streams.html", function(exports, require, module) {
module.exports = "<h1>[[streamName]]</h1>\n\n<p><a cv-link = \"/streams\">back</a></p>\n\n<label class = \"bordered column\">\n\tinput\n\t<textarea cv-bind = \"input\" class = \"input\"></textarea>\n</label>\n\n<div class = \"mid-bar\">\n\n\t<div class = \"left-bar\">\n\n\t\t<label cv-if = \"inputCanHaveHeaders\">\n\t\t\tinput has headers\n\t\t\t<input type = \"checkbox\" cv-bind = \"inputHeaders\" value = \"1\" />\n\t\t</label>\n\n\t</div>\n\n\t<div class = \"center-bar\">\n\n\t\t<select cv-bind = \"inputType\">\n\t\t\t<option value = \"text/plain\">text/plain</option>\n\t\t\t<option value = \"text/csv\">text/csv</option>\n\t\t\t<option value = \"text/tsv\">text/tsv</option>\n\t\t\t<option value = \"text/json\">text/json</option>\n\t\t\t<!-- <option value = \"text/yaml\">text/yaml</option> -->\n\t\t</select>\n\n\t\t<button cv-on = \"click:publishMessage(event)\"> publishMessage → </button>\n\t</div>\n\n</div>\n\n<label class = \"bordered column\">\n\n\t<ul class = \"event-log\" cv-each = \"eventLog:event:i\">\n\t\t<li cv-with = \"event\" cv-carry = \"i\">\n\t\t\tid: [[id]] user: [[data.user]] payload: [[data.payload|toJson]]\n\t\t</li>\n\t</ul>\n\n\t<div class = \"bottom\">output ([[received]] messages)</div>\n\n</label>\n"
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map