"use client"
import React, { useEffect } from 'react';
import { useGlobalContext } from './Context/store';


function FrontPage() {
  return (
    <div className='h-full'>
      <div className="flex justify-center items-center h-full max-w-screen">
        <div>
          <h1 className=" text-2xl lg:text-7xl text-primary-content">Welcome to walkenhelper</h1>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
