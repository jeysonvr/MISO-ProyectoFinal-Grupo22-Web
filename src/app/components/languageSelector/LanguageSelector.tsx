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
    <select onChange={handleLanguageChange} value={locale}>
      <option value='en'>{languages?.english}</option>
      <option value='es'>{languages?.spanish}</option>
    </select>
  )
}

export default LanguageSelector;
