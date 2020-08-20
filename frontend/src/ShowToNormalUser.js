import React, { Component } from 'react'
import ShowData from './ShowData'
import axios from 'axios'
import './record.css'
import history from './history'

export default class extends Component {

    assignRole = (e) => {
        e.preventDefault()
        var id,role;

         id = prompt("Enter the id of employee ")
        if(id){
             role = prompt("Enter the role for employee")
             const data = { id, role }
             axios.put("users/update", data)
            .then(res => console.log(res.data))
        }
        
    }


    render() {
        return (
            <div>
                <div>
                    <ul>
                        <li>   <button onClick={this.assignRole}>Assign Role </button></li>
                        <li><button onClick={(e) => {
                            e.preventDefault();
                            history.push("addBulk")
                        }}>Upload Sheet </button></li>
                        <li><button onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem("login");
                            history.push("/")
                        }}>Logout </button></li>
                    </ul>
                </div>
                <br></br>
                <br></br>

                <ShowData />
            </div>

        )
    }
}