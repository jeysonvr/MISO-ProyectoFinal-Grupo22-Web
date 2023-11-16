import { useTranslations } from 'next-intl';
import ContractForm from '@/app/containers/forms/contract/ContractForm';

export default function Contract() {
  const labels = useTranslations('contract');
  const alerts = useTranslations('alerts');

  const contractLabels = {
    label_candidate: labels('label_candidate'),
    label_company: labels('label_company'),
    label_project: labels('label_project'),
    label_rol: labels('label_rol'),
    cta_cancel: labels('cta_cancel'),
    cta_save: labels('cta_save'),
    alert_please_wait: alerts('please_wait'),
    alert_update_success: alerts('update_success'),
    alert_try_again: alerts('try_again'),
  };
    return (
      <main className="flex flex-col items-center justify-between p-24">
        <ContractForm labels={contractLabels}/>
      </main>
    )
  }