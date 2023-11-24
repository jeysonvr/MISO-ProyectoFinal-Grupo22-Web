"use client";

import React, { Suspense, useState, useEffect } from "react";

import '../../../../app/globals.css';
import Button, { ButtonStyle } from '../../../components/button/Button';

const PerformanceReviewGrid = ({ labels }: any) => {
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isContainerOpen, setIsContainerOpen] = useState(false);

  const handleRowClick = (performanceReviewSelected: any) => {
    setSelectedRow(performanceReviewSelected);
    setIsContainerOpen(true);
  };

  const closeContainer = () => {
    setIsContainerOpen(false);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') ?? '{}');
    const userEmail = userData.email;

    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/info/${userEmail}`)
      .then(result => result.json())
      .then(data => {
        fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/contrato/2/${data.usuario.id}`)
          .then((result) => {
            if (result.status !== 200) {
              Promise.reject();
              return;
            }
            return result.json();
          })
          .then((data) => {
            setPerformanceReviews(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, []);

  const headers = [
    labels.label_company,
    labels.label_start_date,
    labels.label_end_date,
    labels.label_status,
    labels.label_evaluation
  ];

  const content = performanceReviews?.map(({ id, empresa, fecha_inicio, fecha_fin, activo, evaluacion_desempeño }: any) => {
    return {
      id,
      empresa,
      fecha_inicio,
      fecha_fin,
      estado: activo ? labels.label_active : labels.label_inactive,
      evaluacion_desempeño: evaluacion_desempeño,
      descripcion: evaluacion_desempeño?.descripcion
    }
  });

  return (
    <Suspense fallback={<p>{labels.label_loading}</p>}>
      {
        (!content || content.length === 0)
          ? (
            <p>{labels.label_no_content}</p>
          ) : (
            <div className="grid grid-cols-5">
              {headers.map((header: any, index: number) => (
                <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5 bg-[#FAFAFB]' key={index}>{header}</div>
              ))}
              {content.map((row: any, index: number) => (
                <>
                  <div className='text-[#565E6C] font-bold pt-5 pb-5 pl-5 pr-5' key={row.empresa.nombre_completo}>{row.empresa.nombre_completo}</div>
                  <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={row.fecha_inicio}>{row.fecha_inicio}</div>
                  <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={row.fecha_fin}>{row.fecha_fin}</div>
                  {row.estado === labels.label_active ? (
                    <div className='text-[#379AE6] font-light pt-5 pb-5 pl-5 pr-5' key={row.estado}>{row.estado}</div>
                  ):
                  (
                    <div className='text-[#DE3B40] font-light pt-5 pb-5 pl-5 pr-5' key={row.estado}>{row.estado}</div>
                  )}
                  {row.evaluacion_desempeño !== null ? (
                    <div className='text-[#0EA89BFF] font-light pt-5 pb-5 pl-5 pr-5 cursor-pointer' key={index} onClick={() => handleRowClick({
                      empresa: row.empresa.nombre_completo,
                      descripcion: row.descripcion
                    })}>{labels.label_watch}</div>
                  ):
                  (
                    <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5'>{labels.label_not_available}</div>
                  )}        
                </>
              ))}
            </div>
          )
      }
      {selectedRow !== null && (
        <div className="container mx-auto min-w-full"
          id="resultsPerformance"
          style={{
            display: isContainerOpen ? 'flex' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            justifyContent: 'center',
            alignItems: 'center'
          }} >
          {isContainerOpen && (
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '600px', width: '100%' }}>
              <form>
                <h2 className="text-xl font-bold mb-10 ml-5">Empresa: {selectedRow.empresa}</h2>
                <textarea className="text-gray-700 w-3/4 ml-5 justify-center" disabled>{selectedRow.descripcion}</textarea>
                <div className='text-right'>
                  <Button
                    style={ButtonStyle.secondary}
                    type={'button'}
                    text={labels.label_close}
                    onClick={closeContainer} />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </Suspense>
  );
}

export default PerformanceReviewGrid;
