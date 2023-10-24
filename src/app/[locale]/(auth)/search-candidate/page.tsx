import SearchContainer from '@/app/containers/search/Search';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const labels = useTranslations('search_candidate');
  const labelResult = labels('label_results_for', { amount: '{amount}', search: '{search}' });
  const searchLabels = {
    title: labels.rich('title', {
      span: (chunks) => <span>{chunks}</span>,
    }),
  };


  const testFn = async (email: string) => {
    'use server'

    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/info/${email}`)
      .then(res => res.json());

    console.log('Test:::', result.usuario.nombre_completo);
    return result.usuario.nombre_completo;
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <p>Search candidates here</p>
      <SearchContainer labels={searchLabels} testFn={testFn} />
    </main>
  )
}
