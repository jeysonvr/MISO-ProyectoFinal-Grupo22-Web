'use client'

import React, { useCallback } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';

interface ILanguageSelectorProps {
  languages: { [key: string]: string },
}

const LanguageSelector = ({ languages }: ILanguageSelectorProps) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { locale } = useParams();

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    const pathWithoutLocale = pathname.replace(`/${locale as string}`, '');
    push(`/${e.target.value}${pathWithoutLocale}`);
  }, [locale, pathname]);

  return (
    <select id="languages"
      onChange={handleLanguageChange} value={locale}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
    >
      <option value='en'>{languages?.english}</option>
      <option value='es'>{languages?.spanish}</option>
    </select>
  )
}

export default LanguageSelector;
