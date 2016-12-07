# Pug

A Node.js service template generator for Yeoman based on [Hapi.js][hapijs].

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
  - [bluebird][bluebird] - Bluebird is a fully featured promise library with focus on innovative features and performance
  - [boom][boom] - HTTP-friendly error objects
  - [config][config] - Node-config organizes hierarchical configurations for your app deployments.
  - [hapi-swagger][hapi-swagger] - Auto swagger documentations generator
  - [joi][joi] - Object schema description language and validator for JavaScript objects
  - [lodash][lodash] - A modern JavaScript utility library delivering modularity, performance & extras.
  - [winston][winston] - A multi-transport async logging library for node.js

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
npm install -g NodeJs-Service-Generator
```

Run: pug and choose your preferences
```sh
yo pug
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
- [How to work with several environment with config module][config-files]

### Development

Want to contribute? Great!
Clone the repository and push your changes


### Todos

 - Add support of new databases
 - Add more tests examples with Sinon
 - Add support of new Lints

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
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

