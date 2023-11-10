import React from 'react';
import { render } from '@testing-library/react';

import LanguageSelector from './LanguageSelector';

jest.mock("next/navigation", () => ({
  usePathname() {
    return 'pathname';
  },
  useParams() {
    return {
      locale: 'en'
    };
  }
}));

describe('LanguageSelector component', () => {
  const languages = {
    english: 'English',
    spanish: 'Español',
  };

  it('should renders the language options', () => {
    const { queryByText } = render(<LanguageSelector languages={languages} />);
    const englishOption = queryByText('English');
    const spanishOption = queryByText('Español');
    const frenchOption = queryByText('French');

    expect(englishOption).toBeDefined();
    expect(spanishOption).toBeDefined();
    expect(frenchOption).toBeNull();
  });
});
