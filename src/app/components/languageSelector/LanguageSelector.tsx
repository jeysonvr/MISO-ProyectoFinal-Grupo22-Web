'use client'

import React, { useCallback } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';

const LanguageSelector = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { locale } = useParams();

  const labelEnglish = locale === 'en' ? 'english' : 'inglés';
  const labelSpanish = locale === 'en' ? 'spanish' : 'español';

  const handleLanguageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    const pathWithoutLocale = pathname.replace(`/${locale as string}`, '');
    push(`/${e.target.value}${pathWithoutLocale}`);
  }, [locale, pathname]);

  return (
    <select onChange={handleLanguageChange} value={locale}>
      <option value='en'>{labelEnglish}</option>
      <option value='es'>{labelSpanish}</option>
    </select>
  )
}

export default LanguageSelector;
