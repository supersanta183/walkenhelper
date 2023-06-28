"use client"
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase/firebaseApp'
import { setDoc, doc, collection } from 'firebase/firestore'
import fetchCats from '@/components/FetchCats'
import fetchMatches from '@/components/FetchMatches';

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
