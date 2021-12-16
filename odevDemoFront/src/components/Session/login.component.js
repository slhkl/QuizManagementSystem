import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class Login extends Component {

    constructor(props) {
        super(props);


        this.state = {
            number: "",
            password: "",
            type: "student"
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

    loginRequest() {
        let cookie = new Cookies();
        const body = {
            number: this.state.number,
            password: this.state.password,
            type: this.state.type
        };
        axios.post('http://localhost:8080/api/login', body)
            .then(response => {
                if (response.data == "") {
                    alert("Wrong Password");
                    sessionStorage.setItem("IsLoggedIn", "false")
                }
                else {
                    alert("Login Successful");
                    sessionStorage.setItem("IsLoggedIn", "true")
                    let loginObject = response.data.toString().split(".");
                    sessionStorage.setItem("SessionName", loginObject[0])
                    sessionStorage.setItem("SessionNumber", loginObject[1])
                    sessionStorage.setItem("SessionType", loginObject[2])
                    window.location.reload()
                    // cookie.set("SessionName", loginObject[0]);
                    // cookie.set("SessionNumber", loginObject[1]);
                    // cookie.set("SessionType", loginObject[2]);
                    if (loginObject[2] == "student") {
                        this.props.history.push("/home");
                    } else {
                        this.props.history.push("/question");
                    }
                }
            }).catch(() => {
                sessionStorage.setItem("IsLoggedIn", "false")
                alert("Wrong User")
            })
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    changeNumber = (e) => {
        this.setState({ number: e.target.value });
    }

    changeType = (e) => {
        this.setState({ type: e.target.value });
    }

    render() {
        const {
            number,
            password,
            type
        } = this.state;

        return (
            <div>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>School Number</label>
                    <input type="text" className="form-control" placeholder="Enter school number" onChange={this.changeNumber} value={number} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.changePassword} value={password} />
                </div>

                <div className="form-group">
                    <select className="loginSection" onChange={this.changeType} value={type}>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => this.loginRequest()}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </div>
        );
    }
}
