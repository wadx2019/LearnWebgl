// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../res/01.vert":[function(require,module,exports) {
module.exports = "#define GLSLIFY 1\nattribute vec4 a_Position;\n\nvoid main() {\n    gl_Position = a_Position;\n}\n";
},{}],"../res/01.frag":[function(require,module,exports) {
module.exports = "#define GLSLIFY 1\nvoid main() {\n    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}\n";
},{}],"../res/webgl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Webgl =
/** @class */
function () {
  function Webgl(id) {
    var canvas = document.getElementById('canvas');
    this.gl = canvas.getContext('experimental-webgl');
    this.program = this.gl.createProgram();
  }

  Webgl.prototype.get_gl = function () {
    return this.gl;
  };

  Webgl.prototype.get_program = function () {
    return this.gl;
  };

  Webgl.prototype.bind_shader = function (vertex, fragment) {
    //编译顶点着色器
    var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertexShader, vertex);
    this.gl.compileShader(vertexShader); //编译片元着色器

    var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragmentShader, fragment);
    this.gl.compileShader(fragmentShader); //创建程序对象
    //将着色器附加到程序对象

    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    console.log(this.gl.getShaderInfoLog(vertexShader));
    console.log(this.gl.getShaderInfoLog(fragmentShader)); //链接程序对象和WebGl

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);
  };

  Webgl.prototype.bind_buffer = function (arr, target) {
    var buffer = this.gl.createBuffer();
    this.gl.bindBuffer(target, buffer);
    this.gl.bufferData(target, arr, this.gl.STATIC_DRAW);
  };

  Webgl.prototype.bind_array_buffer = function (arr) {
    this.bind_buffer(arr, this.gl.ARRAY_BUFFER);
  };

  Webgl.prototype.bind_element_array_buffer = function (arr) {
    this.bind_buffer(arr, this.gl.ELEMENT_ARRAY_BUFFER);
  };

  Webgl.prototype.set_attr = function (name, size, stride, offset) {
    if (stride === void 0) {
      stride = 0;
    }

    if (offset === void 0) {
      offset = 0;
    }

    var a_Position = this.gl.getAttribLocation(this.program, name);
    this.gl.vertexAttribPointer(a_Position, size, this.gl.FLOAT, false, stride, offset);
    this.gl.enableVertexAttribArray(a_Position);
  };

  Webgl.prototype.set_clear_color = function (red, green, blue, alpha) {
    if (alpha === void 0) {
      alpha = 1.0;
    }

    this.gl.clearColor(red, green, blue, alpha);
  };

  Webgl.prototype.clear = function () {
    this.get_gl().clear(this.gl.COLOR_BUFFER_BIT);
  };

  Webgl.prototype.draw_element_triangles = function (size, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    this.gl.drawElements(this.gl.TRIANGLES, size, this.gl.UNSIGNED_SHORT, offset);
  };

  return Webgl;
}();

exports.default = Webgl;
},{}],"sp1.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("../res/01.vert"));

var _2 = _interopRequireDefault(require("../res/01.frag"));

var _webgl = _interopRequireDefault(require("../res/webgl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gl = new _webgl.default('canvas');
gl.bind_shader(_.default, _2.default); //复制顶点数组到缓冲中供WebGL使用

var vertices = new Float32Array([-0.1, 0.1, 0, 1, 0.1, 0.1, 0, 1, 0.1, -0.1, 0, 1, -0.1, -0.1, 0, 1, 0.1, -0.3, 0, 1, 0.3, -0.3, 0, 1]);
gl.bind_array_buffer(vertices); //设置绘制顶点的顺序

var indices = new Uint16Array([0, 1, 3, 1, 5, 4]);
gl.bind_element_array_buffer(indices); //设置顶点属性指针

gl.set_attr('a_Position', 4); //清屏幕

gl.clear(); //画对象

gl.draw_element_triangles(6);
},{"../res/01.vert":"../res/01.vert","../res/01.frag":"../res/01.frag","../res/webgl":"../res/webgl.ts"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43665" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","sp1.js"], null)
//# sourceMappingURL=/sp1.js.map