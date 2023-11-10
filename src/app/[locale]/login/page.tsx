import { useTranslations } from 'next-intl';

import LoginForm from "../../containers/forms/LoginForm";

export default function Login() {

  const labels = useTranslations('login');
  const alerts = useTranslations('alerts');
  const loginLabels = {
    title_login: labels('title_login'),
    label_email: labels('label_email'),
    label_password: labels('label_password'),
    label_remember: labels('label_remember'),
    cta_login: labels('cta_login'),
    label_have_an_account: labels('label_have_an_account'),
    label_create_account: labels('label_create_account'),
    alert_please_wait: alerts('please_wait'),
    alert_login_success: alerts('login_success'),
    alert_try_again: alerts('try_again'),
  };

  return (
    <LoginForm labels={loginLabels} />
  )

}
