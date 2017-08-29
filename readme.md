# radar.js 📡📈

[![Test Status](https://img.shields.io/travis/OpenMined/radar.js/master.svg?style=flat-square)](https://travis-ci.org/OpenMined/radar.js)
[![Coverage](https://img.shields.io/codecov/c/github/OpenMined/radar.js/master.svg?style=flat-square)](https://codecov.io/gh/OpenMined/radar.js)

> Providing information about the platform status

<!-- TOC depthFrom:2 -->

- [📦 Setup](#-setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [🏃‍ Usage](#‍-usage)
    - [Bootstrap environment](#bootstrap-environment)
    - [Start](#start)
        - [Mock client](#mock-client)
    - [Tests](#tests)
- [⚖️ License](#-license)

<!-- /TOC -->

## 📦 Setup

### Prerequisites

* node.JS `v8`

### Installation

```sh
npm install
```

## 🏃‍ Usage

### Bootstrap environment

No external components are required to run `radar.js`.

### Start

To start the statistics server run:

```sh
npm start
```

or you can use `docker run openmined/radar.js` to start a prepared docker container with the latest release.


#### Mock client

To play around with the server you can run a fake client:

```sh
npm run client
```

### Tests

```sh
npm test
```

You can run codestyle checks with

```sh
npm run lint
```

## ⚖️ License

[Apache-2.0](LICENSE) by OpenMined contributors
