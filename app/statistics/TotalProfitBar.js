'use client'
import React from 'react'

const TotalProfitBar = ({ totalProfit, berryPack, setBerryPack }) => {

  const handleBerryPack = (e) => {
    localStorage.setItem("berrypack", e.currentTarget.dataset.value)
    setBerryPack(e.currentTarget.dataset.value)
  }

  return (
    <div className='w-full'>
    <div className='totalprofit flex items-center justify-center'>
        <h1 className=' font-bold text-xl'>Total profit: {totalProfit}&nbsp;</h1>
        <img src="images/WLKN.png" className='object-scale-down h-6' />
        <h2 className='font-bold'>&nbsp;$WLKN</h2>
      </div>
      <div className='mysberry-prices'>
        <div className='card w-full'>
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>Select mysberry pack</h2>
            <div className='card-actions flex'>
              <div className=' flex-grow'>
                <ul className='menu menu-horizontal px-0'>
                  <li data-value={10} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 10 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>10</h2> <img src='images/mysberry.png' className='h-6'/></div>
                  </li>
                  <li data-value={50} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 50 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>50</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={250} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 250 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>250</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={750} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 750 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>750</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={1500} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 1500 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>1500</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={5000} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 5000 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>5000</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={25000} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 25000 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>25000</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={50000} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 50000 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>50000</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  <li data-value={100000} onClick={(e) => handleBerryPack(e)}>
                    <div className={`flex font-bold gap-0 ${berryPack == 100000 ? "bg-base-200" : ""}`}> <h2 className=' text-lg'>100000</h2> <img src='images/mysberry.png' className='h-6' /></div>
                  </li>
                  
                </ul>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalProfitBar