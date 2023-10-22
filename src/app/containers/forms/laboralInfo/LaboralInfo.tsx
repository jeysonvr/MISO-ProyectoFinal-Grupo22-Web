import Button, { ButtonStyle, IconType } from '../../../components/button/Button';
import { useCallback, useEffect, useState } from 'react';

interface ILaboralRegisters {
  nombre_empresa: string;
  actual: boolean;
  title: string;
  fecha_inicion: string;
  fecha_fin: string;
  descripcion_actividades: string;
  Rol: {
    rol: string;
  }
}

const EMPTY_REGISTER = {
  nombre_empresa: '',
  actual: false,
  title: '',
  fecha_inicion: '',
  fecha_fin: '',
  descripcion_actividades: '',
  Rol: {
    rol: '',
  }
}

const LaboralInfoForm = ({ labels, metadata, profileData }: any) => {
  const rolMetadata = metadata?.roles?.map(({ id, rol }: any) => ({ id, value: rol })) || [];

  const [laboralRegisters, setLaboralRegisters] = useState<ILaboralRegisters[]>(profileData?.experiencia || [EMPTY_REGISTER]);
  const [isInProgress, setIsInProgress] = useState(false);

  const handleAddRegister = useCallback(() => {
    setLaboralRegisters((laboralRegisters) => [...laboralRegisters, EMPTY_REGISTER])
  }, []);

  const handleRemoveRegister = useCallback(() => {
    setLaboralRegisters((laboralRegisters) => {
      if (laboralRegisters.length <= 1) return [...laboralRegisters];

      return [...laboralRegisters.slice(0, laboralRegisters.length - 1)];
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

  // Update laboral info
  useEffect(() => {
    setLaboralRegisters(profileData?.experiencia || [EMPTY_REGISTER]);
  }, [profileData?.experiencia]);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center mt-2">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_laboral_info}</h5>
      {
        laboralRegisters.map((register, idx) => (
          <div className="grid gap-6 my-16 md:grid-cols-2" key={'laboralRegister' + idx}>
            <div className='col-span-2'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_company}</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_company}
                defaultValue={register?.nombre_empresa}
              />
            </div>

            <div>
              <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_role}</label>
              <select id="rol" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {
                  rolMetadata.map(({ id, value }: any) => (
                    <option
                      value={value} key={'rol-' + id}
                      defaultChecked={register?.Rol?.rol === value}
                    >{value}</option>
                  ))
                }
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="checked-checkbox"
                type="checkbox"
                onChange={handleInProgressCheck}
                defaultChecked={register?.actual}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labels.label_current_job}</label>
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_start_date}</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_start_date}
                defaultValue={register?.fecha_inicion}
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_end_date}</label>
              <input
                type="text"
                id="name"
                disabled={isInProgress}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${isInProgress ? 'disabled:opacity-50' : ''}`}
                defaultValue={register?.fecha_fin}
                placeholder={labels.label_end_date} />
            </div>

            <div className='col-span-2'>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_activity_description}</label>
              <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={labels.label_activity_description}
                defaultValue={register?.descripcion_actividades}
              ></textarea>
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

export default LaboralInfoForm;
