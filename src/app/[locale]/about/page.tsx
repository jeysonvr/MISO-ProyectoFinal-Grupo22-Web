import { useTranslations } from 'next-intl';


export default function Home() {
  const t = useTranslations('Index');
  return (
    <>
      <p>ok</p>
      <p>ok</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>Prueba {t('about')}</p>
    </>
  )
}
