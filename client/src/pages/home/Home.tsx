import React, {useEffect, useState} from "react";
import './home.scss'

import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import axios from "axios"

import {IList} from "../../types"
import {useGetRandomList} from "./use-get-random-list";

interface IType {
    type?: string
}

const Home: React.FC<IType> = ({type}) => {
    const {lists} = useGetRandomList(type)

    return(
        <div className='home'>
            <Navbar />
            <Featured type={type}/>
            {
                lists.map((i: IList) => {
                    return <List key={i._id} list={i}/>
                })
            }

        </div>
    )
}

export default Home
