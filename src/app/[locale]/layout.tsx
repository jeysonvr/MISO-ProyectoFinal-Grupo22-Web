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
      <body className="flex flex-col h-screen justify-between bg-white">
        <Navigation />
        <main className="mb-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html >
  )
}
