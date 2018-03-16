# hmr-loader
Webpack loader that add a hmr method to your module

<br><br><br>

## Features
- Add a hmr method to the default object / function exported by a module
- If your module exports a primitive, the value will be wrapped inside a object containing both the primitive value and the hmr method, `{ hmr, value }`

<br><br>

## Installation & Usage

** :warning: Specify `hmr` to each import statement your want to add hot realoding. **

** :warning: `hmr-loader` doesn't work when specified in a webpack config file. **

```sh

```

<br>

```js
import Module from 'hmr!./module-object'
import string from 'hmr!./module-string'

Module.hmr(NewModule => console.log('Reloaded'))

let current = string.value
string.hmr(newString => { current = newString })
```

<br><br>

## Requirements
- Node >= 8
- Webpack >= 3
