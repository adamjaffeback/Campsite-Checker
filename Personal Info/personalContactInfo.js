module.exports = {
  local: {
    Anna: {
      'phone': null,
      'email': null
    },
    Adam: {
      'phone': '4193675212@vztext.com',
      'email': 'adamback42@gmail.com'
    },
    SAR: {
      'email': 'adamb@marinsar.org',
      'password': 'dobsonian'
    },
    'api_key' : 'x7TxsWDnVNVYGH1vSr-hzA'
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