import React, { Component } from 'react';
import './register.css';
import Login from './Login'
import axios from 'axios';
import history from './history';


class RegisterLocal extends Component {

  constructor(props) {
    super(props);
    this.state = {

      firstName: '',
      lastName: '',
      email: '',
      password: '',
      joiningDate: '',
      salary: null,
      department: '',
      gender: '',
      msg: '',
      error:'',

    }

  }



  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  isValid = () => {
    let state = this.state;
    let formIsValid = true;

    if (!state["firstName"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }

    if (!state["lastName"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }
    if (!state["email"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state["email"]))) {    
    
      formIsValid = false;    
      this.setState({'error':"Email Error...."})
      return formIsValid;  
  }    
    if (!state["password"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }
    if (!state["joiningDate"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }
    if (!state["salary"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }
    if (!state["department"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }
    if (!state["gender"]) {
      formIsValid = false;
      this.setState({'error':"All fields are Required...."})
      return formIsValid;
    }

   return formIsValid;

  }



  onSubmit=(e) => {
    e.preventDefault();
    console.log("outside valid")
    if (this.isValid()) {
      console.log("valid")
      const { firstName, lastName, email, password, joiningDate, salary, department, gender } = this.state;

      const user = {
        firstName,
        lastName,
        email,
        password,
        joiningDate,
        salary,
        department,
        gender
      };

      console.log("processing")

      const token = JSON.parse(localStorage.getItem('login'))

      axios.post('users/create', user, {
        headers: {
          'authorization': "Bearer " + token
        }
      })
        .then(res => {
          alert("user added suceesfully")

          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            joiningDate: '',
            salary: '',
            department: '',
            gender:this.state.gender,
            error:''
          })
        })
        .catch(err => {
          console.error(err);
        });

    }
   
  }


  render() {
    var error=this.state.error;
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
          <input type='email' name='email' value={this.state.email} onChange={this.formChange} required/>
          <br></br>
           Password
           <input type='password' name='password' value={this.state.password} onChange={this.formChange} />
          <br></br>
          Joining Date
          <input type='date' name='joiningDate' value={this.state.joiningDate} onChange={this.formChange} />
          <br></br>
           salary
           <input type='number' name='salary' value={this.state.salary} onChange={this.formChange} />
           Department
           <input type='text' name='department' value={this.state.department} onChange={this.formChange} />
          <br></br>

          Gender
          <br></br>
          <br></br>
          <div onChange={this.formChange} value={this.state.value}>
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Other" name="gender" /> Other
          </div>
          <br></br>
         <div style={{ color: "red" }} >{error}</div>
        <button type="submit" onClick={this.onSubmit} className="RegisterBtn">Submit</button>

        </form>

      </div>

    );

  }

}

export default RegisterLocal;