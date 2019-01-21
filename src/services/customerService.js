// CustomerService.js

import { db } from '../config/db';

export const addCustomer =  (name, phoneNo, address) => {
    db.ref('/Customers').push({
        name: name,
        phoneNo: phoneNo,
        address: address
    });
}