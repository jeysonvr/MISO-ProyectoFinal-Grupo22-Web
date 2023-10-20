import { useTranslations } from 'next-intl';

import LoginForm from "../../containers/forms/LoginForm";

export default function Login() {

  const labels = useTranslations('login');
  const loginLabels = {
    title_login: labels('title_login'),
    label_email: labels('label_email'),
    label_password: labels('label_password'),
    label_remember: labels('label_remember'),
    label_agree_terms: labels('label_agree_terms'),
    cta_login: labels('cta_login'),
    label_have_an_account: labels('label_have_an_account'),
    label_create_account: labels('label_create_account')
  };

  return (
    <LoginForm labels={loginLabels} />
  )

}
