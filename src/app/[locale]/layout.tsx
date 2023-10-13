import '../globals.css';
import type { Metadata } from 'next';

import Footer from '../containers/footer/Footer'
import Navigation from '../components/navigation';
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
      <body>
        <Navigation />
        <div id='content-wrap'>
          {children}
        </div>        
      </body>
      <footer>
        <Footer />
      </footer>      
    </html>
  )
}
