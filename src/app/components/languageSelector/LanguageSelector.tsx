'use client'

import React, { useCallback } from 'react';
import { usePathname, useParams } from 'next/navigation';

interface ILanguageSelectorProps {
  languages: { [key: string]: string },
}

const LanguageSelector = ({ languages }: ILanguageSelectorProps) => {
  const pathname = usePathname();
  const { locale } = useParams();

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    const pathWithoutLocale = pathname.replace(`/${locale as string}`, '');
    if (window?.location?.href) {
      window.location.href = `/${e.target.value}${pathWithoutLocale}`;
    }
  }, [locale, pathname]);

  return (
    <select
      name='languages'
      aria-label='languages'
      id="languages"
      onChange={handleLanguageChange}
      value={locale}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
    >
      <option value='en'>{languages?.english}</option>
      <option value='es'>{languages?.spanish}</option>
    </select>
  )
}

export default LanguageSelector;
