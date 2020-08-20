import React, { Component } from 'react';
import axios from 'axios';
import './Main.css'
import './record.css'
import Search from './Search'
var pageNum = 1;

export default class ShowData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      search: "",
      isSearch: true
    }

    this.showRecord()

  }


  incrementPage = (e) => {

    pageNum = pageNum + 1;
    this.showRecord()
  }


  decrementPage = (e) => {
    if (pageNum > 1) {
      pageNum = pageNum - 1;
      this.showRecord()
    }
    else {
      alert("Invalid Page")
    }
  }

  showRecord = () => {

    const page = pageNum;

    var token = JSON.parse(localStorage.getItem('login'))

    const data = {
      page
    }

    axios
      .post('http://localhost:800/users/show', data,{
        headers: {
          'authorization': "Bearer " + token
        }
      })
      .then(res => {
        if (res.data.length == 0) {
          pageNum = pageNum - 1;
          alert("Invaid page")

        }
        else {
          const users = res.data;
          console.log(res.data)
          this.setState({ users });
          this.setState({ search:"" });

        }
      })

  }


  onChange = (e) => {

    this.setState({ [e.target.name]: e.target.value })

  }

  SearchRecord = () => {


    const search = this.state.search;
        const data = {
            search
        }

        var token = JSON.parse(localStorage.getItem('login'))

        axios.post('users/searchRecord', data ,{
          headers: {
            'authorization': "Bearer " + token
          }
        })
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
          <div>
            <label style={{ marginLeft: "30px" }}>
              Type to search
      <input type="text" className="searchBox" name='search' onChange={this.onChange} />
              <button className='searchButton' onClick={this.SearchRecord}> Search </button>
            </label>
            <br></br>
            <br></br>
          </div>
          <div id="table">
            {this.state.page}
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

            <br></br>
            <br></br>

            <button className="paginationButton" onClick={this.decrementPage} style={{ float: 'left' }}>PREV</button>
            <button className="paginationButton" onClick={this.incrementPage} style={{ float: 'right' }}>Next</button>
            <h1></h1>

          </div>
        </div>
      )
   
  }
}