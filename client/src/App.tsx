import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom";

import './app.scss'

import Home from "./pages/home/Home"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import Watch from "./pages/watch/Watch"
import NotFound from "./pages/notFound/NotFound";

function App() {
    const user = true

    return (
        <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/register" replace />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to="/" replace />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" replace />} />

            {user && (
                <>
                    <Route path='/movies' element={<Home type='movies'/>} />
                    <Route path='/series' element={<Home type='series'/>} />
                    <Route path='/watch' element={<Watch />} />
                </>
            )}

            <Route path='*' element={user ? <NotFound verify={true}/> : <NotFound verify={false}/>} />
        </Routes>
    );
}

export default App;
