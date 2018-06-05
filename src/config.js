import path from 'path'

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 1234,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || ''
  },
  development: {
    firebase:{
      url: 'https://almundo-c56f9.firebaseio.com' 
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    firebase:{
      url: 'https://almundo-c56f9.firebaseio.com' 
    }
  }
}

module.exports = Object.assign(config.all)
export default module.exports;