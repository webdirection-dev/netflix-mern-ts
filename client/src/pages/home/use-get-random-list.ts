import {useEffect, useState} from "react"
import axios from "axios";

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTU4OTlmNGViYzAwYjcwOTZmNzA3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTE5MzE3MCwiZXhwIjoxNjU1Mjc5NTcwfQ.G_RYpzaiCBDbZ-dCRfwfPtgds6V6qcB7_tV3LNaiTIU'

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