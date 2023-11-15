import { useTranslations } from 'next-intl';

import { HomeContainer } from '../containers/home/Home';

export default function Home() {

    const labels = useTranslations('home');
    const homeLabels = {
        label_oportunities: labels('label_oportunities'),
        label_for_you: labels('label_for_you'),
        cta_login: labels('cta_login'),
        span_or: labels('span_or'),
        cta_signup: labels('cta_signup'),
        label_phrase_1: labels('label_phrase_1'),
        label_phrase_2: labels('label_phrase_2'),
        label_motivation: labels('label_motivation'),
        label_companies_looking: labels('label_companies_looking'),
        cta_watch_video: labels('cta_watch_video'),
        cta_edit_profile: labels('cta_edit_profile'),
        title_part_1: labels('title_part_1'),
        title_part_2: labels('title_part_2'),
        title_part_3: labels('title_part_3'),
    };

    return (
        <HomeContainer labels={homeLabels} />
    )
}
