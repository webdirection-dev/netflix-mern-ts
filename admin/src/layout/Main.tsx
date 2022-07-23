import React, {useContext} from "react"
import {Route, Routes, Navigate} from "react-router-dom"

import Login from "../pages/login/Login"
import Home from "../pages/home/Home"
import List from "../pages/list/List"
import Single from "../pages/single/Single"

import NewUser from "../features/users/NewUser"
import NewMovie from "../features/movies/NewMovie"
import NewList from "../features/lists/NewList"

import NotFond from "../pages/notFound/NotFond"

import {userInputs, movieInputs} from "../static-data/data/form-source"
import {AuthContext} from "../context/authContext/AuthContext"

const Main: React.FC = () => {
    const {user} = useContext(AuthContext)

    return(
        <div className='main'>
            <Routes>
                <Route path="/">
                    <Route index element={!user ? <Navigate to='/login' replace={true}/> : <Home />} />

                    <Route path="users">
                        <Route index element={<List type='user'/>} />
                        <Route path=":userId" element={<Single />} />
                        <Route path="new" element={<NewUser inputs={userInputs}/>} />
                    </Route>

                    <Route path="movies">
                        <Route index element={<List type='movie'/>} />
                        <Route path=":movieId" element={<Single />} />
                        <Route path="new" element={<NewMovie inputs={movieInputs}/>} />
                    </Route>

                    <Route path="lists">
                        <Route index element={<List type='list'/>} />
                        <Route path=":listId" element={<Single />} />
                        <Route path="new" element={<NewList title='List'/>} />
                    </Route>
                </Route>

                <Route path="login" element={user ? <Navigate to='/' replace={true} /> : <Login />} />
                <Route path="*" element={<NotFond />} />
            </Routes>
        </div>
    )
}

export default Main