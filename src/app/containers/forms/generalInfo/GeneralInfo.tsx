import PillEditor from "../../../components/pillEditor/PillEditor";

const GeneralInfoForm = ({ labels }: any) => {
  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.title_general_info}</h2>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.input_name}</label>
          <input
            type="text"
            minLength={3}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={labels.input_name} required />
        </div>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_business_type}</label>
        <select id="countries" className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      <PillEditor title={labels.label_business_vertical} ctaLabel={labels.cta_add} id={'business_vertical_selector'} />
      <PillEditor title={labels.label_ubication} ctaLabel={labels.cta_add} id={'ubication_selector'} />
    </div>
  )
}

export default GeneralInfoForm;
