
import React, { Component, Fragment } from "react";
import './Main.css'
import history from './history'
import axios from "axios";


export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            email: "",
            password: "",

        }

    }


    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmitData = (e) => {

        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const data = {
            email,
            password
        };

        axios.post('users/login', data)
            .then((res) => {

                console.log(' response')
                this.setState({
                    email: '',
                    password: '',

                })

                console.log(res.data.data[0].message)



                var loginStatus = res.data.data[0].message;

                if (loginStatus == 'ADMIN') {
                    alert("WELCOME SUPERUSER")
                    console.log(res.data.data[0].accessToken)
                    localStorage.setItem("login", JSON.stringify(res.data.data[0].accessToken))
                    history.push("/showToAdmin")
                }

                if (loginStatus == 'Normal Admin') {
                    alert("WELCOME NORMAL USER")
                    console.log(res.data.data[0].accessToken)
                    localStorage.setItem("login", JSON.stringify(res.data.data[0].accessToken))
                    history.push("/showToNormalUser")
                }

                if (loginStatus == 'Not An Admin') {
                    alert("user exist......")
                }

                if (loginStatus == 'Invalid Password') {
                    alert("Invalid Password")
                }

                if (loginStatus == 'Invalid Email') {
                    alert("Invalid Email")
                }

            })
            .catch((err) => console.log(err))
    }


    render() {

        return (

            <Fragment>

                <div className="HomePageStyle" >
                    <form className="HomeForm"  method="post">
                        <h1 style={{ textAlign: "center" }}>Login</h1>
                         Email
                         <input type='email' name='email' value={this.state.email} onChange={this.onChange} />
                        <br></br>

                         Password
                        <input type='password' name='password' value={this.state.password} onChange={this.onChange} />
                        <br></br>
                        <br></br>
                        <button type="submit " id="btn" className="btn" onClick={this.onSubmitData}>Login</button>
                        <br></br>
                        <br></br>

                        <button id="btn" className="btn" onClick={(e) => {
                                e.preventDefault()
                                history.push("./registerLocal")}}>Register</button>

                    </form>
                </div>

            </Fragment>
        )
    }


}

