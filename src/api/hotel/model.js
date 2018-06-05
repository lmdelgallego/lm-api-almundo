import firebase from '../../services/firebase';

const db = firebase.database();
const ref = db.ref('hotels');

export default ref;
