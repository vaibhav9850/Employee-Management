import React, { Component } from 'react';
import './register.css';
import Login from './Login'
import axios from 'axios';
import history from './history';


class AssignRoles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [{

        firstName: '',
        lastName: '',
        email: '',
        password: '',
        joiningDate: '',
        gender: '',
      }]

    }
  }



  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  onSubmit = (e) => {
    e.preventDefault();

    var user = {

      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      joiningDate: this.state.joiningDate,
      gender: this.state.gender,
    }
    this.state.users.push(user)

    this.setState({
      users: this.state.users
    });
    console.log(this.state)
  }



  render() {
    return (

      <div className="MainForm" >

        <form className="formStyle" autoComplete="off" method="Post">

          <h1 style={{ textAlign: "center" }}>Register</h1>
            FirstName
            <input type='text' name='firstName' value={this.state.firstName} onChange={this.formChange} />
          <br></br>

            LastName
            <input type='text' name='lastName' value={this.state.lastName} onChange={this.formChange} />
          <br></br>

           Email
          <input type='email' name='email' value={this.state.email} onChange={this.formChange} style={{ marginLeft: "30px" }} />
          <br></br>


           Password
           <input type='password' name='password' value={this.state.password} onChange={this.formChange} />
          <br></br>

          Joining Date
          <input type='date' name='joiningDate' value={this.state.joiningDate} onChange={this.formChange} />
          <br></br>

          Gender
          <br></br>
          <br></br>
          <div onChange={this.formChange}>
            <input type="radio" value="Male" name="gender" /> Male
        <input type="radio" value="Female" name="gender" /> Female
        <input type="radio" value="Other" name="gender" /> Other
      </div>

          <br></br>

          <button type="submit" onClick={this.onSubmit} className="btn">Submit</button>

          <br></br>
          <br></br>

         Already Registered Go To Login
         <br></br>
          <br></br>
          <button className="btn">Show Data</button>

        </form>

      </div>

    );

  }

}

export default AssignRoles;