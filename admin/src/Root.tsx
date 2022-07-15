import React from "react"
import {BrowserRouter} from "react-router-dom"
import {AuthContextProvider} from "./context/authContext/AuthContext"
import {MovieContextProvider} from "./context/movieContext/MovieContext"
import {ListsContextProvider} from "./context/listsContext/ListsContext"

import App from './components/app/App'

const Root: React.FC = () => {
    return(
        <React.StrictMode>
            <AuthContextProvider>
                <MovieContextProvider>
                    <ListsContextProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ListsContextProvider>
                </MovieContextProvider>
            </AuthContextProvider>
        </React.StrictMode>
    )
}

export default Root