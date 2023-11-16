'use client'
import React, { Suspense } from 'react';

function Grid({ labels, headers, content=[] }:any) {
 return (
    <Suspense fallback={<p>{labels.label_loading}</p>}>
      {content.length === 0 && <p className="my-2">{labels.label_no_content}</p>}
      {content.length > 0 && (
        <div className="grid grid-cols-3 bg-[#fafafb]">
            {headers.map((header:any, index: number) => (
                <div className='text-[#565E6C] font-bold pt-5 pb-5 pl-5 pr-5' key={index}>{header}</div>
            ))}
            {content.map((row:any, index: number) => (
                <>
                    <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={index}>{row.nombre}</div>
                    <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={index}>{row.descripcion}</div>
                    <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={index}>{row.estado}</div>
                </>
            ))}
        </div>
      )}     
    </Suspense>
  );
}

export default Grid;