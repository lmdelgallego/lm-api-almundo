import http from 'http';
import {port, ip, env, apiRoot} from './config.js';
import express from './services/express'
import firebase from './services/firebase'
import api from './api';

const app = express(apiRoot,api)
const server = http.createServer(app);
console.log(port)

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})


export default app