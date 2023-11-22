import { useTranslations } from 'next-intl';
import ProjectForm from "../../../containers/forms/ProjectForm";

export default function Projects() {
  const labels = useTranslations('project');
  const alerts = useTranslations('alerts');

  const projectLabels = {
    title_projects: labels('title_projects'),
    cta_new_project: labels('cta_new_project'),
    label_name: labels('label_name'),
    label_description: labels('label_description'),
    label_role: labels('label_role'),
    label_technical_skills: labels('label_technical_skills'),
    label_soft_skills: labels('label_soft_skills'),
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
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="mb-12 font-bold tracking-tight text-gray-900 text-4xl">{labels('title_projects')}</h1>
      <ProjectForm labels={projectLabels} />
    </main>
  )
}
