import {useEffect, useState} from "react"
import axios from "axios"
import {IUser} from "../../types/types"

import {MY_TOKEN} from "../../static-data/config"
const token = `Bearer ${MY_TOKEN}`

export const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([] as IUser[])


    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get(
                    'users',
                    {
                        headers: {
                            authorization: token,
                        }
                    }
                )

                setAllUsers(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        getStats()
    }, [])

    return {allUsers}
}