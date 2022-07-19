import {useLocation} from "react-router-dom"
import {IList, IMovie, IUserRows} from "../../types/types"

interface IPropsToCard {
    props: IMovie | IUserRows | IList
}

export const useGetSingleData = () => {
    const location = useLocation()
    const {props} = location.state as IPropsToCard
    const path = location.pathname.split('/')[1]

    const titleCard = path[0].toUpperCase() + path.slice(1, path.length-1)

    return {titleCard, props}
}