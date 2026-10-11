import { AppProvider } from '@/context/AppContext'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'

export default function App() {
  return (
    <AppProvider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </AppProvider>
  )
}
