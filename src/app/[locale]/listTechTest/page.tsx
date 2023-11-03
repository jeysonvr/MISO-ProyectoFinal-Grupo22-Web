import { useTranslations } from 'next-intl';

import React, { useEffect } from 'react';
import TestGrid from '../../containers/forms/techTest/TestGrid/TestGrid';
import Quiz from '../../containers/forms/techTest/TechTest';

//llamado be

const questions = [
  { id: 1, text: '¿Cuál es la capital de Francia?', options: [1,2,3] },
  { id: 2, text: '¿Cuántos planetas hay en el sistema solar?', options: [1,2,3] },
  // Agregar más preguntas aquí
];


export default function TechTest() {
  
 
  // async function fetchData() {
  //   try {
  //     console.log('fetchhhhhhhh')
  //     // el usuario candidato cuando se crea debe ponerse una prueba para hacer basica, preguntas en este caso 5 hardcode
  //   get para saber las pruebas pendientes ** faltaria
  //     // revisar si el usuario ya presento la prueba
  //     // si no la presento mostrar el boton presetnar, clic boton  request iniciar prueba cambiar estado,
            // request primera preguntar, enviando el id de evalaucion. devuelve: pregunta, options: id y valor
            // request enviar respuests : id evaluacion, id pregunta, id prespuesta. 
            // si se recibe time out, request terminar evalaucion y sacar al usuario
            // repite hasta 5
            // request - ultima pregunta : no hay preguntas , cerrar evaluación. validacion
            // request terminar evalaucion -- resultado, calificacion, ultimo nivel.
            // mostraria resultado y se cerraria la prueba.

  //     // si ya a presento mostrar ok, o si se vencio mostrar inhabilitado

// total endpoint:
  /*
  1. crear prueba creando candidato *
  2. get de pruebas todas, no paginara  
  3. iniciar prueba
  4. get pregunta *
  5. responder pregunta ---> validar respuesta time out o no hay mas *
  6. terminar prueba ---> resultado *
  **/

  //     // const response = await fetch(`http://34.117.49.114/empresa/healthcheck`);
  //     // console.log(response.status)
  //     // if (response) {
  //     //   console.log('fetchhhhhhhh dentro')
  //     //   console.log(response)
  //     //   // const jsonData = await response.json();
  //     //   // setData(jsonData);
  //     // } else {
  //     //   throw new Error('Error al obtener datos');
  //     // }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  // fetchData();
  const tests = [
    {
      title: 'Prueba 1',
      description: 'Descripción de la Prueba 1',
      estado: 'pendiente',
      resultado:null,
      vencida: false,
    },
    {
      title: 'Prueba 2',
      description: 'Descripción de la Prueba 2',
      estado: 'vencida',
      resultado:'0',
      vencida: true,
    },
    {
      title: 'Prueba 3',
      description: 'Descripción de la Prueba 3',
      estado: 'presentada',
      resultado:'100',
      vencida: false,
    },
    // Agrega más pruebas según sea necesario
  ];
  const labels = useTranslations('tech_test');
  const testLabels = {
    title_cancel: labels('cta_cancel'),
    title_next: labels('cta_next'),
    title_send: labels('cta_send'),
    title_test: labels('label_test'),
    label_question: labels('label_question'),
    label_of: labels('label_of'),
    cta_finiched_test: labels('cta_finiched_test'),
    label_name_test: labels('label_name_test'),
    label_status: labels("label_status"),
    label_result: labels("label_result"),
    label_pending: labels("label_pending"),
    label_expired: labels("label_expired"),
    label_ready: labels("label_ready"),
    label_present: labels("label_present"),
  };
    return (
      <main className="flex flex-col justify-between p-16 container m-auto">
        <h1 className="mb-12 text-2xl font-bold tracking-tight text-gray-900 text-4xl">{labels('main_title')}</h1>
        <TestGrid tests={tests} labels={testLabels} />
      </main>
    )
}
  