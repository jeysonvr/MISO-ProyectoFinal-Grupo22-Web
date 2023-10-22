import { useCallback, useState } from 'react';

import Button, { ButtonStyle, IconType } from '../../../components/button/Button';

interface IAcademicRegister {
  institution: string;
  title: string;
  startDate: string;
  endDate: string;
}

const EMPTY_REGISTER = {
  institution: '',
  title: '',
  startDate: '',
  endDate: '',
}

const AcademicInfoForm = ({ labels }: any) => {
  const [academicRegisters, setAcademicRegisters] = useState<IAcademicRegister[]>([EMPTY_REGISTER]);
  const [isInProgress, setIsInProgress] = useState(false);

  const handleAddRegister = useCallback(() => {
    setAcademicRegisters((academicRegisters) => [...academicRegisters, EMPTY_REGISTER])
  }, []);

  const handleRemoveRegister = useCallback(() => {
    setAcademicRegisters((academicRegisters) => {
      if (academicRegisters.length <= 1) return [...academicRegisters];

      return [...academicRegisters.slice(0, academicRegisters.length - 1)];
    });
  }, []);

  const handleInProgressCheck = useCallback((e: any) => {
    const { checked } = e.target;
    if (checked) {
      setIsInProgress(true);
      return;
    }
    setIsInProgress(false);
  }, []);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center mt-2">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_academic_info}</h5>
      {
        academicRegisters.map((register, idx) => (
          <div className="grid gap-6 my-16 md:grid-cols-2" key={'academicRegister' + idx}>
            <div className='col-span-2'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_educative_institution}</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_educative_institution} />
            </div>

            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_title}</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_title} />
            </div>
            <div className="flex items-center">
              <input
                id="checked-checkbox"
                type="checkbox"
                value=""
                onChange={handleInProgressCheck}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labels.label_in_progress}</label>
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_start_date}</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_start_date} />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_end_date}</label>
              <input
                type="text"
                id="name"
                disabled={isInProgress}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${isInProgress ? 'disabled:opacity-50' : ''}`}
                placeholder={labels.label_end_date} />
            </div>
          </div>
        ))
      }
      <hr />
      <div className='text-right'>
        <Button
          style={ButtonStyle.primary}
          type={'button'}
          icon={IconType.trash}
          text={labels.cta_remove}
          onClick={handleRemoveRegister}
        />
        <Button
          style={ButtonStyle.primary}
          type={'button'}
          icon={IconType.plus}
          text={labels.cta_add}
          onClick={handleAddRegister}
        />
      </div>
    </div>
  )
}

export default AcademicInfoForm;
