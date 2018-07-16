# hmr-loader
Webpack loader that add a hmr method to your module

<br><br><br>

## Features
- Wrap your module inside an HMR object
- Watch/Unwatch changes with the `watch` and `unwatch` methods
- Access to your module via the `module` property

<br><br>

## Installation

```sh
$ npm install @pqml/hmr-loader -S # with npm
$ yarn add @pqml/hmr-loader --dev # with yarn
```

<br><br>

## Usage

:warning: Specify `@pqml/hmr` to each import statement your want to add hot reloading.

:warning: `hmr-loader` doesn't work when specified in a webpack config file.

<br>

```js
import Module from '@pqml/hmr!./module-object'
import string from '@pqml/hmr!./module-string'

// Return true - you can use it to check if the module is wrapped inside the hmr module
Module.__hmr

// Return module ID
Module.id

// Real module default value
Module.module

// onReload will be called on each reload
Module.watch(onReload)

// Stop calling onReload on each reload
Module.unwatch(onReload)

// Only the new module value is sent to the callback, without a new hmr wrapper
function onReload (newValue) {}
```

<br><br>

## Requirements
- Node >= 8
- Webpack >= 3
