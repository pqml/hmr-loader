const loaderUtils = require('loader-utils')

module.exports.pitch = function hotLoader (remainingRequest, preReq, data) {
  this.cacheable && this.cacheable();

  const moduleRequest = loaderUtils.stringifyRequest(this, this._module.userRequest
    .split('!')
    .filter(mod => mod.split('?')[0] !== __filename)
    .join('!'))

  return (`
var moduleId = require.resolve(${moduleRequest});

var watchers = [];
var i = 0;
var l = 0;

var api = {
  __hmr: true,
  id: moduleId,
  module: require(${moduleRequest}),
  watch: watch,
  unwatch: unwatch,
};

if (api.module.__esModule) api.module = api.module.default;

if (module.hot) {
  module.hot.accept([moduleId], function() {
    api.module = require(${moduleRequest});
    if (api.module.__esModule) api.module = api.module.default;
    for (i = 0, l = watchers.length; i < watchers.length; i++) watchers[i](api.module)
  });
}

function watch (cb) {
  watchers.push(cb)
}

function unwatch (cb) {
  var aliveWatchers = [];
  for (i = 0, l = watchers.length; i < watchers.length; i++) {
    if (watchers[i] !== cb) aliveWatchers.push(watchers[i]);
  }
  watchers = aliveWatchers;
}

module.exports = api;
`)
}
