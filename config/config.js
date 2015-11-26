module.exports = {
  local: {
    Anna: {
      'phone': null,
      'email': null
    },
    Adam: {
      'phone': null,
      'email': null
    },
    SAR: {
      'email': null,
      'password': null
    },
    'api_key' : null,
    Mongo: {
      host: null,
      port: null,
      name: null,
      password: null
    }
  },
  production: {
    Anna: {
      'phone': process.env.ANNA_PHONE,
      'email': process.env.ANNA_EMAIL
    },
    Adam: {
      'phone': process.env.ADAM_PHONE,
      'email': process.env.ADAM_EMAIL
    },
    SAR: {
      'email': process.env.SAR_EMAIL,
      'password': process.env.SAR_PW
    },
    api_key: process.env.MANDRILL_KEY,
    Mongo: {
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      name: process.env.MONGO_NAME,
      password: process.env.MONGO_PASSWORD
    }
  }
};