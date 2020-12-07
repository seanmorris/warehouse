!function(){"use strict";var t="undefined"==typeof global?self:global;if("function"!=typeof t.require){var e={},n={},r={},o={}.hasOwnProperty,a=/^\.\.?(\/|$)/,i=function(t,e){for(var n,r=[],o=(a.test(e)?t+"/"+e:e).split("/"),i=0,s=o.length;i<s;i++)".."===(n=o[i])?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},s=function(t){return t.split("/").slice(0,-1).join("/")},u=function(e,r){var o,a={id:e,exports:{},hot:d&&d.createHot(e)};return n[e]=a,r(a.exports,(o=e,function(e){var n=i(s(o),e);return t.require(n,o)}),a),a.exports},c=function(t){var e=r[t];return e&&t!==e?c(e):t},l=function(t,r){null==r&&(r="/");var a=c(t);if(o.call(n,a))return n[a].exports;if(o.call(e,a))return u(a,e[a]);throw new Error("Cannot find module '"+t+"' from '"+r+"'")};l.alias=function(t,e){r[e]=t};var f=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/;l.register=l.define=function(t,a){if(t&&"object"==typeof t)for(var i in t)o.call(t,i)&&l.register(i,t[i]);else e[t]=a,delete n[t],function(t){if(f.test(t)){var e=t.replace(f,"");o.call(r,e)&&r[e].replace(f,"")!==e+"/index"||(r[e]=t)}if(p.test(t)){var n=t.replace(p,"");o.call(r,n)||(r[n]=t)}}(t)},l.list=function(){var t=[];for(var n in e)o.call(e,n)&&t.push(n);return t};var d=t._hmr&&new t._hmr(function(t,e){return c(i(s(t),e))},l,e,n);l._cache=n,l.hmr=d&&d.wrap,l.brunch=!0,t.require=l}}(),function(){"undefined"==typeof window||window;var t=function(t,e,n){var r={},o=function(e,n){try{return t(n+"/node_modules/"+e)}catch(t){if(-1===t.toString().indexOf("Cannot find module"))throw t;if(-1!==n.indexOf("node_modules")){var a=n.split("/"),i=a.lastIndexOf("node_modules"),s=a.slice(0,i).join("/");return o(e,s)}}return r};return function(a){if(a in e&&(a=e[a]),a){if("."!==a[0]&&n){var i=o(a,n);if(i!==r)return i}return t(a)}}};require.register("curvature/form/multiField/FormWrapper.js",function(e,n,r){n=t(n,{},"curvature"),function(){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FormWrapper=void 0;var t=n("../../base/Repository"),r=n("../../form/Form"),o=n("../../toast/Toast"),a=(n("../../toast/ToastAlert"),n("../../base/View")),i=n("../../base/Router");function s(t){"@babel/helpers - typeof";return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){s=!0,a=t},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw a}}}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var n,r=d(t);if(e){var o=d(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,n)}}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var v=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(v,a.View);var n,s,c,d=p(v);function v(e,n){var o,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,v),(o=d.call(this,e)).path=n,o.args.method=a,o.args.action=o.args.action||null,o.args.form=null,o.args.title=null,o.args.class="",o.template='\n\t\t\t<div class = "form constrict [[class]]">\n\t\t\t\t<div cv-if = "title"><label>[[title]]</label></div>\n\t\t\t\t[[form]]\n\t\t\t</div>\n\t\t',o._onLoad=[],o._onSubmit=[],o._onRender=[],o._onRequest=[],o._onError=[],o._onResponse=[],n instanceof r.Form?o.loadForm(form,i):t.Repository.request(n).then(function(t){t&&t.meta&&t.meta.form&&t.meta.form instanceof Object?(o.loadForm(new r.Form(t.meta.form,i)),o.onLoad(o.args.form,t.body)):console.error("Cannot render form with ",t)}),o}return n=v,(s=[{key:"loadForm",value:function(e){var n=this;this.args.form=e,this.args.form.addEventListener("submit",function(r){r&&(r.preventDefault(),r.stopPropagation());var o=e.tags.formTag.element,a=o.getAttribute("action")||n.args.action||n.path,s=o.getAttribute("method")||n.args.method,c=e.args.flatValue;if("GET"==(s=s.toUpperCase())){var l={};for(var f in n.args.content&&n.args.content.args&&(n.args.content.args.page=0),l.page=0,c)"api"!==f&&(l[f]=c[f]);n.onRequest(l).then(function(){n.onResponse({}),i.Router.go(a+"?"+i.Router.queryToString(l)),n.update(l)}).catch(function(t){n.onRequestError(t)})}else if("POST"==s){var p,d=e.formData(),v=u(d.entries());try{for(v.s();!(p=v.n()).done;)p.value}catch(t){v.e(t)}finally{v.f()}var m=n.onRequest(d);m&&m.then(function(){t.Repository.request(a,{api:"json"},d,!1,{progressDown:function(t){n.progressDown(t)},progressUp:function(t){n.progressUp(t)}}).then(function(t){n.onResponse(t)}).catch(function(t){n.onRequestError(t)})})}})}},{key:"onRequest",value:function(t){var e=[];for(var n in this._onRequest){var r=this._onRequest[n](t,this);r&&e.push(r)}return 0==e.length?Promise.resolve():Promise.all(e)}},{key:"onRequestError",value:function(t){for(var e in this._onError)this._onError[e](t,this);if(t.messages)for(var n in t.messages)o.Toast.instance().alert(t.body&&t.body.id?"Success!":"Error!",t.messages[n],3500)}},{key:"onResponse",value:function(t){for(var e in this._onResponse)this._onResponse[e](t,this);if(t.messages)for(var n in t.messages)o.Toast.instance().alert(t.body&&t.body.id?"Success!":"Error!",t.messages[n],3500)}},{key:"onLoad",value:function(t,e){for(var n in this._onLoad)this._onLoad[n](this,t,e)}},{key:"customFields",value:function(){return{}}},{key:"submit",value:function(){}},{key:"progressUp",value:function(t){console.log(t.loaded,t.total,t.loaded/t.total)}},{key:"progressDown",value:function(t){console.log(t.loaded,t.total,t.loaded/t.total)}}])&&l(n.prototype,s),c&&l(n,c),v}();e.FormWrapper=v}()}),require.register("curvature/form/multiField/Wrapper.js",function(e,n,r){n=t(n,{},"curvature"),function(){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Wrapper=void 0;var t=n("../../base/Config"),r=n("../../base/View"),o=n("../../base/Repository");function a(t){"@babel/helpers - typeof";return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(t,e){if(e&&("object"===a(e)||"function"==typeof e))return e;return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,n)}}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=function(e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(f,r.View);var n,a,c,l=u(f);function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(e=l.call(this,t)).template='\n\t\t\t<div\n\t\t\t\tclass = "wrapped-field [[classes]]"\n\t\t\t\tcv-on = "click:editRecord(event, key)"\n\t\t\t\ttitle = "[[fieldName]]: [[id]]"\n\t\t\t>\n\t\t\t\t<div\n\t\t\t\t\tcv-on = "click:deleteImage(event, key)"\n\t\t\t\t\tstyle = "display: inline; cursor:pointer;"\n\t\t\t\t>\n\t\t\t\t\t[[icon]]\n\t\t\t\t</div>\n\t\t\t\t<div class = "field-content">\n\t\t\t\t\t[[title]]\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div style = "display:none">[[field]]</div>\n\t\t',e.args.field=e.args.field||"!",e.args.keyword="",e.args.title="",e.args.record={},e.args.key=e.args.field.key,e.args.classes="",e.args.icon="×",e.deleted=!1,e.args.field.args.bindTo("fieldName",function(t){e.args.fieldName=t}),e.args.fieldName=e.args.field.args.name,e.args.id=e.args.field.args.value.id,e.args.bindTo("id",function(t){e.args.field.args.value.id=t}),e.args.field.args.value.bindTo("id",function(t,n){t&&o.Repository.request(e.backendPath(),{id:t}).then(function(n){e.args.id=t;var r=n.body[0];if(!r)return e.args.publicId=null,void(e.args.title=null);e.refresh(r)})},{wait:0}),e.args.field.args.value.bindTo("keyword",function(t){e.args.keyword=t}),e}return n=f,(a=[{key:"editRecord",value:function(){this.args.parent.editRecord(this.args.record,this)}},{key:"deleteImage",value:function(t,e){t.stopPropagation(),this.deleted?(this.args.icon="×",this.args.parent.undeleteImage(e),this.deleted=!1):(this.args.icon="↺",this.args.parent.deleteImage(e),this.deleted=!0)}},{key:"backendPath",value:function(){return(t.Config.get("backend")||"//")+this.args.parent.args.attrs["data-endpoint"]}},{key:"getRecordTitle",value:function(t){return t._titleField?t[t._titleField]:t.title||t.publicId||t.id}},{key:"refresh",value:function(t){for(var e in t)this.args[e]=t[e];this.args.record=t,this.args.title=this.getRecordTitle(t)}}])&&i(n.prototype,a),c&&i(n,c),f}();e.Wrapper=l}()}),require.register("database.html",function(t,e,n){n.exports='<h1>Database</h1>\n\n<p><a cv-link = "/">home</a></p>\n\nCreate a new table:\n\n<div class = "row" style = "max-width: 20em;">\n\t<form method = "POST" action = "[[backend]]/createScaffold" cv-on = "submit:createTable(event)">\n\t\t<input name = "tableName" cv-bind = "newTable" placeholder = "enter a table name">\n\t\t<input type = "submit" value = "open stream">\n\t</form>\n</div>\n\n\n<div class = "column inline db-columns">\n\t<div class = "column" cv-each = "columns:column:c"><input cv-bind = "column"></div>\n\t<button cv-on = "click:newColumn(event)">+</button>\n</div>\n'}),require.register("form.html",function(t,e,n){n.exports='<h1>Content-Type changer</h1>\n\n<p><a cv-link = "/">home</a></p>\n\n\x3c!-- <div class = "url-bar row">\n\t<label class = "bordered column">\n\t\tendpoint\n\t\t<div class = "row input-row">\n\t\t\t<input cv-bind = "urlPath" />\n\t\t\t<button>GET</button>\n\t\t</div>\n\t</label>\n</div> --\x3e\n\n<label class = "bordered column">\n\tinput\n\t<textarea cv-bind = "input" class = "input"></textarea>\n</label>\n\n<div class = "mid-bar">\n\n\t<div class = "left-bar">\n\n\t\t<label cv-if = "inputCanHaveHeaders">\n\t\t\tinput has headers\n\t\t\t<input type = "checkbox" cv-bind = "inputHeaders" value = "1" />\n\t\t</label>\n\n\t</div>\n\n\t<div class = "center-bar">\n\n\t\t<select cv-bind = "inputType">\n\t\t\t<option value = "text/plain">text/plain</option>\n\t\t\t<option value = "text/csv">text/csv</option>\n\t\t\t<option value = "text/tsv">text/tsv</option>\n\t\t\t<option value = "text/json">text/json</option>\n\t\t\t\x3c!-- <option value = "text/yaml">text/yaml</option> --\x3e\n\t\t</select>\n\n\t\t<button cv-on = "click:submitRequest(event)"> → </button>\n\n\t\t<select cv-bind = "outputType">\n\t\t\t<option value = "text/plain">text/plain</option>\n\t\t\t<option value = "text/csv">text/csv</option>\n\t\t\t<option value = "text/tsv">text/tsv</option>\n\t\t\t<option value = "text/json">text/json</option>\n\t\t\t\x3c!-- <option value = "text/yaml">text/yaml</option> --\x3e\n\t\t</select>\n\n\t</div>\n\n\t<div class = "right-bar">\n\t\t<label class = "wide" cv-if = "outputCanHaveHeaders">\n\t\t\t<input type = "checkbox" cv-bind = "outputHeaders" value = "1" />\n\t\t\toutput has headers\n\t\t</label>\n\t\t<button cv-on = "click:switch(event)">⇅</button>\n\t</div>\n\n</div>\n\n<label class = "bordered column">\n\t<textarea cv-bind = "output" class = "output" readonly="readonly"></textarea>\n\toutput\n</label>\n\n<div class = "bordered status-bar">\n\t[[status]]\n</div>\n'}),require.register("home.html",function(t,e,n){n.exports='<h1>Index of /</h1>\n\n<ul cv-each = "links:link:title">\n\t<li>\n\t\t<a cv-link = "[[link]]">[[title]]</a>\n\t</li>\n</ul>\n\n'}),require.register("initialize.js",function(t,e,n){"use strict";var r=e("curvature/base/Router"),o=e("curvature/base/RuleSet"),a=e("curvature/base/Config"),i=(e("curvature/model/Model"),e("curvature/base/View"));e("curvature/form/Form"),e("curvature/form/multiField/View");function s(t){return function(t){if(Array.isArray(t))return u(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}a.Config.set("backend-origin","//seanmorris-warehouse.herokuapp.com/"),"localhost"==location.hostname&&a.Config.set("backend-origin","//localhost:2020"),document.addEventListener("DOMContentLoaded",function(){fetch(a.Config.get("backend-origin"));var t={"":function(){var t=i.View.from(e("./home.html"));return t.args.links={home:"/","type changer":"type-changer",streams:"streams"},t},database:function(){return!1},streams:function(t){t.streamName;var n=i.View.from(e("./stream-index.html"));n.args.streams=[];var o=a.Config.get("backend-origin")+"/activeStreams";return fetch(o,{headers:{Accept:"text/json"}}).then(function(t){return t.json()}).then(function(t){n.args.streams=t}),n.openStream=function(t){t.preventDefault();var e="streams/".concat(n.args.newStream);console.log(e),r.Router.go(e,!1)},n},"streams/%streamName":function(t){var n=t.streamName,r=i.View.from(e("./streams.html"));r.args.streamName=n,r.args.received=0,r.args.eventLog=[];var o=[],u=function(t){r.args.received++,o.unshift({class:"ServerEvent",data:JSON.parse(t.data),id:t.lastEventId}),r.onNextFrame(function(){var t;(t=r.args.eventLog).unshift.apply(t,s(o.splice(0)))})},c=a.Config.get("backend-origin")+"/subscribe/"+n,l=new EventSource(c,{withCredentials:!0,retry:500});return r.onRemove(function(){return l.close()}),l.addEventListener("ServerEvent",u),r.onRemove(function(){l.removeEventListener("happened",u)}),r.args.bindTo("inputType",function(t){return r.args.inputCanHaveHeaders=t&&"sv"===t.substr(-2,2)}),r.publishMessage=function(t){var e;fetch(a.Config.get("backend-origin")+"/publish/"+n,{credentials:"include",method:"POST",body:null!==(e=r.args.input)&&void 0!==e?e:String.fromCharCode(0),headers:{"Content-Type":r.args.inputType,"Ids-Input-Headers":r.args.inputHeaders?"true":"false"}}).then(function(t){return t.text()}).then(function(t){r.args.output=t,r.args.status="ready."})},r.toJson=function(t){return JSON.stringify(t)},r},"type-changer":function(){var t=i.View.from(e("./form.html"));return t.args.status="ready.",t.args.bindTo("inputType",function(e){return t.args.inputCanHaveHeaders=e&&"sv"===e.substr(-2,2)}),t.args.bindTo("outputType",function(e){return t.args.outputCanHaveHeaders=e&&"sv"===e.substr(-2,2)}),t.submitRequest=function(e){t.args.status="executing request...",fetch(a.Config.get("backend-origin")+"/changeTypes",{method:"POST",body:t.args.input,headers:{"Content-Type":t.args.inputType,Accept:t.args.outputType,"Ids-Output-Headers":t.args.outputHeaders?"true":"false","Ids-Input-Headers":t.args.inputHeaders?"true":"false"}}).then(function(t){return t.text()}).then(function(e){t.args.output=e,t.args.status="ready."})},t.switch=function(e){var n=t.args.outputHeaders,r=t.args.inputHeaders,o=t.args.outputType,a=t.args.inputType;t.args.outputType=a,t.args.inputType=o,t.args.outputHeaders=r,t.args.inputHeaders=n;var i=[t.args.output,t.args.input];t.args.input=i[0],t.args.output=i[1]},t}},n=i.View.from("[[content]]");o.RuleSet.add("body",n),o.RuleSet.apply(),r.Router.listen(n,t)})}),require.register("stream-index.html",function(t,e,n){n.exports='<h1>Streams</h1>\n\n<p><a cv-link = "/">home</a></p>\n\nOpen stream by name:\n\n<div class = "row" style = "max-width: 20em;">\n\t<form cv-on = "submit:openStream(event)">\n\t\t<input cv-bind = "newStream" placeholder = "enter a stream name">\n\t\t<input type = "submit" class = "createStream" value = "open stream">\n\t</form>\n</div>\n\n<h2>Active Streams</h2>\n\n<ul cv-each = "streams:stream">\n\t<li><a cv-link = "/streams/[[stream]]">[[stream]]</a></li>\n</ul>\n'}),require.register("streams.html",function(t,e,n){n.exports='<h1>[[streamName]]</h1>\n\n<p><a cv-link = "/streams">back</a></p>\n\n<label class = "bordered column">\n\tinput\n\t<textarea cv-bind = "input" class = "input"></textarea>\n</label>\n\n<div class = "mid-bar">\n\n\t<div class = "left-bar">\n\n\t\t<label cv-if = "inputCanHaveHeaders">\n\t\t\tinput has headers\n\t\t\t<input type = "checkbox" cv-bind = "inputHeaders" value = "1" />\n\t\t</label>\n\n\t</div>\n\n\t<div class = "center-bar">\n\n\t\t<select cv-bind = "inputType">\n\t\t\t<option value = "text/plain">text/plain</option>\n\t\t\t<option value = "text/csv">text/csv</option>\n\t\t\t<option value = "text/tsv">text/tsv</option>\n\t\t\t<option value = "text/json">text/json</option>\n\t\t\t\x3c!-- <option value = "text/yaml">text/yaml</option> --\x3e\n\t\t</select>\n\n\t\t<button cv-on = "click:publishMessage(event)"> publishMessage → </button>\n\t</div>\n\n</div>\n\n<label class = "bordered column">\n\n\t<ul class = "event-log" cv-each = "eventLog:event:i">\n\t\t<li cv-with = "event" cv-carry = "i">\n\t\t\tid: [[id]] user: [[data.user]] payload: [[data.payload|toJson]]\n\t\t</li>\n\t</ul>\n\n\t<div class = "bottom">output [[received]]</div>\n\n</label>\n'}),require.register("___globals___",function(t,e,n){})}(),require("___globals___");
