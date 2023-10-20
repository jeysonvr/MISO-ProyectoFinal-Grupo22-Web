"use client";

import { useCallback, useRef, useState } from 'react';

export interface IPillEditor {
  title: string;
  placeHolder?: string;
  ctaLabel: string;
  pillsAmountLimit?: number;
  id: string;
}

const PillEditor = ({ title, placeHolder, ctaLabel, pillsAmountLimit = 5, id }: IPillEditor) => {
  const [inputValue, setInputValue] = useState('');
  const [pillsList, setPillsList] = useState<string[]>([]);
  const inputRef = useRef<any>(null);

  const handleAddPill = useCallback(() => {
    if (!inputRef.current?.value) return;

    const newPillValue = inputRef.current?.value;
    setPillsList((pills) => {
      // Set a limit for pills amount
      if (pills.length >= pillsAmountLimit || pills.some((pill) => pill === newPillValue)) return [...pills];
      return [...pills, newPillValue];
    });
    setInputValue('');
  }, [inputRef, pillsAmountLimit]);

  const handleDeletePill = useCallback((e: any) => {
    setPillsList((pills) => {
      return [...pills.filter((pill) => pill !== e.target.value)]
    });
  }, []);

  return (
    <div className='mb-4'>
      <input hidden defaultValue={pillsList.join()} id={id} />
      <strong>{title}</strong>
      <div className='grid grid-cols-3'>
        <ul
          className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row col-span-2"
          role="tablist"
          data-te-nav-ref>
          {pillsList.map((pill, index) => (
            <div className="no-underline bg-teal-600 text-white font-sans font-semibold focus:outline-none mr-2 my-2 rounded" key={'pill-' + index}>
              <span className='text-xs font-medium leading-tight text-white h-8 px-8'>{pill}</span>
              <button
                style={{ padding: '2px 4px' }}
                onClick={handleDeletePill} value={pill} tabIndex={index}>x</button>
            </div>
          ))
          }
        </ul >
        <div className='grid grid-cols-2 h-2'>
          <input
            ref={inputRef}
            value={inputValue}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeHolder}
            maxLength={10}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className='my-auto mx-2 flex'
            onClick={handleAddPill}
            type='button'>+ {ctaLabel}</button>
        </div>
      </div >
    </div>
  )
}

export default PillEditor;
