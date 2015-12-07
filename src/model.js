import Firebase from 'firebase';
import config from './config';
import uid from './util/uid';

const firebase = new Firebase(config.FIREBASE_URL);

export const dj       = firebase.child('dj');
export const playing  = firebase.child('playing');
export const playlist = firebase.child('playlist');
export const paused   = firebase.child('paused');
export const volume   = firebase.child('volume');
export const history  = firebase.child('history');

