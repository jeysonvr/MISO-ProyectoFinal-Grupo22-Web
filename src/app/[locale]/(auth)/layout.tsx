import '../../globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'ABC Jobs',
  description: 'Uniandes 2023',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  )
}
