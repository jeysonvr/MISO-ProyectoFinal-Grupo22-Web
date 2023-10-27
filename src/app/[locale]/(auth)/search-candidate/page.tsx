import SearchContainer from '@/app/containers/search/Search';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const labels = useTranslations('search_candidate');
  const labelResult = labels('label_results_for', { amount: '{amount}', search: '{search}' });
  let test = '';
  const searchLabels = {
    title: labels.rich('title', {
      span: (chunks) => <span>{chunks}</span>,
    }),
  };


  /**
   * Fetch search data from the server side
   * @param token - user token
   * @returns 
   */
  const onSearchCandidates = async (token: string) => {
    'use server'

    // const result = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/info/${email}`)
    //   .then(res => res.json());

    // console.log('Test:::', result.usuario.nombre_completo);
    return 'ok';
  }

  return (
    <main className="flex flex-col justify-between p-16 container m-auto">
      <h1 className="mb-12 text-2xl font-bold tracking-tight text-gray-900 text-4xl">{searchLabels.title}</h1>
      <p>Search candidates here</p>
      <SearchContainer labels={searchLabels} onSearchCandidates={onSearchCandidates} />
    </main>
  )
}
