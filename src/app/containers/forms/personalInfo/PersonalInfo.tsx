import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

import PillEditor from "../../../components/pillEditor/PillEditor";

const PersonalInfoForm = ({ labels, metadata, profileData }: any) => {
  const { locale } = useParams();
  const languagesMetadata = metadata?.idiomas?.map(({ id, idioma }: any) => ({ id, value: idioma })) || [];
  const paisesMetadata = metadata?.paises?.map(({ id, pais }: any) => ({ id, value: pais })) || [];
  const softSkillsMetadata = metadata?.habilidadesBlandas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];
  const techSkillsMetadata = metadata?.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];

  const [selectedCountry, setSelectedCountry] = useState(profileData?.id_pais);

  const onSelectedCountryChange = (e: any) => {
    setSelectedCountry(e.target.value);
  }

  // Update country
  useEffect(() => {
    setSelectedCountry(profileData?.id_pais);
  }, [profileData?.id_pais]);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_personal_info}</h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_name}</label>
          <input
            type="text"
            minLength={3}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_name}
            defaultValue={profileData?.usuario?.nombre_completo}
            required />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_age}</label>
          <input
            type="number"
            id="age"
            min={18}
            max={99}
            defaultValue={profileData?.edad}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_age} required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_email}</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_email}
            defaultValue={profileData?.usuario?.email}
            disabled
            required />
        </div>
        <div>
          <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_phone}</label>
          <input type="tel" id="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_phone}
            defaultValue={profileData?.numero_telefono}
            required />
        </div>
      </div>

      <div>
        <label htmlFor="candidate_country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.select_country}</label>
        <select
          id="candidate_country"
          className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedCountry}
          onChange={onSelectedCountryChange}
        >
          {
            paisesMetadata.map(({ id, value }: any) => (
              <option
                key={id} value={id}>{value}</option>
            ))
          }
        </select>
      </div>

      <PillEditor
        title={labels.label_language}
        ctaLabel={labels.cta_add}
        id={'language'}
        elements={languagesMetadata}
        selectedPills={profileData?.idiomas?.map(({ id, idioma, idioma_en }: any) => ({
          pillValue: id,
          pillText: locale == 'en' ? idioma_en : idioma,
        }))}
      />
      <PillEditor
        title={labels.label_soft_skills}
        ctaLabel={labels.cta_add}
        id={'softSkills'}
        elements={softSkillsMetadata}
        selectedPills={profileData?.habilidadesBlandas?.map(({ id, descripcion, descripcion_en }: any) => ({
          pillValue: id,
          pillText: locale == 'en' ? descripcion_en : descripcion,
        }))}
      />
      <PillEditor
        title={labels.label_tech_skills}
        ctaLabel={labels.cta_add}
        id={'techSkills'}
        elements={techSkillsMetadata}
        selectedPills={profileData?.habilidadesTecnicas?.map(({ id, descripcion, descripcion_en }: any) => (
          {
            pillValue: id,
            pillText: locale == 'en' ? descripcion_en : descripcion,
          }))}
      />
    </div>
  )
}

export default PersonalInfoForm;
