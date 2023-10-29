import '../globals.css';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Script from 'next/script'

import Footer from '../containers/footer/Footer'
import Navigation from '../components/navigation';
import { AppProvider } from '../providers/AppProvider';
export const metadata: Metadata = {
  title: 'ABC Jobs',
  description: 'Uniandes 2023',
}

export default function RootLayout({ children, params: { locale } }: {
  children: React.ReactNode,
  params: { locale: string },
}) {
  const labels = useTranslations('navigation');
  const navigationLabels = {
    home: labels('home'),
    tech_tests: labels('tech_tests'),
    performance_review: labels('performance_review'),
    proyects: labels('proyects'),
    candidates: labels('candidates'),
    employees: labels('employees'),
    interviews: labels('interviews'),
    contract: labels('contract'),
  }

  return (
    <html lang={locale}>
      <body className="flex flex-col h-screen justify-between bg-white">
        <AppProvider>
          <Navigation labels={navigationLabels} />
          <main className="mb-auto">
            {children}
          </main>
          <Footer />
        </AppProvider>
        <Script  src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></Script >
      </body>
    </html >
  )
}
