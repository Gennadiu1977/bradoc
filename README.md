# bradoc

A node module to gen, validate and format **Bra**zil's **doc**uments numbers. 

## Getting Started
Install the module with

`npm install bradoc`

Use the module

```javascript
var bradoc = require('bradoc');
```


### CPF

To generate a valid CPF (also formatted)

```javascript
bradoc.cpf.generate(); 
```

To validate a CPF (formatted or not)

```javascript
bradoc.cpf.validate(); 
```

### CNPJ

To generate a valid CNPJ (also formatted)

```javascript
bradoc.cnpj.generate(); 
```

To validate a CNPJ (formatted or not)

```javascript
bradoc.cnpj.validate(); 
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. 

Lint and test your code using [Grunt](http://gruntjs.com/). For that, watch the files to lint it automagically with:

`grunt watch`

## License
Copyright (c) 2013 Jú Gonçalves  
Licensed under the MIT license.
