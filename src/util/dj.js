import uid from './uid';
import { dj } from '../model';

export const id = uid();

export let currentDJ = id;

// don't think this is working
dj.onDisconnect().remove();

dj.on('value', (snapshot) => {
  const newDJ = snapshot.val();

  // take the dj seat if empty
  if(newDJ === null) {
    becomeDJ();
  } else {
    currentDJ = newDJ;
  }
});

export function userIsDJ(dj) {
  return id === (dj || currentDJ);
}

export function becomeDJ() {
  dj.set(id);
}

