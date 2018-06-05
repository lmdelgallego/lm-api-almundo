import * as firebase from 'firebase-admin';
import * as serviceAccount from './almundo-c56f9-firebase-adminsdk-jspz9-460982cdc1.json'

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://almundo-c56f9.firebaseio.com' 
});

export default firebase;