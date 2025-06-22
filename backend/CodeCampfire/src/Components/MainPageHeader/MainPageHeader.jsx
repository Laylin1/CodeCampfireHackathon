import React from 'react'
import styles from './MainPageHeader.module.css'
import { Link } from 'react-router-dom'

export default function MainPageHeader() {
  return (
    <header className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 shadow-md ${styles.glass}`}>
      <div className="text-2xl font-extrabold tracking-widest text-indigo-600">CodeCampfire</div>
      <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all">
        <Link to="/signin">Sign In</Link>/ <Link to="/register">Register</Link>
      </button>
    </header>
  )
}
