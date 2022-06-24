import {bgLoginData} from "../../static-data/bg-login-data"

const random = String(Math.random())
    .split('.')[1]
    .split('')
    .find(i => +i < 3)

export const useBgLogin = () => (bgLoginData[Number(random)])