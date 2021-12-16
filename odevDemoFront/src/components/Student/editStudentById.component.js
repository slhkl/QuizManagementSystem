import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class EditStudentById extends Component {
    constructor(props) {
        super(props);


        this.state = {
            studentName: "",
            studentNumber: "",
            studentSurname: "",
            classId: 1
        }
    }

    addRequest() {
        const body = {
            studentNumber: this.state.studentNumber,
            studentName: this.state.studentName,
            studentSurname: this.state.studentSurname,
            classId: this.state.classId,
        };  
        axios.put('http://localhost:8080/api/student/' + this.state.studentNumber, body)
            .then(response => {
                if (response.data.studentNumber == this.state.studentNumber) {
                    alert("Student updated")
                    this.props.history.push("/student");
                }
            })

    }

    refreshList() {
        let cookie = new Cookies();
        axios.get('http://localhost:8080/api/student/' + cookie.get("StudentNumberForEdit"))
            .then(response => {
                this.setState({ studentNumber: response.data.studentNumber });
                this.setState({ studentName: response.data.studentName });
                this.setState({ studentSurname: response.data.studentSurname });
                this.setState({ classId: response.data.classId });
            })
    }

    componentDidMount() {
        if(sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if(sessionStorage.getItem("SessionNumber") != "0") {
            this.props.history.push("question")
        }
        this.refreshList();
    }

    changeClassId = (e) => {
        this.setState({ classId: e.target.value });
    }

    changeStudentName = (e) => {
        this.setState({ studentName: e.target.value });
    }

    changeStudentSurname = (e) => {
        this.setState({ studentSurname: e.target.value });
    }

    render() {
        const {
            classId,
            studentName,
            studentNumber,
            studentSurname
        } = this.state;
        return (
            <div>
                <div className="form-group">
                    <label>Student Number : {studentNumber}</label>
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
