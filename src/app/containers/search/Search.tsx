'use client'

import { useCallback, useEffect, useState } from 'react';

import { useAppContext } from "../../providers/AppProvider";

import SearchFilter from '../../components/searchFilter/SearchFilter';
import SearchResult from '../../components/searchResult/SearchResult';

interface IFilter {
  paises: string[];
  roles: string[];
  habilidadesBlandas: string[];
  habilidadesTecnicas: string[];
};

const baseFilter = {
  paises: [],
  roles: [],
  habilidadesBlandas: [],
  habilidadesTecnicas: [],
};

const SearchContainer = ({ labels, onSearchCandidates }: any) => {
  const appContext = useAppContext();
  const [filterMetadata, setFilterMetadata] = useState<any>(null);
  const [searchFilter, setSearchFilter] = useState<IFilter>(baseFilter);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [countryMetadata, setCountryMetadata] = useState(null);

  const labelResults = labels.label_results?.replace('searchAmount', searchResult?.length);

  /**
   * Update search candidates filter on filter changes
   */
  const onFilterChange = useCallback((e: any, filterKey: string) => {
    setSearchFilter(currentFilter => ({
      ...currentFilter,
      [filterKey]: e.map((option: any) => option.value),
    }));
  }, []);

  // Get metadata for filters
  useEffect(() => {
    const lang = appContext.user.language;
    const queryParams = (lang && lang !== 'es') ? `?language=${lang}` : '';

    // Get profile metadata
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/metadata/${queryParams}`)
      .then(res => res.json())
      .then(data => {
        setCountryMetadata(data.paises);

        const placeholder = labels.placeholder;
        const metadataFilter = [
          {
            label: labels.filter_rol,
            placeholder,
            name: 'roles',
            options: data.roles?.map(({ id, rol }: any) => ({ value: id, label: rol })),
          },
          {
            label: labels.filter_country,
            placeholder,
            name: 'paises',
            options: data.paises?.map(({ id, pais }: any) => ({ value: id, label: pais })),
          },
          {
            label: labels.filter_tech_skills,
            placeholder,
            name: 'habilidadesBlandas',
            options: data.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({ value: id, label: descripcion })),
          },
          {
            label: labels.filter_soft_skills,
            placeholder,
            name: 'habilidadesTecnicas',
            options: data.habilidadesBlandas?.map(({ id, descripcion }: any) => ({ value: id, label: descripcion })),
          },
        ]
        setFilterMetadata(metadataFilter)
      });
  }, []);

  // Get results for search
  useEffect(() => {
    onSearchCandidates?.(JSON.stringify(searchFilter)).then((test: any) => setSearchResult(test));
  }, [searchFilter]);

  return (
    <>
      <div className='mt-3 mb-5'>
        <SearchFilter metadata={filterMetadata} onFilterChange={onFilterChange} />
      </div>
      <p>{labelResults}</p>
      <SearchResult
        labelResults={'32 para'}
        results={searchResult}
        countryMetadata={countryMetadata}
        ctaLabel={labels.cta_connect}
      />
    </>
  )
}

export default SearchContainer;
