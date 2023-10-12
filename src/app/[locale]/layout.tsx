import '../globals.css';
import type { Metadata } from 'next';

import Footer from '../containers/footer/Footer'

export const metadata: Metadata = {
  title: 'ABC Jobs',
  description: 'Uniandes 2023',
}

export default function RootLayout({ children, params: { locale } }: {
  children: React.ReactNode,
  params: { locale: string },
}) {
  return (
    <html lang={locale}>
      <body id='page-container'>
        <div id='content-wrap'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
