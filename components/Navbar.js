import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar flex justify-end lg:justify-start bg-base-100 m-0 p-0 bg-opacity-80">
      {/* navbar = dropdown on small screen */}
      <div className='dropdown'>
        <label tabIndex={0} className='btn btn-ghost lg:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className='menu menu-sm dropdown-content -translate-x-40 z-[1] shadow bg-base-200 rounded-box w-52'>
          <li><Link href='/' className="btn btn-ghost normal-case text-xl">Home</Link></li>
          <li><Link href='/cathletics' className="btn btn-ghost normal-case text-xl">My Cathletics</Link></li>
          <li><Link href='/statistics' className="btn btn-ghost normal-case text-xl">Statistics</Link></li>
          <li><Link href='/chest-calcs' className="btn btn-ghost normal-case text-xl">Calculate droprate</Link></li>
        </ul>

      </div>

      {/* navbar on large screen */}
      <div className='lg:flex hidden'>
        <Link href='/' className="btn btn-ghost normal-case text-xl">Home</Link>
        <Link href='/cathletics' className="btn btn-ghost normal-case text-xl">My Cathletics</Link>
        <Link href='/statistics' className="btn btn-ghost normal-case text-xl">Statistics</Link>
        <Link href='/chest-calcs' className="btn btn-ghost normal-case text-xl">Calculate droprate</Link>
      </div>
    </div>
  )
}

export default Navbar