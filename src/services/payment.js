import { db } from '../config/db';

const chits = "chits"

export const addPayment = (customerKey, chitKey, amount, fine, date) => {
    db.ref('/Payments').push({
        customerKey: customerKey,
        chitKey: chitKey,
        amount: amount,
        fine: fine,
        date: date
    });
}