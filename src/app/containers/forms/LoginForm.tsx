"use client";

import { useCallback } from 'react';
import { useState } from "react";
import Link from "next/link";
import '../../globals.css';

const LoginForm = ({ labels }: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();

        const formData = {
            email,
            contrasena: password
        };

        try {
            const responseBody = await fetch('https://34.117.49.114/registro/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(resp => resp.json())
                .catch(error => console.error('Error:', error));

            let userType: string = 'company';
            if (responseBody.id_tipo_usuario == 1) {
                userType = 'candidate';
            }

            localStorage.setItem('user', JSON.stringify({ email: email, type: userType }))

        } catch (error) {
            console.error('Request failed', error);
        }

    }, [email, password]);

    return (
        <div style={{ height: '70vh', backgroundColor: 'white' }}>
            <div className="float-left mx-auto w-3/5 bg-teal-500 h-full flex justify-center items-center">
                <img className="w-80 h-80" src="/images/imageBackground.png" alt='Background Image'></img>
            </div>
            <div className="p-4 float-right mx-auto w-2/5 bg-white h-full">
                <h2 className="pb-5 text-center text-2xl font-bold text-black">{labels.title_login}</h2>
                <form className="text-center" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-left block" htmlFor="email">{labels.label_email}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
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
                            onChange={handlePasswordChange}
                            required
                            className="bg-gray-200 w-full mb-3 h-8 pl-2"
                        />
                    </div>

                    <div>
                        <label className="text-left block">
                            <input
                                type="checkbox"
                                id='remember'
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <span className="ml-2 text-sm">{labels.label_remember}</span>
                        </label>
                    </div>

                    <div>
                        <button
                            className="mt-4 mx-auto w-full h-8"
                            id='loginBtn'
                            type="submit"
                            style={{
                                backgroundColor: '#0DA89B',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            {labels.cta_login}
                        </button>
                    </div>

                    <div className="flex items-center justify-center mt-3">
                        <label> {labels.label_have_an_account} </label>
                        <Link href="signup" className="ml-2 text-teal-500 font-semibold">
                            <p>{labels.label_create_account}</p>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default LoginForm;
