import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from "../../../assets/user.png";
import { IoIosArrowDown } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';
import { FiBarChart2 } from 'react-icons/fi';
import { FiCreditCard } from 'react-icons/fi';
import { FiPower } from 'react-icons/fi';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <div className='header'>
        <header>
          <div></div>
          <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
            <button className='button-menu' onClick={toggleMenu}>
              <div><img src={avatar} alt="user" /></div>
              <div><IoIosArrowDown /></div>
            </button>
          </nav>
        </header>
      </div>
      {menuOpen && (
        <div className="dropdown-menu" onBlur={closeMenu}>
          <div className="menu">
            <Link to={"#"}>
              <div className='link-content'>
                <div><FiUser /></div>
                Account Settings
              </div>
            </Link>
            <Link to={"#"}>
              <div className='link-content'>
                <div><FiBarChart2 /></div>
                Account Usage
              </div>
            </Link>
            <Link to={"#"}>
              <div className='link-content'>
                <div><FiCreditCard /></div>
                Biling Details
              </div>
            </Link>
            <div className='separator'></div>
            <Link to={"/logout"}>
              <div className='link-content link-red'>
                <div><FiPower /></div>
                Logout
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
