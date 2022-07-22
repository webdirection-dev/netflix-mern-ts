import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {IUser} from "../../types/types"
import {AuthContext} from "../../context/authContext/AuthContext"

export const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([] as IUser[])
    const {user} = useContext(AuthContext)
    const token = 'Bearer ' + user?.accessToken

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