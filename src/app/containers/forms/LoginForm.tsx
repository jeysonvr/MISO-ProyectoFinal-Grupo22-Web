"use client";

import { useCallback } from 'react';
import { useState } from "react";
import Link from "next/link";

import toast from 'react-hot-toast';

import '../../globals.css';
import { UserType, UserTypeEnum } from '../../contants/userType';
import { UrlPath } from '../../contants/urlPath';

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

        const toastWait = toast.loading(labels.alert_please_wait);
        await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/registro/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(resp => {
                if (resp.status !== 200) {
                    return Promise.reject();
                };
                return resp.json();
            })
            .then(data => {
                // Successfully logged in
                localStorage.setItem('user', JSON.stringify(
                    { email: data.usuario, type: UserTypeEnum[data.id_tipo_usuario] }
                ));
                toast.dismiss(toastWait);
                toast.success(labels.alert_login_success);
                if (UserTypeEnum[data.id_tipo_usuario] !== UserType.recruiter) window.location.href = UrlPath.profile;
                else window.location.href = UrlPath.interviews;
            })
            .catch(() => {
                toast.dismiss(toastWait);
                toast.error(labels.alert_try_again);
            });
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
