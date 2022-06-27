import React, {useContext, useState} from 'react'
import {Route, Routes, Navigate} from "react-router-dom"
import './app.scss'

import Login from "../../pages/login/Login"
import Main from "../../layout/Main"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import NotFond from "../../pages/notFound/NotFond"

import {useChangeTheme} from "./use-change-theme"
import {AuthContext} from "../../context/authContext/AuthContext"

function App() {
    const {user} = useContext(AuthContext)
    const [dark, setDark] = useState(false)
    useChangeTheme(dark)

    const auth = user ? user.isAdmin : false

    return (
        <>
            {
                !auth
                    ? <Routes>
                        <Route path='/' element={<Navigate to='/login' replace={true}/>} />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<NotFond />} />
                    </Routes>
                    : <Routes>
                        <Route path="login" element={<Navigate to='/' replace={true} />} />
                    </Routes>
            }

            {
                auth && (
                    <div className='app'>
                        <Sidebar setDark={setDark} dark={dark}/>

                        <div className="container">
                            <Navbar setDark={setDark} dark={dark}/>
                            <Main />
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default App