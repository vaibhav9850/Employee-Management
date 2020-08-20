import React, { Component } from 'react';
import axios from 'axios'
import './Main.css'

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: this.props.search
        }
    }

    componentDidMount = () => {
        const search = this.state.search;
        const data = {
            search
        }
        axios.post('users/searchRecord', data)
            .then(res => {
                if (res) {
                    const users = res.data;
                    this.setState({ users })
                } else {
                    alert("no record found")
                }

            })


    }

    render() {

        return (

            <div>

                <table id="customers" style={{ border: "1" }}>
                    <thead>
                        <tr>
                            <th>Id </th>
                            <th>FirstName </th>
                            <th>LastName </th>
                            <th>Email </th>
                            <th>Password </th>
                            <th>JoiningDate</th>
                            <th>Gender</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((person) => (
                            <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>{person.firstname}</td>
                                <td>{person.lastname}</td>
                                <td>{person.email}</td>
                                <td>{person.password}</td>
                                <td>{person.joiningdate}</td>
                                <td>{person.gender}</td>
                                <td>{person.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}