import Image from 'next/image';
import { useTranslations } from 'next-intl';

import LanguageSelector from '../../components/languageSelector/LanguageSelector';

/**
 * Componente que representa el footer de la página.
 */
export default function Footer() {
  const footerLabels = useTranslations('footer');
  const labelsLanguage = useTranslations('language');
  const languages = {
    english: labelsLanguage('en'),
    spanish: labelsLanguage('es'),
  };

  return (

    <footer className="bg-black text-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0">
            <img src="/images/logo_footer.jpg" className="mr-3 h-12 sm:h-18" alt="ABC Jobs Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ABC Jobs</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">{footerLabels('about')}</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">{footerLabels('privacy_policy')}</a>
            </li>
            <li>
              <a href="#" className="mr-6 hover:underline md:mr-8">{footerLabels('contact')}</a>
            </li>
            <LanguageSelector languages={languages} />
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-500 lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center dark:text-gray-100">{footerLabels('copy_right')}</span>
      </div>
    </footer>
  )
}
