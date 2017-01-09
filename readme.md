# generator-node-template

A Node.js service template generator for Yeoman based on hapi

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

### Tech
##### Database Options
  - [Rethinkdb][rethinkdb] with [RethinkDbDash][rethinkdbdash] as a node.js driver
  - [MongoDB][mongodb] with [mongoose][mongodb-driver] as a node.js driver

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

Make sure you have yo installed: npm install -g yo
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


### Todos

 - Add support of new databases
 - Add tests
 - Add support of new Lints

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [npm-image]: https://img.shields.io/npm/v/generator-node-template.svg
   [npm-url]: https://npmjs.org/package/generator-node-template
   [downloads-image]: https://img.shields.io/npm/dm/generator-node-template.svg
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

