import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from './Button';
import './Navbar.css'
import Logo from './images/cat-leaf.png'
import { IconContext } from 'react-icons/lib'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

    return (
        <>
            <IconContext.Provider value={{ color: '#374785' }}>
                <div className="navbar">
                    <div className="navbar-container">
                        <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                            <img src={Logo} alt="PurrtectorLogo" width="38px" height="38px" className='navbar-icon' />
                            Purrtector
                        </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/my-cat' className="nav-links" onClick={closeMobileMenu}>
                                    My Cat
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/history' className="nav-links" onClick={closeMobileMenu}>
                                    Purchase History   
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/donate' className="nav-links" onClick={closeMobileMenu}>
                                    Donate    
                                </Link>
                            </li>
                            <li className="nav-btn">
                                <Link to='/sign-up' className="btn-link" onClick={closeMobileMenu}>
                                    <Button buttonSize={button ? "btn--medium" : "btn--small"} buttonColor="primary">
                                        Sign In/Up
                                    </Button>
                                </Link>
                            </li>
                        </ul>    
                    </div>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
