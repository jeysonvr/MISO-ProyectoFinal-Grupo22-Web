import { useTranslations } from 'next-intl';

import React from 'react';
import InterviewsGrid from './InterviewsGrid';

export default function TechTest() {
  
  const labels = useTranslations('interviews');
  const testLabels = {
    label_date: labels('label_date'),
    label_hour_start: labels('label_hour_start'),
    label_hour_end: labels('label_hour_end'),
    label_subject: labels('label_subject'),
    main_title: labels('main_title'),
    label_not_interviews: labels('label_not_interviews')
  };
    return (
      <main className="flex flex-col justify-between p-16 container m-auto">
        <h1 className="mb-12 text-2xl font-bold tracking-tight text-gray-900 text-4xl">{labels('main_title')}</h1>
        <InterviewsGrid labels={testLabels} />
      </main>
    )
}
  