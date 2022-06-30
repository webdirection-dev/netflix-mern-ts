import React from "react"
import {IUserRows} from "../../types/types"
import Chart from "../chart/Chart";
import Table from "../table/Table";

interface IUserCard {
    item: IUserRows;
    titleCard: string;
}

const UserCard: React.FC<IUserCard> = ({item, titleCard}) => {
    const {username, img, status, email, age} = item

    return(
        <>
            <div className="top">
                <div className="left">
                    <div className="editButton">Edit</div>

                    <h1 className="title">{titleCard} information</h1>

                    <div className="item">
                        <img src={img} alt="..."/>

                        <div className="details">
                            <h1 className="itemTitle">{username}</h1>

                            <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">{email}</span>
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

                {
                    titleCard === 'User' && (
                        <div className="right">
                            <Chart
                                aspect={3 / 1}
                                title='User Spending (Last 6 Months)'
                            />
                        </div>
                    )
                }
            </div>

            <div className="bottom">
                <div className="title">Last Transactions</div>
                <Table />
            </div>
        </>
    )
}

export default UserCard