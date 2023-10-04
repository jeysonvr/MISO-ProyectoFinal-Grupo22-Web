import Image from 'next/image'
import { useTranslations } from 'next-intl';


export default function Home() {
  const t = useTranslations('Index');
  const test = useTranslations('test');
  return (
    <>
      <p>ok</p>
      <p>{test('')}</p>
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
