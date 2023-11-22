import PerformanceReviewGrid from '@/app/containers/Grid/PerformanceReview/PerformanceReviewGrid';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const labels = useTranslations('employees');
  const alerts = useTranslations('alerts');
  const labels_company = useTranslations('contract');

  const employeesLabels = {
    title_employees: labels('title_employees'),
    label_name: labels('label_name'),
    label_start_date: labels('label_start_date'),
    label_end_date: labels('label_end_date'),
    label_evaluation: labels('label_evaluation'),
    label_employee: labels('label_employee'),
    cta_add: labels('cta_add'),
    cta_cancel: labels('cta_cancel'),
    cta_save: labels('cta_save'),
    cta_remove: labels('cta_remove'),
    label_status: labels('label_status'),
    label_active: labels('label_active'),
    label_inactive: labels('label_inactive'),
    label_no_content: labels('label_no_content'),
    alert_please_wait: alerts('please_wait'),
    alert_successfully_created: alerts('successfully_created'),
    alert_try_again: alerts('try_again'),
    label_loading: labels('label_loading'),
    label_performance: labels('label_performance'),
    label_company: labels_company('label_company'),
    label_watch: labels('label_watch'),
    label_close: labels('label_close')
  };
  return (
    <main className="flex flex-col justify-between p-16 container m-auto">
      <h1 className="mb-4 font-bold tracking-tight text-gray-900 text-4xl">{labels('label_performance_title')}</h1>
      <PerformanceReviewGrid labels={employeesLabels} />
    </main>
  )
}
