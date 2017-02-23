module.exports = {
  local: {
    Anna: {
      'phone': null,
      'email': null
    },
    Adam: {
      'phone': null,
      'email': null,
      'pw': null
    },
    SAR: {
      'email': null,
      'password': null
    },
    'api_key' : null
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
    api_key: process.env.MANDRILL_KEY
  }
};