'use client'
import React, { Suspense, useEffect, useState } from 'react';
import TestItem from './TestItem'; // Importa el componente TestItem


function TestGrid({ labels }:any) {
  // consultar test por candidato id

 const [infoIdUser, setUser] = useState();
 const [testsUser, setTestsUser] = useState([]);
 let email :string;
 
 useEffect(() => {
  email = JSON.parse(localStorage.getItem('user') ?? '{}').email;
  fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/info/${email}`)
  .then(res => res.json())
  .then(data => {
    setUser(data?.id)
  })
 },[])


 useEffect(() => {
  if(infoIdUser){
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/obtener/${infoIdUser}`)
    .then(res => res.json())
    .then(res => {
      setTestsUser(res)
    })
  }
 }, [infoIdUser]) 

  return (
    <Suspense fallback={<p>{labels.label_loading}</p>}>
      {testsUser.length === 0 && <p>{labels.label_not_test}</p>}
      {testsUser.length > 0 && (
        <div className="test-list" >
        <div className="grid grid-cols-3 bg-[#fafafb] pt-5 pb-5 pl-5">
          <div className='text-[#565E6C] font-light'>{labels.label_name_test}</div>
          <div className='text-[#565E6C] font-light'>{labels.label_status}</div>
          <div className='text-[#565E6C] font-bold'>{labels.label_result}</div>
        </div>        
        {testsUser.map((test:any, index: number) => (
          <TestItem key={index} test={test} labels={labels}/>
        ))}
        </div>
      )}     
    </Suspense>
  );
}

export default TestGrid;
