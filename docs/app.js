!function(){"use strict";var t="undefined"==typeof global?self:global;if("function"!=typeof t.require){var e={},n={},r={},a={}.hasOwnProperty,o=/^\.\.?(\/|$)/,i=function(t,e){for(var n,r=[],a=(o.test(e)?t+"/"+e:e).split("/"),i=0,u=a.length;i<u;i++)".."===(n=a[i])?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},u=function(t){return t.split("/").slice(0,-1).join("/")},s=function(e,r){var a,o={id:e,exports:{},hot:v&&v.createHot(e)};return n[e]=o,r(o.exports,(a=e,function(e){var n=i(u(a),e);return t.require(n,a)}),o),o.exports},l=function(t){var e=r[t];return e&&t!==e?l(e):t},p=function(t,r){null==r&&(r="/");var o=l(t);if(a.call(n,o))return n[o].exports;if(a.call(e,o))return s(o,e[o]);throw new Error("Cannot find module '"+t+"' from '"+r+"'")};p.alias=function(t,e){r[e]=t};var c=/\.[^.\/]+$/,d=/\/index(\.[^\/]+)?$/;p.register=p.define=function(t,o){if(t&&"object"==typeof t)for(var i in t)a.call(t,i)&&p.register(i,t[i]);else e[t]=o,delete n[t],function(t){if(c.test(t)){var e=t.replace(c,"");a.call(r,e)&&r[e].replace(c,"")!==e+"/index"||(r[e]=t)}if(d.test(t)){var n=t.replace(d,"");a.call(r,n)||(r[n]=t)}}(t)},p.list=function(){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t};var v=t._hmr&&new t._hmr(function(t,e){return l(i(u(t),e))},p,e,n);p._cache=n,p.hmr=v&&v.wrap,p.brunch=!0,t.require=p}}(),function(){"undefined"==typeof window||window;require.register("form.html",function(t,e,n){n.exports='<h1>Content-Type changer.</h1>\n\n\x3c!-- <div class = "url-bar row">\n\t<label class = "bordered column">\n\t\tendpoint\n\t\t<div class = "row input-row">\n\t\t\t<input cv-bind = "urlPath" />\n\t\t\t<button>GET</button>\n\t\t</div>\n\t</label>\n</div> --\x3e\n\n<label class = "bordered column">\n\tinput\n\t<textarea cv-bind = "input" class = "input"></textarea>\n</label>\n\n<div class = "mid-bar">\n\n\t<div class = "left-bar">\n\n\t\t<label cv-if = "inputCanHaveHeaders">\n\t\t\tinput has headers\n\t\t\t<input type = "checkbox" cv-bind = "inputHeaders" value = "1" />\n\t\t</label>\n\n\t</div>\n\n\t<div class = "center-bar">\n\n\t\t<select cv-bind = "inputType">\n\t\t\t<option value = "text/plain">text/plain</option>\n\t\t\t<option value = "text/csv">text/csv</option>\n\t\t\t<option value = "text/tsv">text/tsv</option>\n\t\t\t<option value = "text/json">text/json</option>\n\t\t\t<option value = "text/yaml">text/yaml</option>\n\t\t</select>\n\n\t\t<button cv-on = "click:submitRequest(event)"> → </button>\n\n\t\t<select cv-bind = "outputType">\n\t\t\t<option value = "text/plain">text/plain</option>\n\t\t\t<option value = "text/csv">text/csv</option>\n\t\t\t<option value = "text/tsv">text/tsv</option>\n\t\t\t<option value = "text/json">text/json</option>\n\t\t\t<option value = "text/yaml">text/yaml</option>\n\t\t</select>\n\n\t</div>\n\n\t<div class = "right-bar">\n\t\t<label class = "wide" cv-if = "outputCanHaveHeaders">\n\t\t\t<input type = "checkbox" cv-bind = "outputHeaders" value = "1" />\n\t\t\toutput has headers\n\t\t</label>\n\t\t<button cv-on = "click:switch(event)">⇅</button>\n\t</div>\n\n</div>\n\n<label class = "bordered column">\n\t<textarea cv-bind = "output" class = "output" readonly="readonly"></textarea>\n\toutput\n</label>\n\n<div class = "bordered status-bar">\n\t[[status]]\n</div>\n'}),require.register("initialize.js",function(t,e,n){"use strict";var r=e("curvature/base/Router"),a=e("curvature/base/RuleSet"),o=e("curvature/base/Config"),i=e("curvature/base/View");o.Config.set("backend-origin","//seanmorris-warehouse.herokuapp.com/"),"localhost"==location.hostname&&o.Config.set("backend-origin","//localhost:2020"),document.addEventListener("DOMContentLoaded",function(){var t=i.View.from(e("./form.html"));t.args.status="ready.",t.args.bindTo("inputType",function(e){return t.args.inputCanHaveHeaders=e&&"sv"===e.substr(-2,2)}),t.args.bindTo("outputType",function(e){return t.args.outputCanHaveHeaders=e&&"sv"===e.substr(-2,2)}),t.submitRequest=function(e){t.args.status="executing request...",fetch(o.Config.get("backend-origin"),{method:"POST",body:t.args.input,headers:{"Content-Type":t.args.inputType,Accept:t.args.outputType,"ids-output-headers":t.args.outputHeaders?"true":"false","ids-input-headers":t.args.inputHeaders?"true":"false"}}).then(function(t){return t.text()}).then(function(e){t.args.output=e,t.args.status="ready."})},t.switch=function(e){var n=t.args.outputHeaders,r=t.args.inputHeaders,a=t.args.outputType,o=t.args.inputType;t.args.outputType=o,t.args.inputType=a,t.args.outputHeaders=r,t.args.inputHeaders=n;var i=[t.args.output,t.args.input];t.args.input=i[0],t.args.output=i[1]},a.RuleSet.add("body",t),a.RuleSet.apply(),r.Router.listen(t)})}),require.register("___globals___",function(t,e,n){})}(),require("___globals___");
