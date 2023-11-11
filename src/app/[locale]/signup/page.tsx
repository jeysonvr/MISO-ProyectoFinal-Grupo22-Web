import { useTranslations } from 'next-intl';

import SignupForm from '@/app/containers/forms/SignupForm';

export default function Signup() {
  const labels = useTranslations('signup');
  const alerts = useTranslations('alerts');
  const signupLabels = {
    title_signup: labels('title_signup'),
    label_full_name: labels('label_full_name'),
    label_email: labels('label_email'),
    label_password: labels('label_password'),
    label_agree_terms: labels('label_agree_terms'),
    cta_signup: labels('cta_signup'),
    label_have_an_account: labels('label_have_an_account'),
    label_login: labels('label_login'),
    label_i_am: labels('label_i_am'),
    label_candidate: labels('label_candidate'),
    label_company: labels('label_company'),
    alert_please_wait: alerts('please_wait'),
    alert_register_success: alerts('register_success'),
    alert_try_again: alerts('try_again'),
  };

  return (
    <SignupForm labels={signupLabels} />
  )

}
