import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './Footer.module.scss';
import LanguageSelector from '../../components/languageSelector/LanguageSelector';

/**
 * Componente que representa el footer de la página.
 */
export default function Footer() {

  const labelsLanguage = useTranslations('language');
  const languages = {
    english: labelsLanguage('en'),
    spanish: labelsLanguage('es'),
  };

  return (
    <footer className={styles.wrapper}>
      <div className={styles.column}>
        <img
          className={styles.logo}
          src="/images/logo_footer.jpg" alt="Logo" />
      </div>
      <div className={styles.column}>
        <div className={styles.subcolumn}>
          <h3>{labels('product')}</h3>
          <a>{labels('all_jobs')}</a>
          <a>{labels('companies')}</a>
          <a>{labels('candidates')}</a>
        </div>
        <div className={styles.subcolumn}>
          <h3>{labels('company')}</h3>
          <a>{labels('about')}</a>
          <a>{labels('join_us')}</a>
          <a>{labels('learn_more')}</a>
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.socialMedia}>
          <Image alt="twitter" src='/icons/social-media/twitter.png' width={30} height={25} />
          <Image alt="facebook" src='/icons/social-media/facebook.png' width={30} height={25} />
          <Image alt="linkedin" src='/icons/social-media/linkedin.png' width={30} height={25} />
          <Image alt="youtube" src='/icons/social-media/youtube.png' width={30} height={25} />
        </div>
        <div className={styles.otherLinks}>
          <p>{labels('copy_right')}</p>
          <p>• {labels('privacy')}</p>
          <p>• {labels('terms')}</p>
          <p>• {labels('sitemap')}</p>
        </div>
      </div>
      <div className={styles.column}>
        <LanguageSelector languages={languages} />
      </div>
    </footer >
  )
}
