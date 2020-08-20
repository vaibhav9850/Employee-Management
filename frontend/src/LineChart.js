import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios'



export default class LineChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Data: {},
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      department: this.props.department
    };
  }

  componentDidMount() {
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const department = this.state.department;

    const data = {
      startDate,
      endDate,
      department
    }
    axios.post("users/linechartOfJoinedEmployee", data)
      .then(res => {
        console.log(res);
        const records = res.data;
        let MonthName = [];
        let departmentCount = [];
        records.forEach(record => {
          MonthName.push(record.joined_month);
          departmentCount.push(record.count);

        });
        this.setState({
          Data: {
            labels: MonthName,
            datasets: [{
              label: 'Employee Joined in last 6 month',
              data: departmentCount,
              fill: false,
              lineTension: 0.5,
              // backgroundColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(0, 99, 132, 0.6)',
              borderColor: 'orange',
              borderWidth: 2,
            }]
          }
        })
      })
  }
  render() {
    return (
      <div>
        <Line
          data={this.state.Data}
          options={{
            title: {
              display: true,
              text: 'Joined People',
              fontSize: 20,
              responsive: true
            },
            legend: {
              display: true,
              position: 'right',

            }
          }}
          width={600} height={200}

        />
      </div>
    );
  }
}
