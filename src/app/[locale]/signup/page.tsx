"use client";

import { useState } from "react";
import Link from "next/link";

export default function Signup() {

  const [fullName, setFullName] = useState('Pepito Pérez');
  const [email, setEmail] = useState('pepitoperez@gmail.com');
  const [password, setPassword] = useState('micontraseña123');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (termsAccepted) {
      console.log('Nombre completo:', fullName);
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
    } else {
      alert('Debes aceptar los términos y condiciones para iniciar sesión.');
    }
  }; 

  return (
    <div style={{height: '70vh', backgroundColor:'white'}}>
      <div className="float-left mx-auto w-3/5 bg-teal-500 h-full flex justify-center items-center">
        <img className="w-80 h-80" src="/images/imageBackground.png"></img>
      </div>
      <div className="p-4 float-right mx-auto w-2/5 h-full">
        <h2 className="pb-5 text-center text-2xl font-bold text-black">Registro</h2>
        <form className="text-center" onSubmit={handleSubmit}>
          <div>
            <label className="text-left block" htmlFor="fullName">Nombre completo:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              required
              className="bg-gray-200 w-full mb-3 h-8 pl-2"
            />
          </div>

          <div>
            <label className="text-left block" htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              className="bg-gray-200 w-full mb-3 h-8 pl-2"
            />
          </div>

          <div>
            <label className="text-left block" htmlFor="password">Contraseña:</label>
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
              <span className="ml-2 text-sm">Estoy de acuerdo con los términos de uso y política de privacidad</span>
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
              Registrarme
            </button>
          </div>

          <div className="flex items-center justify-center mt-3">
            <label> ¿Tienes una cuenta? </label>
            <Link href="login" className="ml-2 text-teal-500 font-semibold">
              <p>Iniciar sesión</p>
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}
