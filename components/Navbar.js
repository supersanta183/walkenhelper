import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className='flex-1'>
        <Link href='/' className="btn btn-ghost normal-case text-xl">Home</Link>
        <Link href='/cathletics' className="btn btn-ghost normal-case text-xl">My Cathletics</Link>
        <Link href='/statistics' className="btn btn-ghost normal-case text-xl">Statistics</Link>
      </div>
      <div className='flex-none'>
        <Link href='/' className="btn btn-ghost normal-case text-xl">Log in</Link>
      </div>
    </div>
  )
}

export default Navbar