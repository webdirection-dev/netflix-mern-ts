import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {IUser} from "../../types/types"
import {AuthContext} from "../../context/authContext/AuthContext";

export const useWidgetSmData = () => {
    const [newUsers, setNewUsers] = useState([] as IUser[])
    const {user} = useContext(AuthContext)
    const token = 'Bearer ' + user?.accessToken

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