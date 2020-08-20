import React, { Component } from 'react'
import axios from "axios"
import './Main.css'

export default class AddBulk extends Component {
    state = {
        file: null
    }

    fileChange = (e) => {
        let file = e.target.files[0];
        this.setState({ file: file })
    }
    UploadFile = (e) => {
        e.preventDefault();
        let file = this.state.file
        let formData = new FormData();
        formData.append('file', file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post("users/addBulk", formData, config)
            .then((res) => {
                console.log(res)
                alert(res.data)
            })

    }


    render() {
        return (
            <div className="HomePageStyle">
                <form className="HomeForm" method="post" >
                    <h1 style={{ backgroundColor: "yellow" }, { textAlign: "center" }}>Choose file</h1>
                    <br></br>
                    <br></br>
                    <input type="file" name="file" onChange={this.fileChange} />
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className="btn" onClick={this.UploadFile}>Submit</button>

                </form>
            </div>
        )
    }
}