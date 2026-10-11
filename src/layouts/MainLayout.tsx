import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyModal from '@/components/PropertyModal'
import ToastViewport from '@/components/ui/ToastViewport'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <PropertyModal />
      <ToastViewport />
    </>
  )
}
