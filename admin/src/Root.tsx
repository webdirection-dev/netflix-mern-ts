import React from "react"
import {BrowserRouter} from "react-router-dom"
import {AuthContextProvider} from "./context/authContext/AuthContext"
import {MovieContextProvider} from "./context/movieContext/MovieContext"

import App from './components/app/App'

const Root: React.FC = () => {
    return(
        <React.StrictMode>
            <AuthContextProvider>
                <MovieContextProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </MovieContextProvider>
            </AuthContextProvider>
        </React.StrictMode>
    )
}

export default Root