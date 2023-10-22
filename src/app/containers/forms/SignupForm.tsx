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

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value); 
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value); 
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); 
    };

    const handleSubmit = useCallback(async (e:any) => {
        e.preventDefault();

        const formData = {
            nombre_completo: fullName,
            email,
            contrasena: password,
            id_tipo_usuario: 1
        };

        console.log('Object body:', formData);

        try {
            const response = await fetch('https://34.117.49.114/registro/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseBody = await response.json();
            console.log('Response body:', responseBody);

        } catch (error) {
            console.error('Request failed', error);
        }
        
    }, [fullName, email, password]); 

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
                required
                className="bg-gray-200 w-full mb-3 h-8 pl-2"
                value={fullName} 
                onChange={handleFullNameChange} 
                />
            </div>

            <div>
                <label className="text-left block" htmlFor="email">{labels.label_email}</label>
                <input
                type="email"
                id="email"
                required
                className="bg-gray-200 w-full mb-3 h-8 pl-2"
                value={email} 
                onChange={handleEmailChange} 
                />
            </div>

            <div>
                <label className="text-left block" htmlFor="password">{labels.label_password}</label>
                <input
                type="password"
                id="password"
                required
                className="bg-gray-200 w-full mb-3 h-8 pl-2"
                value={password} 
                onChange={handlePasswordChange} 
                />
            </div>

            <div>
                <label className="text-left block">
                <input
                    type="checkbox"
                    id='terms'
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
                id='signupBtn'
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