"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
exports.getFile = (fileName) => {
    return new Promise(resolve => firebase_1.databaseRef
        .child(fileName.replace('.json', ''))
        .once('value')
        .then(snapshot => {
        resolve(snapshot.val());
    })
        .catch(err => {
        console.log('getFile', err);
        resolve(undefined);
    }));
};
exports.writeFile = (fileName, data) => firebase_1.databaseRef
    .child(fileName.replace('.json', ''))
    .set(data)
    .catch(err => {
    console.log('writeFile', err);
});
//# sourceMappingURL=files.js.map