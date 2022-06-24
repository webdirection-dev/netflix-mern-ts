import React from "react"
import {Route, Routes} from "react-router-dom"

import Home from "../pages/home/Home"
import List from "../pages/list/List"
import Single from "../pages/single/Single"
import New from "../pages/new/New"
import NotFond from "../pages/notFound/NotFond"

import {userInputs, movieInputs} from "../static-data/form-source"

const Main: React.FC = () => {
    return(
        <div className='main'>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />

                    <Route path="users">
                        <Route index element={<List />} />
                        <Route path=":userId" element={<Single />} />
                        <Route path="new" element={<New inputs={userInputs}/>} />
                    </Route>

                    <Route path="movies">
                        <Route index element={<List />} />
                        <Route path=":movieId" element={<Single />} />
                        <Route path="new" element={<New inputs={movieInputs}/>} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFond />} />
            </Routes>
        </div>
    )
}

export default Main