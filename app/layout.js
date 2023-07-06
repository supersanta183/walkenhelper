import './globals.css'
import Navbar from '@/components/Navbar'
import { GlobalContextProvider } from './Context/store'

export default function Layout({ children }) {


  return (
    <html className='bg-background bg-cover bg-fixed'>
      <body>
        <div className='h-screen max-w-screen flex flex-col'>
          <GlobalContextProvider>
            <Navbar />
            {children}
          </GlobalContextProvider>
        </div>
      </body>
    </html>
  )
}
