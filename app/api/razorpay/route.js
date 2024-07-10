import Payment from "@models/Payment";
import Razorpay from "razorpay";
import connectDb from "@app/db/connectDB";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req) =>{
    await connectDb();

    let body = await req.formData()
    body = Object.fromEntries(body)

    let p = await Payment.findOne({oid : body.razorpay_order_id})

    if(!p){
        return NextResponse.error("Order Id not found")
    }

    try {
        let isValid = validatePaymentVerification({
            "order_id": body.razorpay_order_id,
            "payment_id": body.razorpay_payment_id},
            body.razorpay_signature , 
             process.env.KEY_SECRET); 

        if (isValid) { 
           const updatePayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id} , {done : 'true'} , {new: true});
           return NextResponse.redirect(`http://localhost:3000/${updatePayment.to_user}?paymentdone=true`)
        } else {
            return NextResponse.error("Payment verification failed");
        } 
    } catch (error) {
        return NextResponse.error("Internal Server Error"); 
    }
};
