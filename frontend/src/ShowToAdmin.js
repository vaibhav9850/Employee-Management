import React, { Component } from 'react'
import ShowData from './ShowData'
import history from './history'
import './record.css'

export default class extends Component {



    render() {
        return (
            <div>
                <div>
                    <h1></h1>
                    <form>

                        <ul>
                            <li><button onClick={(e) => {
                                e.preventDefault()
                                history.push("./registerLocal")
                            }}>Add User </button></li>

                            <li><button onClick={(e) => {
                                e.preventDefault()
                                history.push("./addBulk")
                            }}>Upload Sheet </button></li>

                            <li><button onClick={(e) => {
                                e.preventDefault()
                                history.push("./report")
                            }}>Dashboard </button></li>

                            <li><button onClick={(e) => {
                                e.preventDefault()
                                localStorage.removeItem("login");
                                history.push("/")
                            }}>Logout </button></li>
                        </ul>
                    </form>
                </div>
                <br></br>
                <ShowData />



            </div>

        )
    }
}