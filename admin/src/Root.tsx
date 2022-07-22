import React from "react"
import {Provider} from "react-redux"
import {store} from "./store"

import {BrowserRouter} from "react-router-dom"
import {AuthContextProvider} from "./context/authContext/AuthContext"
import {MovieContextProvider} from "./context/movieContext/MovieContext"

import App from './components/app/App'

const Root: React.FC = () => {
    return(
        <React.StrictMode>
            <AuthContextProvider>
                <MovieContextProvider>
                    <Provider store={store}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Provider>
                </MovieContextProvider>
            </AuthContextProvider>
        </React.StrictMode>
    )
}

export default Root