import React from 'react'
import Navbar from '../navbar/Navbar'
import ContactMain from './ContactMain';

export default function Contacts() {
  return (
      <div className="flex min-h-screen w-full flex-col">
        <Navbar/>
        <ContactMain  />
      </div>
  )
}
