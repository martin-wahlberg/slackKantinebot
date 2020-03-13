"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
const index_1 = require("../Utils/index");
exports.getFromDb = (dbKey) => {
    return new Promise(resolve => firebase_1.databaseRef
        .child(dbKey)
        .once('value')
        .then(snapshot => {
        resolve(snapshot.val());
    })
        .catch(err => {
        index_1.log('getFromDb_error');
        console.log('getFromDb', err);
        resolve(undefined);
    }));
};
exports.writeToDb = (dbKey, data) => firebase_1.databaseRef
    .child(dbKey)
    .set(data)
    .catch(err => {
    index_1.log('writeToDb_error');
    console.log('writeToDb', err);
});
//# sourceMappingURL=db.js.map