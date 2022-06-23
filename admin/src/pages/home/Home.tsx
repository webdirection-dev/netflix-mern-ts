import React from "react"
import './home.scss'

import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table"
import WidgetSm from "../../components/widgetSm/WidgetSm"

import {useGetStat} from "./use-get-stat"
import {useGetAllUsers} from "./use-get-all-users"

const Home: React.FC = () => {
    const {userStat} = useGetStat()
    const {allUsers} = useGetAllUsers()

    return(
        <div className='home'>
            <div className="widgets">
                <Widget type='user' counter={allUsers.length}/>
                <Widget type='order' />
                <Widget type='earning' />
                <Widget type='balance' />
            </div>

            <div className="charts">
                <Featured />
                <Chart
                    aspect={2 / 1}
                    title='User Analytics'
                    userStat={userStat}
                    myDataKey='New User'
                />
            </div>

            <div className="userStatWidgets">
                <WidgetSm />
                <WidgetSm />
                {/*<WidgetLg />*/}
            </div>

            <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <Table />
            </div>
        </div>
    )
}

export default Home