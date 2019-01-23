// CustomerService.js

import { db } from '../config/db';

Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

export const addChit =  (name, date, duration) => {
    db.ref('/Chit').push({
        name: name,
        startDate: date.getUnixTime(),
        duration: duration
    });
}