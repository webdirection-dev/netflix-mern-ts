import {useEffect, useState} from "react"
import axios from "axios"
import {MONTHS, IDataForRender} from "../../static-data/data/stat-data"

import {MY_TOKEN} from "../../static-data/config"
const token = `Bearer ${MY_TOKEN}`

interface IStatFromMongo {
    _id: number;
    total: number
}

export const useGetStat = () => {
    const [userStat, setUserStat] = useState([] as IDataForRender[])

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get(
                    'users/stats',
                    {
                        headers: {
                            authorization: token,
                        }
                    }
                )

                //Сортируем данные от Монги
                const data = res.data.sort((a: any, b: any) => a['_id'] - b['_id'])

                data.map((i: IStatFromMongo) => setUserStat((prev) => [
                        ...prev,
                        {
                            name: MONTHS[i._id - 1],
                            "New User": i.total,
                        }
                    ])
                )
            } catch (err) {
                console.error(err)
            }
        }

        getStats()
    }, [])

    return {userStat}
}