import React, { Component, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class LogOut extends Component {
    
    constructor(props) {
        super(props);
        

        this.state = {

        }
    }
    componentDidMount() {
        if(sessionStorage.getItem("IsLoggedIn") == "true")
            window.location.reload();
        sessionStorage.setItem("IsLoggedIn", "false")
        this.props.history.push("/");
    }

    render() {

        const {

        } = this.state;
        return(
            <h1></h1>
        )

    }
}
