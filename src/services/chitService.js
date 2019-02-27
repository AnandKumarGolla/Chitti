// CustomerService.js

import { db } from '../config/db';

Date.prototype.getUnixTime = function () { return this.getTime() / 1000 | 0 };

const customers = "customers"

export const addChit = (name, date, duration) => {
    db.ref('/Chit').push({
        name: name,
        startDate: date.getUnixTime(),
        duration: duration
    });
}

export const addCustomerToChit = (chitID, customerKey) => {
    db.ref('/Chit').child(chitID).child(customers).child(customerKey).set(true)
}

export const removeCustomerFromChit = (chitID, customerKey) => {
    db.ref('/Chit').child(chitID).child(customers).child(customerKey).set(null)
}