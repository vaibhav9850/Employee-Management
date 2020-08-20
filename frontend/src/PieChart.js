import React from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';  


export default class PieChart extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = { Data: {} }; 
  }

    

  componentDidMount(){
    axios.get("users/piechart")
      .then(res => {
        console.log(res);
        const records = res.data;
        let departmentName=[];
        let departmentCount=[];
        records.forEach(record => {  
          departmentName.push(record.department);  
          departmentCount.push(record.count);  
          
        }); 
        this.setState({
          Data:{
            labels:departmentName,
            datasets:[{
              label: 'Employee distribution',
              data:departmentCount,
              backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
              ], hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
              ]
            }]
          }
        })
      })

  }
  
  render() {
  
    return (
      <div>
        <Pie
            data={this.state.Data}
          
          options={{
           title: {
             display: true,
              text: 'Employee Distribution by Department',
              fontSize: 20,
              
            },

            
            legend: {
              position: 'right',
              fontColor: 'red',
              
            },
            responsive:true

        }}
          width={600} height={200}
          
        />
      </div>
    );
     
  }
}
