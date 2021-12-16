import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default class Question extends Component {
    constructor(props) {
        super(props);


        this.state = {
            lesson: []
        }
    }

    refreshList() {
        let cookie = new Cookies();
        axios.get('http://localhost:8080/api/lessons/' + sessionStorage.getItem("SessionNumber"))
            .then(response => {
                this.setState({ lesson: response.data });
            })
    }

    componentDidMount() {
        if(sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if(sessionStorage.getItem("SessionType") == "student") {
            this.props.history.push("home")
        }
        this.refreshList()
    }

    editClick(td) {
        var cookie = new Cookies();
        cookie.set("lessonForEdit", td.lessonName);
        this.props.history.push("/edit-question");
    }

    addClick(td) {
        var cookie = new Cookies();
        cookie.set("lessonForAdd", td.lessonName);
        this.props.history.push("/add-question");
    }

    render() {

        const {
            lesson
        } = this.state;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            lessonName
                        </th>
                        <th>
                            questionCount
                        </th>
                        <th>
                            editQuestions
                        </th>
                        <th>
                            addQuestion
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lesson.map(td =>
                        <tr key={td.lessonId}>
                            <td>{td.lessonName}</td>
                            <td>{td.questionCount}</td>
                            <td>
                                <button type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => this.editClick(td)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={() => this.addClick(td)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )

    }
}
