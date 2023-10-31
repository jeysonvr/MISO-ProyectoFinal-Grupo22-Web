'use client'

import { useCallback, useEffect, useState } from 'react';

import SearchFilter from '../../components/searchFilter/SearchFilter';
import SearchResult from '../../components/searchResult/SearchResult';

const cookieCutter = require('cookie-cutter');

interface IFilter {
  key: string;
  value: string;
};

const SearchContainer = ({ labels, onSearchCandidates }: any) => {
  const [filterMetadata, setFilterMetadata] = useState<any>(null);

  const searchResult = [
    {
      name: 'Sophia Wilson',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum nihil maxime autem assumenda molestiae iusto in tenetur debitis quam, dolor soluta! A voluptatum consectetur maxime hic explicabo eos at totam.',
    },
    {
      name: 'John Edwards',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa eum rem porro deserunt nesciunt eaque dolor quasi quisquam nihil magnam! Quas omnis possimus optio voluptas soluta? Accusantium nam eveniet enim!',
    }
  ]

  // TODO: fetch search with this filter
  const [filter, setFilter] = useState<IFilter[]>([]);

  /**
   * Search candidates with filter
   */
  const searchCandidateHandler = async () => {
    // const email = JSON.parse(localStorage.getItem('user') || '{}').email;
    // const response = await onSearchCandidates('token'); // TODO: Replace with user token
  }

  const onFilterChange = useCallback((e: any, filterKey: any) => {
    console.log('Recibe::', e, filterKey)
  }, []);

  useEffect(() => {
    searchCandidateHandler();
  }, []);


  // Get metadata for filters
  useEffect(() => {

    // Language
    const lang = cookieCutter.get('NEXT_LOCALE');

    // Query params
    const queryParams = (lang && lang !== 'es') ? `language=${lang}` : '';

    // Get profile metadata
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/metadata/?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        const placeholder = labels.placeholder;
        const metadataFilter = [
          {
            label: labels.filter_rol,
            placeholder,
            name: 'filterRol',
            options: data.roles?.map(({ id, rol }: any) => ({ value: id, label: rol })),
          },
          {
            label: labels.filter_country,
            placeholder,
            name: 'filterCountry',
            options: data.paises?.map(({ id, pais }: any) => ({ value: id, label: pais })),
          },
          {
            label: labels.filter_tech_skills,
            placeholder,
            name: 'filterTechSkills',
            options: data.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({ value: id, label: descripcion })),
          },
          {
            label: labels.filter_soft_skills,
            placeholder,
            name: 'filterSoftSkills',
            options: data.habilidadesBlandas?.map(({ id, descripcion }: any) => ({ value: id, label: descripcion })),
          },
        ]
        setFilterMetadata(metadataFilter)
      });
  }, []);

  return (
    <>
      <div className='mt-3 mb-5'>
        <SearchFilter metadata={filterMetadata} onFilterChange={onFilterChange} />
      </div>
      <p>32 resultados {`${filter.join('&').length ? 'para: ' + filter.join('&') : ''}`}</p>
      <SearchResult
        labelResults={'32 para'}
        results={searchResult}
      />
    </>
  )
}

export default SearchContainer;
