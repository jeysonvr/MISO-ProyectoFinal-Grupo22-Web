"use client";

import { useCallback, useRef, useState, useEffect } from 'react';

export interface IPillEditor {
  title: string;
  placeHolder?: string;
  ctaLabel: string;
  pillsAmountLimit?: number;
  id: string;
  type?: string;
  elements?: any[];
  selectedPills?: string[];
  isMultiSelector?: boolean;
}

const PillEditor = ({
  title,
  placeHolder,
  ctaLabel,
  pillsAmountLimit = 5,
  id,
  type = 'select',
  elements,
  selectedPills,
  isMultiSelector,
}: IPillEditor) => {
  const [inputValue, setInputValue] = useState('');
  const [pillsList, setPillsList] = useState<any[]>([]);

  const inputRef = useRef<any>(null);
  const extraInputRef = useRef<any>(null); // Use for secondary selector

  const [secondarySelectorData, setSecondarySelectorData] = useState(elements?.[0]?.extraData);

  const handleSelectorChange = useCallback(() => {
    if (!isMultiSelector || !inputRef.current?.value) return;

    const selectorValue = inputRef.current?.value;
    elements?.find(({ id, value, extraData }) => {
      if (id == selectorValue) {
        setSecondarySelectorData(extraData);
      }
    });
  }, [isMultiSelector, elements]);

  const handleAddPill = useCallback(() => {
    if (!inputRef.current?.value) return;

    const pillValue = inputRef.current.value;
    const pillText = type === 'input' ? inputRef.current.value : inputRef.current.options[inputRef.current.selectedIndex].text;

    // const newPillValue = (isMultiSelector ? extraInputRef.current?.value + '/' : '') + inputRef.current?.value;
    // If Multiselector
    const pillExtraValue = isMultiSelector && extraInputRef.current ? extraInputRef.current.value : null;
    const pillExtraText = isMultiSelector && extraInputRef.current ? extraInputRef.current.options[extraInputRef.current.selectedIndex]?.text : null;

    setPillsList((pills) => {
      // Do not add if value (id) already exist (Single selector)
      if (pills.some((pill) => pill.pillValue == pillValue)) {
        if (!isMultiSelector) return [...pills];
        // Check if multiselector
        if (pills.some((pill) => pill.pillExtraValue == pillExtraValue)) return [...pills];
      }

      return [...pills, { pillValue, pillText, pillExtraValue, pillExtraText }];
    })
    setInputValue('');
  }, [pillsAmountLimit, isMultiSelector, type]);

  const handleDeletePill = useCallback((e: any) => {
    e.preventDefault();
    if (isMultiSelector) {
      setPillsList((pills) => {
        return [...pills.filter((pill) => pill.pillValue + '-' + pill.pillExtraValue != e.target.value)]
      });
      return;
    }

    setPillsList((pills) => {
      return [...pills.filter((pill) => pill.pillValue != e.target.value)]
    });
  }, [isMultiSelector]);

  // Update pills
  useEffect(() => {
    if (!selectedPills) return;

    setPillsList(selectedPills);
  }, [selectedPills]);

  // Update secondary select
  useEffect(() => {
    if (!elements?.[0]?.extraData) return;
    setSecondarySelectorData(elements?.[0]?.extraData);
  }, [elements]);

  return (
    <div className='mb-4'>
      <input hidden defaultValue={pillsList?.map(pills => isMultiSelector ? pills.pillExtraValue : pills.pillValue)?.join()} id={id} />
      <strong>{title}</strong>
      <div className='grid grid-cols-3'>
        <div className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row col-span-2">
          {pillsList?.map(({ pillValue, pillText, pillExtraValue, pillExtraText }, index) => (
            <div className="no-underline bg-teal-700 text-white font-sans font-semibold focus:outline-none mr-2 my-2 rounded" key={'pill-' + index}>
              <span className='text-xs font-medium leading-tight text-white h-8 px-8'>{`${pillExtraText ? pillExtraText + ',' : ''}${pillText}`}</span>
              <button
                style={{ padding: '2px 4px' }}
                onClick={handleDeletePill} value={pillValue + `${pillExtraValue ? '-' + pillExtraValue : ''}`} tabIndex={index}>x</button>
            </div>
          ))
          }
        </div>
        <div className={`grid ${!isMultiSelector ? 'grid-cols-2' : ''} ${isMultiSelector ? 'grid-cols-3' : ''} h-2`}>
          {
            (type === 'select') ? (
              <>
                <select
                  ref={inputRef}
                  onChange={handleSelectorChange}
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {
                    elements?.map(({ id, value }: any, index) => (
                      <option
                        value={id}
                        key={'option-' + id}>{value}</option>
                    ))
                  }
                </select>
                {
                  isMultiSelector && (
                    <select
                      ref={extraInputRef}
                      id=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={secondarySelectorData?.[0]?.value}
                    >
                      {
                        secondarySelectorData?.map(({ id, value }: any) => (
                          <option value={id} key={'extra-option-' + id}>{value}</option>
                        ))
                      }
                    </select>
                  )
                }
              </>
            ) : (
              <input
                ref={inputRef}
                value={inputValue}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeHolder}
                maxLength={10}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )
          }
          <button
            className='my-auto mx-2 flex'
            onClick={handleAddPill}
            type='button'>+ {ctaLabel}</button>
        </div>
      </div >
    </div >
  )
}

export default PillEditor;
