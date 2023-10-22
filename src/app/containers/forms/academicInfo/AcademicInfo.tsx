import { useCallback, useEffect, useState } from 'react';

import Button, { ButtonStyle, IconType } from '../../../components/button/Button';

interface IAcademicRegister {
  institucion: string;
  titulo: string;
  en_curso: boolean;
  fecha_inicio: string;
  fecha_fin: string;
}

const EMPTY_REGISTER = {
  institucion: '',
  titulo: '',
  en_curso: false,
  fecha_inicio: '',
  fecha_fin: '',
}

const AcademicInfoForm = ({ labels, profileData }: any) => {
  const [academicRegisters, setAcademicRegisters] = useState<IAcademicRegister[]>(profileData?.informacionAcademica || [EMPTY_REGISTER]);
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

  // Update academic info
  useEffect(() => {
    setAcademicRegisters(profileData?.informacionAcademica || [EMPTY_REGISTER]);
  }, [profileData?.informacionAcademica]);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center mt-2">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_academic_info}</h5>
      {
        academicRegisters.map((register, idx) => (
          <div className="grid gap-6 my-16 md:grid-cols-2" key={'academicRegister' + idx}>
            <div className='col-span-2'>
              <label htmlFor="educative_institution_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_educative_institution}</label>
              <input type="text" id="educative_institution_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_educative_institution}
                defaultValue={register?.institucion}
              />
            </div>

            <div>
              <label htmlFor="academic_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_title}</label>
              <input
                type="text" id="academic_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_title}
                defaultValue={register?.titulo}
              />
            </div>
            <div className="flex items-center">
              <input
                id="academic_inProgress"
                type="checkbox"
                defaultChecked={register?.en_curso}
                onChange={handleInProgressCheck}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="academic_inProgress" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labels.label_in_progress}</label>
            </div>
            <div>
              <label htmlFor="academic_startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_start_date}</label>
              <input type="text" id="academic_startDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_start_date}
                defaultValue={register?.fecha_inicio}
              />
            </div>
            <div>
              <label htmlFor="academic_endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_end_date}</label>
              <input
                type="text"
                id="academic_endDate"
                disabled={isInProgress}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${isInProgress ? 'disabled:opacity-50' : ''}`}
                placeholder={labels.label_end_date}
                defaultValue={register?.fecha_fin}
              />
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
