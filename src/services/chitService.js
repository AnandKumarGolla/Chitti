// CustomerService.js

import { db } from '../config/db';

export const addChit =  (name, date, duration) => {
    db.ref('/Chit').push({
        name: name,
        startDate: date,
        duration: duration
    });
}