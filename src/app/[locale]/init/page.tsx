import { useTranslations } from 'next-intl';
import InitForm from '@/app/containers/forms/InitForm';


export default function Init() {

  const labels = useTranslations('home');
  const homeLabels = {
    label_oportunities: labels('label_oportunities'),
    label_for_you: labels('label_for_you'),
    cta_login: labels('cta_login'),
    span_or: labels('span_or'),
    cta_signup: labels('cta_signup'),
    label_phrase_1: labels('label_phrase_1'),
    label_phrase_2: labels('label_phrase_2')
  };

  return (
    <InitForm labels={homeLabels} />
  );
}