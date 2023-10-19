import { useTranslations } from 'next-intl';

import ProfileForm from "../../../containers/forms/ProfileForm";

export default function Profile() {
  const labels = useTranslations('user_profile');
  const profileLabels = {
    title_personal_info: labels('title_personal_info'),
    title_academic_info: labels('title_academic_info'),
    title_laboral_info: labels('title_laboral_info'),
    cta_cancel: labels('cta_cancel'),
    cta_save: labels('cta_save'),
    cta_add: labels('cta_add'),
    cta_remove: labels('cta_remove'),
    input_name: labels('input_name'),
    input_age: labels('input_age'),
    input_email: labels('input_email'),
    input_phone: labels('input_phone'),
    select_country: labels('select_country'),
    label_language: labels('label_language'),
    input_language: labels('input_language'),
    label_soft_skills: labels('label_soft_skills'),
    input_soft_skills: labels('input_soft_skills'),
    label_tech_skills: labels('label_tech_skills'),
    input_tech_skills: labels('input_tech_skills'),
    label_educative_institution: labels('label_educative_institution'),
    label_title: labels('label_title'),
    label_in_progress: labels('label_in_progress'),
    label_start_date: labels('label_start_date'),
    label_end_date: labels('label_end_date'),
    label_company: labels('label_company'),
    label_role: labels('label_role'),
    label_current_job: labels('label_current_job'),
    label_activity_description: labels('label_activity_description'),
  };

  return (
    <main className="flex flex-col justify-between p-16 container m-auto">
      <h1 className="mb-12 text-2xl font-bold tracking-tight text-gray-900 text-4xl">{labels('main_title')}</h1>
      <ProfileForm labels={profileLabels} />
    </main>
  )
}
