'use client'
import React, { useCallback, useEffect, useState } from 'react';

import Button, { ButtonStyle } from '../../components/button/Button';
import Modal from '../../components/modal/Modal';

function InterviewGrid({ labels }: any) {
  const [idUser, setIdUser] = useState();
  const [interviewsUser, setInterviewsUser] = useState([]);
  const [isResulModalOpen, setIsResulModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState('');

  const onCloseModal = useCallback(() => {
    setIsResulModalOpen(false);
    setModalBody('');
  }, []);

  const onOpenModal = useCallback((result: string) => {
    if (!result) return;

    setModalBody(result);
    setIsResulModalOpen(true);
  }, []);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user') || '{}').email;
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/info/${email}`)
      .then(res => res.json())
      .then(data => {
        setIdUser(data?.usuario?.id)
      })
      .catch(error => console.error('Error:', error));
  }, [])


  useEffect(() => {
    if (!idUser) return;

    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/entrevista/${idUser}`)
      .then(res => res.json())
      .then(res => {
        setInterviewsUser(res)
      })
      .catch(error => console.error('Error:', error));;
  }, [idUser])

  return (
    <>
      {
        !interviewsUser?.length ? (
          <p className='title'>{labels.label_not_interviews}</p>
        ) : (
          <>
            {
              isResulModalOpen && (
                <Modal
                  title={labels.label_resuls}
                  body={modalBody}
                  onClose={onCloseModal}
                />
              )
            }
            <div className="grid grid-cols-5 bg-[#f7a46c] pt-5 pb-5 pl-5 border-solid">
              <div className='text-[#FFFFFF] font-bold'>{labels.label_subject}</div>
              <div className='text-[#FFFFFF] font-bold'>{labels.label_date}</div>
              <div className='text-[#FFFFFF] font-bold'>{labels.label_hour_start}</div>
              <div className='text-[#FFFFFF] font-bold'>{labels.label_hour_end}</div>
              <div className='text-[#FFFFFF] font-bold'>{labels.label_resuls}</div>
            </div>
            {interviewsUser.map((interview: any, index: number) => (
              <div
                key={`interviewBody-${index}`}
                className="grid grid-cols-5 pt-5 pb-5 pl-5 border-solid border-2 border-b[#f7b080]">
                <div className='text-[#565E6C] font-light'>{interview.asunto}</div>
                <div className='text-[#565E6C] font-light'>{interview.fecha}</div>
                <div className='text-[#565E6C] font-light'>{interview.hora_inicio}</div>
                <div className='text-[#565E6C] font-light'>{interview.hora_fin}</div>
                <div>
                  <Button
                    style={ButtonStyle.primary}
                    text={labels.cta_results}
                    classOverrides={`px-6 ${!interview?.resultados ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => onOpenModal(interview?.resultados)}
                  />
                </div>
              </div>
            ))}
          </>
        )
      }
    </>
  );
}

export default InterviewGrid;
