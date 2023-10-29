import { useTranslations } from 'next-intl';

import SignupForm from '@/app/containers/forms/SignupForm';

export default function Signup() {

  const labels = useTranslations('signup');
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
  };

  return (
    <SignupForm labels={signupLabels} />
  )

}
