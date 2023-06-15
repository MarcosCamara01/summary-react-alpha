import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='header'>
        <header>
            <div></div>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/dashboard"}>Dashboard</Link>
            </nav>
        </header>
    </div>
  )
}
