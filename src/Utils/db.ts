import { databaseRef } from '../firebase';
import { log } from '../Utils/index';

export const getFromDb = <T>(dbKey: string) => {
  return new Promise<T | undefined>(resolve =>
    databaseRef
      .child(dbKey)
      .once('value')
      .then(snapshot => {
        resolve(snapshot.val());
      })
      .catch(err => {
        log('getFromDb_error');
        console.log('getFromDb', err);
        resolve(undefined);
      })
  );
};

export const writeToDb = (dbKey: string, data: Object) =>
  databaseRef
    .child(dbKey)
    .set(data)
    .catch(err => {
      log('writeToDb_error');
      console.log('writeToDb', err);
    });
