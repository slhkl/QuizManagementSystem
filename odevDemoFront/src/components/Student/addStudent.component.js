import React, { Component } from "react";
import axios from "axios";

export default class AddStudent extends Component {
    constructor(props) {
        super(props);


        this.state = {
            studentNumber: "",
            studentName: "",
            studentSurname: "",
            studentPassword: "",
            classId: 1
        }
    }

    addRequest() {
        const body = {
            studentNumber: this.state.studentNumber,
            studentName: this.state.studentName,
            studentSurname: this.state.studentSurname,
            studentPassword: this.state.studentPassword,
            classId: this.state.classId,
        };

        axios.post('http://localhost:8080/api/student/', body)
            .then(response => {
                if (response.data.studentNumber == -1) {
                    alert("This student number is already regirtered")
                } else {
                    alert("Student Added")
                    this.props.history.push("/student");
                }
            })
    }

    changeClassId = (e) => {
        this.setState({ classId: e.target.value });
    }

    changeStudentName = (e) => {
        this.setState({ studentName: e.target.value });
    }

    changeStudentNumber = (e) => {
        this.setState({ studentNumber: e.target.value });
    }

    changeStudentPassword = (e) => {
        this.setState({ studentPassword: e.target.value });
    }

    changeStudentSurname = (e) => {
        this.setState({ studentSurname: e.target.value });
    }

    componentDidMount() {
        if(sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if(sessionStorage.getItem("SessionNumber") != "0") {
            this.props.history.push("question")
        }
    }

    render() {

        const {
            classId,
            studentName,
            studentNumber,
            studentPassword,
            studentSurname
        } = this.state;
        return (
            <div>
                <div className="form-group">
                    <label>Student Number</label>
                    <input type="text" className="form-control" placeholder="Enter Student Name" onChange={this.changeStudentNumber} value={studentNumber} />
                </div>
                <div className="form-group">
                    <label>Student Name</label>
                    <input type="text" className="form-control" placeholder="Enter Student Name" onChange={this.changeStudentName} value={studentName} />
                </div>
                <div className="form-group">
                    <label>Student Surname</label>
                    <input type="text" className="form-control" placeholder="Enter question" onChange={this.changeStudentSurname} value={studentSurname} />
                </div>
                <div className="form-group">
                    <label>Student Pasword</label>
                    <input type="password" className="form-control" placeholder="Enter question" onChange={this.changeStudentPassword} value={studentPassword} />
                </div>
                <div className="form-group">
                    <label>Pick the his/her class</label>
                    <select className="classSection" onChange={this.changeClassId} value={classId} style={{ marginLeft: 10 }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={() => this.addRequest()}>Submit</button>
            </div>
        )

    }
}
