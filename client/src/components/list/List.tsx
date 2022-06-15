import React from "react"
import {useWidthList} from "./use-width-list"

import './list.scss'
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from "@mui/icons-material"
import {IList} from "../../types";

import ListItem from "../listItem/ListItem"

interface IListProps {
    list: IList;
}

const List: React.FC<IListProps> = (props) => {
    const {title, content} = props.list

    const { isMoved, listRef, handleClick } = useWidthList()

    const classesLeft = isMoved ? 'sliderArrow left' : 'sliderArrow left hidden'

    return(
        <div className="list">
            <span className="listTitle">{title}</span>

            <div className="viewport" id='test'>
                <ArrowBackIosOutlined
                    className={classesLeft}
                    onClick={() => handleClick('left')}
                />

                <div className="container" ref={listRef}>
                    {
                        content.map((i: string, index: number) => {
                            return <ListItem key={`${Math.random()}`} item={i} index={index}/>
                        })
                    }
                </div>

                <ArrowForwardIosOutlined
                    className='sliderArrow right'
                    onClick={() => handleClick('right')}

                />
            </div>
        </div>
    )
}

export default List