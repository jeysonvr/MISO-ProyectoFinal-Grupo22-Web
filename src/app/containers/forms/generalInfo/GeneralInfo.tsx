'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import PillEditor from "../../../components/pillEditor/PillEditor";

const GeneralInfoForm = ({ labels, metadata, profileData }: any) => {
  const { locale } = useParams();
  const [selectedCompanyType, setSelectedCompanyType] = useState(profileData?.id_tipo_empresa);
  const companyTypesMetadata = metadata?.tipos_empresa?.map(({ id, tipo_empresa }: any) => ({ id, value: tipo_empresa })) || [];

  const businessVerticalsMetadata = metadata?.areas_negocio?.map((area: any) => ({ id: area.id, value: area.descripcion })) || [];
  const locationsMetadata = metadata?.paises?.map((ubicacion: any) => (
    {
      id: ubicacion.id,
      value: ubicacion.pais,
      extraData: ubicacion.ciudads.map((ciudad: any) => ({ id: ciudad.id, value: ciudad.ciudad })),
    }
  )) || [];

  const onSelectedCompanyType = (e: any) => {
    setSelectedCompanyType(e.target.value);
  }

  // Update company type
  useEffect(() => {
    setSelectedCompanyType(profileData?.id_tipo_empresa);
  }, [profileData?.id_tipo_empresa]);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_general_info}</h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_name}</label>
          <input
            type="text"
            minLength={3}
            id="companyName"
            defaultValue={profileData?.usuario?.nombre_completo}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_name} required />
        </div>
        <div>
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_business_type}</label>
          <select
            id="company_type"
            className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedCompanyType}
            onChange={onSelectedCompanyType}
          >
            {
              companyTypesMetadata.map(({ id, value }: any) => (
                <option
                  key={id} value={id}>{value}</option>
              ))
            }
          </select>
        </div>
      </div>

      <PillEditor
        title={labels.label_business_vertical}
        ctaLabel={labels.cta_add}
        id={'business_vertical_selector'}
        elements={businessVerticalsMetadata}
        selectedPills={profileData?.areasNegocio?.map(({ id, descripcion, descripcion_en }: any) => ({
          pillValue: id,
          pillText: locale == 'en' ? descripcion_en : descripcion,
        }))}
      />

      <PillEditor
        title={labels.label_ubication}
        ctaLabel={labels.cta_add}
        id={'ubication_selector'}
        elements={locationsMetadata}
        isMultiSelector={true}
        selectedPills={profileData?.ciudades?.map(({ id, id_pais, ciudad, pai }: any) => ({
          pillValue: id_pais,
          pillText: locale == 'en' ? pai?.pais_en : pai?.pais,
          pillExtraValue: id,
          pillExtraText: ciudad,
        }))}
      />
    </div>
  )
}

export default GeneralInfoForm;
