// CustomerService.js

import { db } from '../config/db';

const chits = "chits"

export const addCustomer =  (name, phoneNo, address) => {
    db.ref('/Customers').push({
        name: name,
        phoneNo: phoneNo,
        address: address
    });
}

export const addChitToCustomer =  (chitID, customerKey) => {
    db.ref('/Customers').child(customerKey).child(chits).child(chitID).set(true)
}

export const removeChitFromCustomer =  (chitID, customerKey) => {
    db.ref('/Customers').child(customerKey).child(chits).child(chitID).set(null)
}