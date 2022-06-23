import React, {useState, useEffect} from "react"
import './main.scss'

import {Route, Routes} from "react-router-dom"

import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import List from "../pages/list/List"
import Single from "../pages/single/Single"
import New from "../pages/new/New"
import NotFond from "../pages/notFound/NotFond"

import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"

import {userInputs, productInputs} from "../static-data/form-source"

const Main: React.FC = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        document.body.setAttribute('data-theme', `${dark ? 'dark' : 'light'}`);
    }, [dark]);

    return(
        <div className='main'>
            <Sidebar setDark={setDark} dark={dark}/>

            <div className="container">
                <Navbar setDark={setDark} dark={dark}/>

                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />

                        <Route path="users">
                            <Route index element={<List />} />
                            <Route path=":userId" element={<Single />} />
                            <Route path="new" element={<New inputs={userInputs}/>} />
                        </Route>

                        <Route path="products">
                            <Route index element={<List />} />
                            <Route path=":productId" element={<Single />} />
                            <Route path="new" element={<New inputs={productInputs}/>} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFond />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main