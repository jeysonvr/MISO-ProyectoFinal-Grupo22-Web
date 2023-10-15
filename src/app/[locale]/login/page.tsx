"use client";

import { useState } from "react";
import Link from "next/link";
//import { useTranslations } from 'next-intl';

export default function Login() {

  /*const loginLabels = useTranslations('login');
  const labelsLanguage = useTranslations('language');
  const languages = {
    english: labelsLanguage('en'),
    spanish: labelsLanguage('es'),
  };*/

  const [email, setEmail] = useState('pepitoperez@gmail.com');
  const [password, setPassword] = useState('micontraseña123');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (remember) {
      console.log('aceptando términos');
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
    } else {
      //alert('Debes aceptar los términos y condiciones para iniciar sesión.');
      console.log('no aceptando términos');
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
    }
  };   

  return (  
    <div style={{height: '70vh', backgroundColor:'white'}}>
      <div className="float-left mx-auto w-3/5 bg-teal-500 h-full flex justify-center items-center">
        <img className="w-80 h-80" src="/images/imageBackground.png"></img>
      </div>
      <div className="p-4 float-right mx-auto w-2/5 bg-white h-full">
        <h2 className="pb-5 text-center text-2xl font-bold text-black">Iniciar sesión</h2>
        <form className="text-center" onSubmit={handleSubmit}>
          <div>
            <label className="text-left block" htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email  }
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
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="ml-2 text-sm">Recuérdame</span>
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
              Iniciar sesión
            </button>
          </div>

          <div className="flex items-center justify-center mt-3">
            <label> ¿No tienes una cuenta? </label>
            <Link href="signup" className="ml-2 text-teal-500 font-semibold">
              <p>Crear cuenta</p>
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}
