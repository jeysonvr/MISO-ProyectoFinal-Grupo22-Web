"use client";

import { useCallback } from 'react';
import { useState } from "react";
import Link from "next/link";
import '../../globals.css';

const SignupForm = ({ labels }: any) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = useCallback((e:any) => {
        //e.preventDefault();
    }, []); 

    return (
        <div style={{height: '70vh', backgroundColor:'white'}}>
        <div className="float-left mx-auto w-3/5 bg-teal-500 h-full flex justify-center items-center">
            <img className="w-80 h-80" src="/images/imageBackground.png" alt='Background Image'></img>
        </div>
        <div className="p-4 float-right mx-auto w-2/5 h-full">
            <h2 className="pb-5 text-center text-2xl font-bold text-black">{labels.title_signup}</h2>
            <form className="text-center" onSubmit={handleSubmit}>
            <div>
                <label className="text-left block" htmlFor="fullName">{labels.label_full_name}</label>
                <input
                type="text"
                id="fullName"
                value={fullName}
                required
                className="bg-gray-200 w-full mb-3 h-8 pl-2"
                />
            </div>

            <div>
                <label className="text-left block" htmlFor="email">{labels.label_email}</label>
                <input
                type="email"
                id="email"
                value={email}
                required
                className="bg-gray-200 w-full mb-3 h-8 pl-2"
                />
            </div>

            <div>
                <label className="text-left block" htmlFor="password">{labels.label_password}</label>
                <input
                type="password"
                id="password"
                value={password}
                required
                className="bg-gray-200 w-full mb-3 h-8 pl-2"
                />
            </div>

            <div>
                <label className="text-left block">
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required 
                />
                <span className="ml-2 text-sm">{labels.label_agree_terms}</span>
                </label>
            </div>

            <div>
                <button
                className="mt-4 mx-auto w-full h-8"
                type="submit"
                style={{
                    backgroundColor: '#0DA89B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
                >
                {labels.cta_signup}
                </button>
            </div>

            <div className="flex items-center justify-center mt-3">
                <label> {labels.label_have_an_account} </label>
                <Link href="login" className="ml-2 text-teal-500 font-semibold">
                <p>{labels.label_login}</p>
                </Link>
            </div>

            </form>
        </div>
        </div>
    )

}

export default SignupForm;