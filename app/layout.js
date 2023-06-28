import './globals.css'
import Navbar from '../components/Navbar'

export default function Layout({ children }) {

  return (
    <html className='bg-background bg-cover bg-fixed'>
      <body>
          <div className='h-screen max-w-screen flex flex-col'>
            <div className=''>
              <Navbar />
            </div>
            <main className='h-full'>{children}</main>
          </div>
      </body>
    </html>
  )
}
