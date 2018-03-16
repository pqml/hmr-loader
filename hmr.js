const loaderUtils = require('loader-utils')

module.exports.pitch = function hotLoader (remainingRequest, preReq, data) {
  const moduleRequest = loaderUtils.stringifyRequest(this, remainingRequest)

  const hotCode = (`
function (cb) {
  if (module.hot) {
    module.hot.accept([moduleId], function() {
      var newInstance = require(${moduleRequest});
      if (newInstance.__esModule) newInstance = newInstance.default;
      cb && cb(newInstance);
    });
  }
}`)

  return (`
var moduleInstance = require(${moduleRequest});
var moduleId = require.resolve(${moduleRequest});
if (moduleInstance.__esModule) moduleInstance = moduleInstance.default;
if (typeof moduleInstance === 'function' || typeof moduleInstance === 'object') {
  moduleInstance.hmr = ${hotCode}
} else {
  moduleInstance = { value: moduleInstance, hmr: ${hotCode} }
}
module.exports = moduleInstance;
`)
}
