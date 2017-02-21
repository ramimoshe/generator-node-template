# generator-node-template

A Node.js service template generator for Yeoman based on hapi

Choose your tech stack and create node.js template of api service

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

![alt tag](https://github.com/ramimoshe/generator-node-template/blob/master/resources/animations/overview.gif?raw=true)

### Tech
##### Database Options
  - [Rethinkdb][rethinkdb] with [RethinkDbDash][rethinkdbdash] as a node.js driver
  - [MongoDB][mongodb] with [mongoose][mongodb-driver] as a node.js driver

##### Front-end Integration Option With
  - [handlebars][handlebars] - Handlebars provides the power necessary to let you build semantic templates effectively with no frustration.

##### Lint Options
  - [ESLint][eslint]
  - [JSHint][jshint]

##### Containerization Platform Options
  - [Docker][docker]
 
##### Service Libraries
  - [Hapi.js][hapijs] - A rich framework for building applications and services
  - [bluebird][bluebird] - Bluebird is a fully featured promise library with focus on innovative features and performance
  - [boom][boom] - HTTP-friendly error objects
  - [config][config] - Node-config organizes hierarchical configurations for your app deployments.
  - [hapi-swagger][hapi-swagger] - Auto swagger documentations generator
  - [joi][joi] - Object schema description language and validator for JavaScript objects
  - [lodash][lodash] - A modern JavaScript utility library delivering modularity, performance & extras.
  - [winston][winston] - A multi-transport async logging library for node.js

##### Process Manager
  - [pm2][pm2] - Production process manager for Node.js apps with a built-in load balancer

##### Testing Libraries
  - [jasmine][jasmine] - A multi-transport async logging library for node.js
  - [istanbul][istanbul] - A JS code coverage tool written in JS
  - [sinon][sinon] - Standalone test spies, stubs and mocks for JavaScript


### Installation

The output service template supported [Node.js](https://nodejs.org/) v4+.

Make sure you have yo installed
```sh
npm install -g yo
```

Install the generator globally
```sh
npm install -g generator-node-template
```

Run: generator-node-template and choose your preferences
```sh
yo node-template
```

### Project Structure
```bash
.
├── config
│   ├── idefault.json
│   ├── development.json
│   ├── prod.json
├── lib
│   ├── server.js
│   └── data
│   └── api
│   └── └── models
│   └── ├── productsEndpoints.js
│   └── ... // more endpoints
│   └── infrastructure
│   └── └── hapi
│   └── └── ├── authenticationPlugin.js
│   └── └── ├── extentions.js
│   └── ├── logger.js
│   └── logic
│   └── ├── productsHandler.js
│   └── ├── authentication.js
├── templates
├── public
├── tests
│   └── integrations
│   └── units
├── index.js
├── package.json
└── readme.md
```

#### Database layer (lib/data)
index.js file expose all db models and initialize them

#### Logic layer (lib/logic)
contains all logics code  for the endpoints 

#### API layer (lib/api)
contains all api models and endpoints defenitions

#### Infrastructure code (lib/infrastructure)
contains infrastructure code (e.g: logger)

#### Authentication code (lib/logic/authentication.js)
authentications.js contains authenticate function which will be called with the token value for each request

#### Integration tests code (tests/integrations)
contains all integration tests

#### Units tests code (tests/units)
contains all unit tests

### Q&A
- How to run tests
   ```sh
   npm test
   ```
- How to run lint
   ```sh
   npm lint
   ```
- How to run the service
   ```sh
   npm start
   ```
- How to run the service using pm2
  ```sh
  pm2 start ecosystem.json --env={env_name}
  ```
- [How to work with several environment with config module][config-files]

### Development

Want to contribute? Great!
Clone the repository and push your changes

#### How to run it locally
Run the following command on the root project
```sh
npm link
```

Then every time when you run the install command it will take it from your local source code

### Todos

 - Add support of new databases
 - Add tests for the generator
 - Add support of new Lints

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [npm-image]: https://img.shields.io/npm/v/generator-node-template.svg
   [npm-url]: https://npmjs.org/package/generator-node-template
   [downloads-image]: https://img.shields.io/npm/dt/generator-node-template.svg
   [downloads-url]: https://npmjs.org/package/generator-node-template
   
   [config-files]: <https://github.com/lorenwest/node-config/wiki/Configuration-Files>
   [hapi-swagger]: <https://github.com/glennjones/hapi-swagger>
   [joi]: <https://github.com/hapijs/joi>
   [winston]: <https://github.com/winstonjs/winston>
   [config]: <https://github.com/lorenwest/node-config>
   [boom]: <https://github.com/hapijs/boom>
   [bluebird]: <https://github.com/petkaantonov/bluebird>
   [jasmine]: <https://jasmine.github.io/>
   [istanbul]: <https://github.com/gotwarlost/istanbul>
   [sinon]: <http://sinonjs.org/>
   [lodash]: <https://lodash.com/>
   [docker]: <https://www.docker.com/>
   [eslint]: <http://eslint.org/>
   [jshint]: <http://jshint.com/docs/>
   [mongodb]: <https://www.mongodb.com/>
   [mongodb-driver]: <https://github.com/mongodb/node-mongodb-native>
   [rethinkdbdash]: <https://github.com/neumino/rethinkdbdash>
   [rethinkdb]: <https://www.rethinkdb.com/>
   [hapijs]: <http://hapijs.com> 
   [node.js]: <http://nodejs.org>
   [pm2]: <https://github.com/Unitech/pm2>
   [handlebars]: <http://handlebarsjs.com/>

