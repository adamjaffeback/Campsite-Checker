exports.contacts = {
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
      'email': 'adamb@marinsar.org',
      'password': 'dobsonian'
    },
    api_key : null
  },
  production: {
    Anna: {
      'phone': process.ENV.ANNA_PHONE,
      'email': process.ENV.ANNA_EMAIL
    },
    Adam: {
      'phone': process.ENV.ADAM_PHONE,
      'email': process.ENV.ADAM_EMAIL
    },
    SAR: {
      'email': process.ENV.SAR_EMAIL,
      'password': process.ENV.SAR_PW
    },
    api_key: process.ENV.MANDRILL_KEY
  }
};