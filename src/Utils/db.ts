import { databaseRef } from '../firebase';
const kantineMenyRef = databaseRef.child('kantinemeny');

export const getFromDb = <T>(dbKey: string) => {
  return new Promise<T | undefined>(resolve =>
    kantineMenyRef
      .child(dbKey)
      .once('value')
      .then(snapshot => {
        resolve(snapshot.val());
      })
      .catch(err => {
        console.log('getFile', err);
        resolve(undefined);
      })
  );
};

export const writeToDb = (dbKey: string, data: Object) =>
  kantineMenyRef
    .child(dbKey)
    .set(data)
    .catch(err => {
      console.log('writeFile', err);
    });
