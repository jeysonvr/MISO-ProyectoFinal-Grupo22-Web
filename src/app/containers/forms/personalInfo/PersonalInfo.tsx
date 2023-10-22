import PillEditor from "../../../components/pillEditor/PillEditor";

const PersonalInfoForm = ({ labels, metadata, profileData }: any) => {
  const languagesMetadata = metadata?.idiomas?.map(({ id, idioma }: any) => ({ id, value: idioma })) || [];
  const softSkillsMetadata = metadata?.habilidadesBlandas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];
  const techSkillsMetadata = metadata?.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];

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
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_phone}</label>
          <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_phone}
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            defaultValue={profileData?.numero_telefono}
            required />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.select_country}</label>
        <input type="tel" id="phone" className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={labels.select_country}
          defaultValue={profileData?.id_pais}
          required />
      </div>

      <PillEditor
        title={labels.label_language}
        ctaLabel={labels.cta_add}
        id={'language'}
        elements={languagesMetadata}
        selectedPills={profileData?.idiomas}
      />
      <PillEditor
        title={labels.label_soft_skills}
        ctaLabel={labels.cta_add}
        id={'softSkills'}
        elements={softSkillsMetadata}
        selectedPills={profileData?.habilidadesBlandas?.map(({ descripcion }: any) => (descripcion))}
      />
      <PillEditor
        title={labels.label_tech_skills}
        ctaLabel={labels.cta_add}
        id={'techSkills'}
        elements={techSkillsMetadata}
        selectedPills={profileData?.habilidadesTecnicas?.map(({ descripcion }: any) => (descripcion))}
      />
    </div>
  )
}

export default PersonalInfoForm;
