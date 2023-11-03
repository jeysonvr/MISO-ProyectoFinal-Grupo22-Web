import React from 'react';
import TestItem from './TestItem'; // Importa el componente TestItem

function TestGrid({ tests, labels }:any) {
  return (
    <div className="test-list" >
      <div className="grid grid-cols-3 bg-[#fafafb] pt-5 pb-5 pl-5">
        <div className='text-[#565E6C] font-light'>{labels.label_name_test}</div>
        <div className='text-[#565E6C] font-light'>{labels.label_status}</div>
        <div className='text-[#565E6C] font-bold'>{labels.label_result}</div>
      </div>
      {tests.map((test:any, index: number) => (
        <TestItem key={index} test={test} labels={labels}/>
      ))}
    </div>
  );
}

export default TestGrid;