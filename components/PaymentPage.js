"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

import 'react-toastify/dist/ReactToastify.css';
import { fetchPayment, fetchuser, initiate } from "@app/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Bounce } from "react-toastify";

const PaymentPage = ({ username }) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams();
    const [paymentform, setPaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    });

    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for Your Contribution ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentform({ ...paymentform, [name]: value });
    };

    const getdata = async () => {
        const u = await fetchuser(username)
        setCurrentUser(u);
        let dbpayments = await fetchPayment(username);
        setPayments(dbpayments);
    }

    const pay = async (amount, e) => {
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "FundRaise",
            "order_id": orderId,
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": {
                "name": paymentform.name,
                "email": "ashish@example.com",
                "contact": "8434434343"
            },
            "notes": {
                "address": "Razor Pay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rpz1 = new Razorpay(options);
        rpz1.open();
    };

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://media.giphy.com/media/3o6gbbuLW76jkt8vIc/giphy.gif')" }}>
                <div className='cover w-full bg-red-50 relative'>
                    <img className='object-cover' height={50} src="" alt="" />
                    <div className='absolute -bottom-14 left-1/2 transform -translate-x-1/2 border-white border-2 rounded-full '>
                        <img className="rounded-full " width={50} height={50} src={currentUser.profilepic} alt="profilepicture" />
                    </div>
                </div>
                <div className="relative z-10">
                    <div className='info flex justify-center items-center my-24 flex-col gap-2'>
                        <div className='font-bold text-lg text-white'>
                            @{username}
                        </div>
                        <div className='text-slate-200'>
                            Fund money for The user
                        </div>
                        <div className='text-slate-200'>
                            Happy money contributors
                        </div>
                    </div>
                    <div className='payment flex justify-center w-[80%] mt-11 mx-auto'>
                        <div className="supports h-auto w-[40%] bg-slate-900 p-3 text-white p-10 rounded-lg shadow-lg">
                            <h2 className='font-bold text-2xl mb-4'> Top 5 +Supporters</h2>
                            <ul className="mx-5 text-lg space-y-3">
                                {payments.length == 0 && <p> "No Payments to display"</p>}
                                {payments.map((p, i) => (
                                    <li key={i} className='flex gap-2 items-center'>
                                        <img width={33} src="https://img.icons8.com/ios-filled/50/000000/user.png" alt="user avatar" />

                                        <span>
                                            {p.name} donated
                                            <span className='text-yellow-300 '> ₹{p.amount}</span>
                                            <span className="text-sm"> - saying- "{p.message}"</span>

                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="makePayment bg-slate-900 h-auto w-[40%] mx-3 p-10 rounded-lg shadow-lg">
                            <h2 className='font-bold text-2xl mb-4 text-white'>Make Payment</h2>
                            <div className="flex flex-col paymentform space-y-3 text-black">
                                <input onChange={handleChange} value={paymentform.name} name="name" className="my-2 p-2 rounded " type="text" placeholder='Enter Your Name' />
                                <input onChange={handleChange} value={paymentform.message} name="message" className="my-2 p-2 rounded" type="text" placeholder='Enter Your message' />
                                <input onChange={handleChange} value={paymentform.amount} name="amount" className="my-2 p-2 rounded" type="text" placeholder='Enter Amount' />
                                <button onClick={(e) => pay(Number.parseInt(paymentform.amount, e) * 100)} disabled={paymentform.name?.length<2 && paymentform.message.length < 3 && paymentform.amount.length<1} class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Pay {paymentform.amount}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            </div>
        </>
    );
};

export default PaymentPage;
