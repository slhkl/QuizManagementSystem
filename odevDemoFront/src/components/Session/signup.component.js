import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentName: "",
            studentSurname: "",
            studentNumber: "",
            studentPassword: "",
            classId: 1
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("IsLoggedIn") == "true") {
            if (sessionStorage.getItem("SessionType") == "teacher") {
                this.props.history.push("question")
            } else {
                this.props.history.push("home")
            }
        }
    }

    signUpRequest() {
        const body = {
            studentName: this.state.studentName,
            studentSurname: this.state.studentSurname,
            studentNumber: this.state.studentNumber,
            studentPassword: this.state.studentPassword,
            classId: this.state.classId
        };

        axios.post('http://localhost:8080/api/student/', body)
            .then(response => {
                if (response.data.studentNumber == -1)
                    alert("this number is already registered");

                else if (response.data.studentNumber == this.state.studentNumber) {
                    alert("Registration Successful");
                    this.props.history.push("/");
                }
            })

    }

    changeStudentName = (e) => {
        this.setState({ studentName: e.target.value });
    }

    changeStudentSurname = (e) => {
        this.setState({ studentSurname: e.target.value });
    }

    changeStudentNumber = (e) => {
        this.setState({ studentNumber: e.target.value });
    }

    changeStudentPassword = (e) => {
        this.setState({ studentPassword: e.target.value });
    }

    changeStudentClass = (e) => {
        this.setState({ classId: e.target.value });
    }

    render() {

        const {
            studentName,
            studentSurname,
            studentNumber,
            studentPassword,
            classId
        } = this.state;


        return (
            <div>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={this.changeStudentName} value={studentName} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={this.changeStudentSurname} value={studentSurname} />
                </div>

                <div className="form-group">
                    <label>School Number</label>
                    <input type="text" className="form-control" placeholder="Enter school number" onChange={this.changeStudentNumber} value={studentNumber} />
                </div>

                <div className="form-group">
                    <label>Pick the your class</label>
                    <select className="loginSection" onChange={this.changeStudentClass} value={classId} style={{marginLeft:10}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.changeStudentPassword} value={studentPassword} />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => this.signUpRequest()}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </div>
        );
    }
}