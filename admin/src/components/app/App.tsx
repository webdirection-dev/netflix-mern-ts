import React, {useState} from 'react'
import {Route, Routes} from "react-router-dom"
import './app.scss'

import Login from "../../pages/login/Login";
import Main from "../../layout/Main"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import NotFond from "../../pages/notFound/NotFond"

import {useChangeTheme} from "./use-change-theme"

function App() {
    const [dark, setDark] = useState(false)
    useChangeTheme(dark)

    const auth = false

    return (
        <>
            {
                !auth && (
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<NotFond />} />
                    </Routes>
                )
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
