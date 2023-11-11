'use client'
import React, { Suspense, useEffect, useState } from 'react';


function InterviewGrid({ labels }:any) {
  // consultar test por candidato id

 const [idUser, setIdUser] = useState();
 const [interviewsUser, setInterviewsUser] = useState([]);
 let email :string;
 
 useEffect(() => {
  email = JSON.parse(localStorage.getItem('user') || '{}').email;
  fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/info/${email}`)
  .then(res => res.json())
  .then(data => {
    setIdUser(data?.usuario?.id)
  })
  .catch(error => console.error('Error:', error));
 },[])


 useEffect(() => {
  if(idUser){
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/entrevista/${idUser}`)
    .then(res => res.json())
    .then(res => {
      setInterviewsUser(res)
    })
    .catch(error => console.error('Error:', error));;
  }
 }, [idUser]) 

  return (
    <Suspense fallback={<p>{labels.label_loading}</p>}>
      {interviewsUser.length === 0 && <p className='title'>{labels.label_not_interviews}</p>}
      {interviewsUser.length > 0 && (
        <div className="test-list" >
        <div className="grid grid-cols-4 bg-[#f7a46c] pt-5 pb-5 pl-5 border-solid">
          <div className='text-[#FFFFFF] font-bold'>{labels.label_subject}</div>
          <div className='text-[#FFFFFF] font-bold'>{labels.label_date}</div>
          <div className='text-[#FFFFFF] font-bold'>{labels.label_hour_start}</div>
          <div className='text-[#FFFFFF] font-bold'>{labels.label_hour_end}</div>
        </div>        
        {interviewsUser.map((interview:any, index: number) => (
          <>
          <div className="grid grid-cols-4 pt-5 pb-5 pl-5 border-solid border-2 border-b[#f7b080]">
            <div className='text-[#565E6C] font-light'>{interview.asunto}</div>
            <div className='text-[#565E6C] font-light'>{interview.fecha}</div>
            <div className='text-[#565E6C] font-light'>{interview.hora_inicio}</div>
            <div className='text-[#565E6C] font-light'>{interview.hora_fin}</div>
          </div>
          </>
        ))}
        </div>
      )}     
    </Suspense>
  );
}

export default InterviewGrid;