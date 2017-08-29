# Domainator

[![NodeJS](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png)](https://nodesource.com/products/nsolid)

Domainator is a minimalisitic node module for extracting the domain name from a given url. It uses the TLD suffix list provided by Mozilla.

  - It provides asynchronous calls for handling the same.
  - Supports single and batch calls for the same.
  - Uses caching strategy for optimising the calls.Usually the first call takes time and all other are just O(1) access from an in memory cache.

# Features

  - Uses caching strategy for querying domain names.
  - Majority of time consumed for cache population. First call is deferred, rest are just cache access operation.
  - Supports single and batch calls for querying the domain names.

### Usage
![screenshot from 2017-08-29 13 10 28](https://user-images.githubusercontent.com/11781630/29813308-57c52ce2-8cc7-11e7-8fb8-ed4143358c42.png)
![screenshot from 2017-08-29 13 12 34](https://user-images.githubusercontent.com/11781630/29813328-62bfa5fa-8cc7-11e7-8cbf-4e8749a76a89.png)


### Dependencies

Domainator uses a number of node modules to work properly:

* [Bluebird] - A blazing fast promise library
* [Request-promise] - promisified request library

### Installation

Domainator requires [Node.js](https://nodejs.org/) v6+ to run.

```sh
$ npm install domainator
```
For global install on your machine do
```sh
$ npm install -g  domainator
```
For production environments, the best practice is to require the module on server initialisation, so that cache population is done. Usually, in a medium level latency network, it usually takes about 2 seconds for cache population.


> All calls that happen before the cache is populated are deferred. They return as and when the cache population is done. After that all the calls can be assumed to take constant time.

### Tests

Mocha tests have been added for maintaining the source integrity. Use the following command to test the validity of the source code and as a proof of correctness of the methods provided by the node module

```sh
$ npm test
```

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Bluebird]: <http://bluebirdjs.com/docs/getting-started.html>
   [Request-promise]: <https://www.npmjs.com/package/request-promise>


