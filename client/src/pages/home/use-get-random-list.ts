import {useEffect, useState} from "react"
import axios from "axios";

import {MY_TOKEN} from "../../config"
const token = `Bearer ${MY_TOKEN}`

export const useGetRandomList = (type?: string) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        const getRandomList = async () => {
            try {
                const res = await axios.get(
                    `/lists${type ? "?type=" + type : ''}${genre ? "&genre=" + genre : ''}`,
                    {
                        headers: {
                            authorization: token,
                        }
                    },
                )
                setLists(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        getRandomList()
    }, [type, genre])

    return {lists}
}