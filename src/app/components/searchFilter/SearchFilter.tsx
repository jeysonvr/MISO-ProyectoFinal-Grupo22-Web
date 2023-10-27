import React from 'react'

interface IMetadata {
  label: string;
  placeholder: string;
  name: string;
  values: {
    value: number;
    text: string;
  }[];
}

interface ISearchFilter {
  metadata: IMetadata[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchFilter = ({ metadata, onChange }: ISearchFilter) => {
  return (
    <div className='flex'>
      {
        metadata?.map(({ label, placeholder, name, values }) => (
          <div className='flex-1 m-5'>
            <h3>{label}</h3>
            <select
              onChange={onChange}
              name={name}
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option
                key={0}
                value={''}>
                {placeholder}
              </option>
              {
                values?.map(({ value, text }) => (
                  <option
                    key={value}
                    value={value}>
                    {text}
                  </option>
                ))
              }
            </select>
          </div>
        ))
      }
    </div>
  )
}

export default SearchFilter
