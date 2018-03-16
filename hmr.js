const loaderUtils = require('loader-utils')

module.exports.pitch = function hotLoader (remainingRequest, preReq, data) {
  this.cacheable && this.cacheable();

  const moduleRequest = loaderUtils.stringifyRequest(this, this._module.userRequest
    .split('!')
    .filter(mod => mod.split('?')[0] !== __filename)
    .join('!'))

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
console.log(moduleInstance)
if (moduleInstance.__esModule) moduleInstance = moduleInstance.default;
if (typeof moduleInstance === 'function' || typeof moduleInstance === 'object') {
  moduleInstance.hmr = ${hotCode}
} else {
  moduleInstance = { value: moduleInstance, hmr: ${hotCode} }
}
module.exports = moduleInstance;
`)
}
