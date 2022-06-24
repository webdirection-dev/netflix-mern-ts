import React from "react"
import {BrowserRouter} from "react-router-dom"
import {AuthContextProvider} from "./context/authContext/AuthContext"

import App from './components/app/App'

const Root: React.FC = () => {
    return(
        <React.StrictMode>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </React.StrictMode>
    )
}

export default Root