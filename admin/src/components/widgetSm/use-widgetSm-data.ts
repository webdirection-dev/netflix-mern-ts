import {useEffect, useState} from "react"
import axios from "axios"
import {IUser} from "../../static-data/types/types"

import {MY_TOKEN} from "../../static-data/config"
const token = `Bearer ${MY_TOKEN}`

export const useWidgetSmData = () => {
    const [newUsers, setNewUsers] = useState([] as IUser[]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get("/users?new=true", {
                    headers: {
                        authorization: token,
                    },
                });
                setNewUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getNewUsers();
    }, []);

    return {newUsers}
}