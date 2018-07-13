# Dymock :alien: :boom:
[![NPM version](https://badge.fury.io/js/dymock.svg)](https://npmjs.org/package/dymock)

> A CLI to simplify the way you create mocks, dynamic REST APIs mocks. :boom:

Dymock allows you to build **a mock server in a simple way**, without programing, focusing on configuration files.

It gives you the power to **dynamically define witch response send back, based on params match.**

### Proposal

Create a tool that help us to unblock the mobile or frontend, API integration process. Making possible work in teams without API dependences at the development time.

So, Dymock should be a way to organize and define APIs contracts together (front/mobile | backend) and enable a simulation of the real API.

##### _Summary_

> Basically, we allows you to **build and run** a server, just with config files, that can send back **different responses based on the params received** in the request.


### Installation

We recommend install dymock globally using [npm](http://npmjs.org):

```bash
npm install -g dymock
```

### Usage

By default dymock will try to find a `.config` file in a dir based on the request url.

e.g.
```
GET /user/login
DIR ./url/user/login/(.config.js OR .config.json)
```

---


The config file need to be named as `.config` and is responsible to define two things:

 - **options:** a list (array) of:
 	- **params:** the params that we can match in. `You don't need to set all the request, just params that you wanna match.`
 	- **response:** the object we'll return if match the params.

- **default:** a default response if nothing match.

> This config file can be a **json** or a **js** file, we recommend **js** to simplify the organization using `require` to import the response file.

e.g.

```json
// JSON File

{
  "options": [
    {
      "params": {
        "cpf": 12345
      },
      "response": {
        "message": "client"
      }
    },
    {
      "params": {
        "cpf": 43210
      },
      "response": {
        "message": "not client"
      }
    },
    {
      "params": {}, // GET
      "response": {
        "message": "Login page"
      }
    }
  ],
  "default": {
    "error": {
      "message": "Invalid params"
    }
  }
}
```

```javascript
// JS File

module.exports = {
  options: [
    {
      params: {
        cpf: 12345
      },
      response: require('./client.json'),
    },
    {
      params: {
        cpf: 43210
      },
      response: require('./not-client.json'),
    },
    {
      params: {}, // GET
      response: {
        message: 'Login page'
      }
    }
  ],
  default: {
    error: {
      message: 'Invalid params'
    }
  }
};
```

To run the server defining the port you can do:
> The default port is: 3000
```bash
dymock -p 5000
```

You can get help running:
```bash
dymock -h
```

and the version:
```bash
dymock -v
```

### Configuration

If you want to change the dir structure, you can define were each path will look for the config file.

To do that you need to create a `.url-config.json` file in your project root.

e.g.
```json
[
  {
    "url": "user/login/password/forget",
    "path": "./remember-password"
  },
  {
    "url": "post/create/new",
    "path": "./post"
  }
]
```
> Remember: **If you create this config file, the default mechanism will be disabled.**
