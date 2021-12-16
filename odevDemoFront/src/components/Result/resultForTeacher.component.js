import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

export default class TeacherResult extends Component {
    constructor(props) {
        super(props);


        this.state = {
            quiz: []
        }
    }

    refreshList() {
        axios.get('http://localhost:8080/api/quizResult/teacher/' + sessionStorage.getItem("SessionNumber"))
            .then(response => {
                this.setState({ quiz: response.data })
            })
    }

    componentDidMount() {
        if (sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if (sessionStorage.getItem("SessionType") == "student") {
            this.props.history.push("home")
        }
        this.refreshList()
    }

    render() {

        const {
            quiz
        } = this.state;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            Quiz Id
                        </th>
                        <th>
                            Lesson Name
                        </th>
                        <th>
                            Student Number
                        </th>
                        <th>
                            Question Count
                        </th>
                        <th>
                            Correct Count
                        </th>
                        <th>
                            Wrong Count
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {quiz.map(td =>
                        <tr key={td.quizId}>
                            <td>{td.quizId}</td>
                            <td>{td.lessonName}</td>
                            <td>{td.studentNumber}</td>
                            <td>{td.questionCount}</td>
                            <td>{td.correctCount}</td>
                            <td>{td.wrongCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )

    }
}