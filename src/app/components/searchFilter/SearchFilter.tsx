import React from 'react'

import Select from 'react-select'

interface IMetadata {
  label: string;
  placeholder: string;
  name: string;
  options: {
    value: number;
    label: string;
  }[];
}

interface ISearchFilter {
  metadata: IMetadata[];
  onFilterChange: (e: any, key: string) => void;
}

const SearchFilter = ({ metadata, onFilterChange }: ISearchFilter) => {
  return (
    <div className='flex' >
      {
        metadata?.map((filter, key) => (
          <div className='flex-1 m-1' key={key}>
            <h3>{filter.label}</h3>

            < div
              className='mb-10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              {
                <Select
                  isMulti
                  delimiter="-"
                  controlShouldRenderValue={true}
                  hideSelectedOptions={true}
                  closeMenuOnSelect={false}
                  onChange={(e) => onFilterChange(e, filter.name)}
                  name={filter.name}
                  placeholder={filter.placeholder}
                  options={
                    filter?.options?.map(({ value, label }) => (
                      { value, label }
                    ))
                  }
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              }
            </div >
          </div>
        ))
      }
    </div >
  )
}

export default SearchFilter
