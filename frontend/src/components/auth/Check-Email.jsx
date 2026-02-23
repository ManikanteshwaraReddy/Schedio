import React from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";

export default function () {
    const params = useParams();
    const token = params.mailid;
    return (
        <div>
            <Header />
            <div className="flex bg-slate-950 items-center justify-center h-screen m-0">
                <div className="text-center">
                    <h1 className="text-white text-2xl lg:text-4xl font-bold">Check Your Email</h1>
                    <p className="text-white mt-4 text-base lg:text-lg max-w-md">
                        We've sent an email to {token} with a link to set your password. Please check your inbox and follow the instructions in the email.
                    </p>
                </div>
            </div>
        </div>
    );
}