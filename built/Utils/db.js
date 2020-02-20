"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
const kantineMenyRef = firebase_1.databaseRef.child('kantinemeny');
exports.getFromDb = (dbKey) => {
    return new Promise(resolve => kantineMenyRef
        .child(dbKey)
        .once('value')
        .then(snapshot => {
        resolve(snapshot.val());
    })
        .catch(err => {
        console.log('getFile', err);
        resolve(undefined);
    }));
};
exports.writeToDb = (dbKey, data) => kantineMenyRef
    .child(dbKey)
    .set(data)
    .catch(err => {
    console.log('writeFile', err);
});
//# sourceMappingURL=db.js.map