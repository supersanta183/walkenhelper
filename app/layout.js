import './globals.css'
import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <div className='h-screen w-screen flex flex-col'>
          <div className=''>
            <Navbar />
          </div>
          <main className='h-full'>{children}</main>
        </div>
      </body>
    </html>
  )
}
