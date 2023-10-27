'use client'

import { useCallback, useEffect, useState } from 'react';

import SearchFilter from '@/app/components/searchFilter/SearchFilter';
import SearchResult from '@/app/components/searchResult/SearchResult';

interface IFilter {
  key: string;
  value: string;
};

const SearchContainer = ({ labels, metadata, onSearchCandidates }: any) => {
  const [value, setValue] = useState('');

  const mockMetadata = [
    {
      label: 'Rol',
      placeholder: 'Select an option',
      name: 'rol',
      values: [
        {
          value: 1,
          text: 'rol 1',
        },
        {
          value: 2,
          text: 'rol 2',
        },
      ],
    },
    {
      label: 'País',
      placeholder: 'Select an option',
      name: 'country',
      values: [
        {
          value: 1,
          text: 'país 1',
        },
        {
          value: 2,
          text: 'país 2',
        },
      ],
    },
    {
      label: 'Habilidades técnicas',
      placeholder: 'Select an option',
      name: 'techSkills',
      values: [
        {
          value: 1,
          text: 'habilidad 1',
        },
        {
          value: 2,
          text: 'habilidad 2',
        },
      ],
    },
    {
      label: 'Habilidades blandas',
      placeholder: 'Select an option',
      name: 'softSkills',
      values: [
        {
          value: 1,
          text: 'habilidad 1',
        },
        {
          value: 2,
          text: 'habilidad 2',
        },
      ],
    }
  ]

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
    const response = await onSearchCandidates('token'); // TODO: Replace with user token

    setValue(response);
  }

  /**
   * Update Filter
   */
  const onFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    // Remove from filter if value is empty
    if (!e.target.value) {
      setFilter(filter => {
        const newFilter = filter.filter(obj => {
          return obj.key !== e.target.name;
        });
        return [...newFilter];
      });
      return;
    }

    // Replace or add filter
    setFilter(filter => {
      const newFilter = filter.filter(obj => {
        return obj.key !== e.target.name;
      });
      return [
        ...newFilter,
        {
          key: e.target.name,
          value: e.target.value,
        }
      ]
    })
  }, []);

  useEffect(() => {
    searchCandidateHandler();
  }, []);

  return (
    <>
      <h2>{labels.title}</h2>
      <p>{value}</p>
      <SearchFilter metadata={mockMetadata} onChange={onFilterChange} />
      <SearchResult
        labelResults={'32 para'}
        results={searchResult}
      />
    </>
  )
}

export default SearchContainer;
