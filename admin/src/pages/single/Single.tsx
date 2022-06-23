import React from "react"
import './single.scss'

import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table"

const Single: React.FC = () => {
    const linkImg = 'https://img.photolamus.com/eoMrUbOH/x800/8383220f5e92cc0f6db2b2582b5f40b7/digital-cartoon-avatar-icon-hand-drawn-in-colored-style-from-your-photo.jpg'

    return(
        <div className='single'>
            <div className="top">
                <div className="left">
                    <div className="editButton">Edit</div>

                    <h1 className="title">Information</h1>

                    <div className="item">
                        <img src={linkImg} alt="..."/>

                        <div className="details">
                            <h1 className="itemTitle">Jane Doe</h1>

                            <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">janedoe@pm.me</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Phone:</span>
                                <span className="itemValue">+1 2313 12 14</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Address:</span>
                                <span className="itemValue">Elton St. 234 Garden Yd. NewYork</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Country:</span>
                                <span className="itemValue">USA</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right">
                    <Chart
                        aspect={3 / 1}
                        title='User Spending (Last 6 Months)'
                    />
                </div>
            </div>

            <div className="bottom">
                <div className="title">Last Transactions</div>
                <Table />
            </div>
        </div>
    )
}

export default Single