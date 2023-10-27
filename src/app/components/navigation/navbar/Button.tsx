// import { useTranslations } from 'next-intl';

export default function Button() {
  /* const labels = useTranslations('button');
  const labelsLanguage = useTranslations('language');
  const languages = {
    english: labelsLanguage('en'),
    spanish: labelsLanguage('es'),
  }; */

  return (
    /*<button className="h-12 rounded-lg bg-white font-bold px-5">{labels('product')}Login</button>*/
    <button className="h-12 rounded-lg bg-white font-bold px-5">Login / Sing up</button>
  );
}