import React, { Component } from 'react';
import LineChart from './LineChart'
import PieChart from './PieChart'
import LineChartOfLeavedEmployee from './LineChartOfLeavedEmployee'
import './report.css'



export default class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      department: "",
      chartType: "",
      error: "",
    }
  }

  formChange = (e) => {

    this.setState({ [e.target.name]: e.target.value })
  }


  isValid = () => {
    let state = this.state;
    let formIsValid = true;

    if (!state["startDate"]) {
      formIsValid = false;
      this.setState({ 'error': "All fields are Required...." })
      return formIsValid;
    }

    if (!state["endDate"]) {
      formIsValid = false;
      this.setState({ 'error': "All fields are Required...." })
      return formIsValid;
    }
    if (!state["department"]) {
      formIsValid = false;
      this.setState({ 'error': "All fields are Required...." })
      return formIsValid;
    }

    return formIsValid;
  }

  lineChartOfJoinedEmployee = (e) => {


    if (this.isValid()) {

      this.setState({
        chartType: 'lineGraphOfJoining',
        error: ""
      })
    }
  }



  pieChart = (e) => {

    this.setState({
      chartType: 'pieChart'
    })
  }


  lineChartOfLeavedEmployee = (e) => {



    if (this.isValid()) {

      this.setState({
        chartType: 'lineGraphOfExit',
        error: ""
      })
    }

  }


  render() {

    const chartType = this.state.chartType;
    var renderedComponent;
    if (chartType == 'lineGraphOfJoining') {

      renderedComponent = <LineChart startDate={this.state.startDate} endDate={this.state.endDate} department={this.state.department} />


    } else if (chartType == 'pieChart') {

      renderedComponent = <PieChart />

    } else if (chartType == 'lineGraphOfExit') {

      renderedComponent = <LineChartOfLeavedEmployee startDate={this.state.startDate} endDate={this.state.endDate} department={this.state.department} />

    } else {
      renderedComponent = <div style={{ height: "520px", marginTop: "80px" }}></div>
    }


    return (
      <div style={{ height: "300px" }}>
        <div>
          <label style={{ marginLeft: '20px', marginTop: "50px" }}>Start Date</label>
          <input type='date' name='startDate' value={this.state.startDate} onChange={this.formChange} />

          <label style={{ marginLeft: '40px' }}>End Date</label>
          <input type='date' name='endDate' value={this.state.endDate} onChange={this.formChange} />

          <label style={{ marginLeft: '40px' }}>Department</label>
          <select name="department" onChange={this.formChange} value={this.state.department} style={{ marginLeft: '40px' }}>
            <option value="select">Select Department</option>
            <option value="HR">HR</option>
            <option value="Financial">Financial</option>
            <option value="Cyber Security">Cyber Security</option>
          </select>
          <br></br>
          <br></br>
          <br></br>

          <div style={{ display: "inline" }}>
            <button className="joinedBtn" onClick={this.lineChartOfJoinedEmployee}>Line chart of Joined Employee</button>

            <button className="piechartBtn" onClick={this.pieChart}>Pie chart of Employee Distribution</button>

            <button className="leavedBtn" onClick={this.lineChartOfLeavedEmployee}>Line chart of leaved employee</button>
          </div>
          <br></br>
          <div style={{ color: "red" }}>{this.state.error}</div>

        </div>

        <div style={{ marginTop: "80px" }}>
          {renderedComponent}
        </div>

      </div>

    )
  }
}