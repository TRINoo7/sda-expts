import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  return (
    <>
    <div className='button-class'>
      <button id='b1'><Link to="/q3/about">About</Link></button>
      <button id='b2'><Link to="/q3/semester">Semester</Link></button>
    </div>
    </>
  )
}
