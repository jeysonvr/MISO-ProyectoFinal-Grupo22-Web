'use client'

import { useEffect } from 'react';

const EmployeeEvaluationForm = ({ labels, metadata, onIdContractChange}: any) => {

    const idContract = metadata.id;

    console.log('metadata');
    console.log(metadata);

    useEffect(() => {
      onIdContractChange(idContract);
      }, [idContract, onIdContractChange]);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center" id='create_project'>
      <div className="grid gap-6 md:grid-cols-1">
        <div>
          <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_name}</label>
          <input
            type="text"
            minLength={3}
            id="projectName"
            defaultValue={metadata.empleado.nombre_completo}
            className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled />
        </div>
        
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_evaluation}</label>
          <textarea
            rows={2}
            minLength={3}
            id="description"
            defaultValue={metadata.evaluacion_desempeño ? metadata.evaluacion_desempeño.descripcion : ''}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required />
        </div>
      </div>
    </div>
  )
}

export default EmployeeEvaluationForm;
