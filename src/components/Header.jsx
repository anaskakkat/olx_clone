import React, { useContext } from 'react'
import './header.css'
import { AuthContext } from '../store/FirebaseContext'
const Header = () => {



  return (
    <div className="top-bottom-shadow  flex mt-3 p-1 cursor-pointer">
      <div className="flex">
        <h4 className="flex ml-14 font-medium text-sm">ALL CATEGORIES</h4>
       
      </div>

      <ul
        className="flex gap-6 text-xs ml-2"
      >
        <li>Cars</li>
        <li>Motorcycles</li>
        <li>Mobile Phones</li>
        <li>For Sale: Houses & Apartments</li>
        <li>Scooters</li>
        <li>Commercial & Other Vehicles</li>
        <li>For Rent: Houses & Apartments</li>
      </ul>
    </div>
  )
}

export default Header