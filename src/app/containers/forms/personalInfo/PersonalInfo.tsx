import PillEditor from "../../../components/pillEditor/PillEditor";

const PersonalInfoForm = ({ labels }: any) => {
  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_personal_info}</h5>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_name}</label>
          <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_name} required />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_age}</label>
          <input type="text" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_age} required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_email}</label>
          <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_email} required />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_phone}</label>
          <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_phone} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
      </div>

      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.select_country}</label>
      <select id="countries" className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>

      <PillEditor title={labels.label_language} placeHolder={labels.input_language} ctaLabel={labels.cta_add} id={'language'} />
      <PillEditor title={labels.label_soft_skills} placeHolder={labels.input_soft_skills} ctaLabel={labels.cta_add} id={'softSkills'} />
      <PillEditor title={labels.label_tech_skills} placeHolder={labels.input_tech_skills} ctaLabel={labels.cta_add} id={'techSkills'} />
    </div>
  )
}

export default PersonalInfoForm;
