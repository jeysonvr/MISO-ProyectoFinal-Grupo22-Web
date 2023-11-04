import { useTranslations } from 'next-intl';

import React, { useEffect } from 'react';
import TestGrid from '../../containers/forms/techTest/TestGrid/TestGrid';
import Quiz from '../../containers/forms/techTest/TechTest';

export default function TechTest() {
  
  const labels = useTranslations('tech_test');
  const testLabels = {
    title_cancel: labels('cta_cancel'),
    title_next: labels('cta_next'),
    title_send: labels('cta_send'),
    title_test: labels('label_test'),
    label_question: labels('label_question'),
    label_of: labels('label_of'),
    cta_finished_test: labels('cta_finished_test'),
    label_name_test: labels('label_name_test'),
    label_status: labels("label_status"),
    label_result: labels("label_result"),
    label_pending: labels("label_pending"),
    label_expired: labels("label_expired"),
    label_ready: labels("label_ready"),
    label_present: labels("label_present"),
    label_not_test: labels("label_not_test"),
    label_loading: labels("label_loading")
  };
    return (
      <main className="flex flex-col justify-between p-16 container m-auto">
        <h1 className="mb-12 text-2xl font-bold tracking-tight text-gray-900 text-4xl">{labels('main_title')}</h1>
        <TestGrid labels={testLabels} />
      </main>
    )
}
  