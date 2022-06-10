import React from "react"
import {useWidthList} from "./use-width-list"

import './list.scss'
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from "@mui/icons-material"

import ListItem from "../listItem/ListItem"

const List: React.FC = () => {
    const { isMoved, listRef, handleClick } = useWidthList()

    const classesLeft = isMoved ? 'sliderArrow left' : 'sliderArrow left hidden'

    return(
        <div className="list">
            <span className="listTitle">Continue to watch</span>

            <div className="viewport" id='test'>
                <ArrowBackIosOutlined
                    className={classesLeft}
                    onClick={() => handleClick('left')}
                />

                <div className="container" ref={listRef}>
                    <ListItem index={0} />
                    <ListItem index={1} />
                    <ListItem index={2} />
                    <ListItem index={3} />
                    <ListItem index={4} />
                    <ListItem index={5} />
                    <ListItem index={6} />
                    <ListItem index={7} />
                    <ListItem index={8} />
                    <ListItem index={9} />
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