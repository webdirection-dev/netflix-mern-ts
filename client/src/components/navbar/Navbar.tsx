import React from "react"
import { Link } from "react-router-dom"

import './navbar.scss'
import logo from '../../img/logo.png'
import avatar from '../../img/avatar.jpeg'
import {Search, Notifications, ArrowDropDown} from "@mui/icons-material"
import {useState} from "react"

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset !== 0)
        return () => (window.onscroll = null)
    }

    return(
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className="container">
                <div className="left">
                    <img src={logo} alt="logo"/>

                    <Link to='/' className='link'><span>Homepage</span></Link>
                    <Link to='/series' className='link'><span>Series</span></Link>
                    <Link to='/movies' className='link'><span>Movies</span></Link>

                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                
                <div className="right">
                    <Search className='icon' />
                    <span>KID</span>
                    <Notifications className='icon' />
                    <img src={avatar} alt="avatar"/>

                    <div className="profile">
                        <ArrowDropDown className='icon' />

                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar