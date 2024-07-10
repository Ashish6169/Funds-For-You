"use server"

import Razorpay from "razorpay";
import User from "@models/User";
import Payment from "@models/Payment";
import connectDb from "@app/db/connectDB";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
    const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    });

    const options = {
        amount: Number.parseInt(amount),
        currency: 'INR'
    };

    try {
        const x = await instance.orders.create(options);

        await Payment.create({
            oid: x.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message
        });

        return x;
    } catch (error) {
        console.error("Error creating order or saving payment: ", error);
        throw error; // or handle the error as needed
    }
};

export const fetchuser = async (username) => {
    await connectDb();

    try {
        const u = await User.findOne({ username: username });
        if (!u) {
            throw new Error("User not found");
        }

        const user = u.toObject({ flattenObjectIds: true });
        return user;
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw error; // or handle the error as needed
    }
};

export const fetchPayment = async (username) => {
    await connectDb();

    try {
        const pinfo = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(5).lean();
        return pinfo;
    } catch (error) {
        console.error("Error fetching payments: ", error);
        throw error; // or handle the error as needed
    }
};

export const updateProfile = async (data, oldusername) => {
    await connectDb();
    const ndata = data;

    try {
        if (oldusername !== ndata.username) {
            const u = await User.findOne({ username: ndata.username });
            if (u) {
                return { error: "Username already exists" };
            }
        }

        await User.updateOne({ email: ndata.email }, ndata); // email should not change
    } catch (error) {
        console.error("Error updating profile: ", error);
        throw error; // or handle the error as needed
    }
};
