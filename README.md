# Dymock
> A CLI to simplify the way you create mocks, dynamic REST APIs mocks.

Dymock allows you to build a mock server in a simple way, without programing, focusing on configuration files.

It gives you the power to dynamically define witch response send back, based on params match.

### Installation

We recommend install dymock globally using [npm](http://npmjs.org):

```bash
npm install -g dymock
```

### Usage

By default dymock will try to find a config file in a dir based on the request url.

e.g.
```
GET /user/login
DIR ./url/user/login/(config.js OR config.json)
```

This config file can be a **json** or a **js** file, we recommend **js** to simplify the organization using `require` to import the response file.

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

To do that you need to create a `url.config.json` file in your project root.

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
  },
]
```
> Remember: **If you create this config file the default mechanism will be disabled.**
