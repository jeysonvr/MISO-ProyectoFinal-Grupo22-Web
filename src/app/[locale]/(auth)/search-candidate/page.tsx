import { useTranslations } from 'next-intl';

import SearchContainer from '../../../containers/search/Search';

export default function Profile() {
  const labels = useTranslations('search_candidate');
  const searchLabels = {
    title: labels.rich('title', {
      span: (chunks) => <span>{chunks}</span>,
    }),
    label_results: labels('label_results'),
    placeholder: labels('select_placeholder'),
    filter_rol: labels('filter_rol'),
    filter_country: labels('filter_country'),
    filter_tech_skills: labels('filter_tech_skills'),
    filter_soft_skills: labels('filter_soft_skills'),
    cta_connect: labels('cta_connect'),
  };


  /**
   * Fetch search data from the server side
   * @param filter - filter for search request
   * @returns 
   */
  const onSearchCandidates = async (filter: string) => {
    'use server'

    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL_INSECURE}/candidato/buscar`, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: filter,
    })
      .then(res => res.json())
    return result;
  }

  return (
    <main className="flex flex-col justify-between p-6 container m-auto">
      <h1 className="mb-12 font-bold tracking-tight text-gray-900 text-4xl">{searchLabels.title}</h1>
      <b>{labels('filter_by')}</b>
      <SearchContainer labels={searchLabels} onSearchCandidates={onSearchCandidates} />
    </main>
  )
}
