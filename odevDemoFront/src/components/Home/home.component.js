import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import moment from "moment";
export default class Home extends Component {
    constructor(props) {
        super(props);


        this.state = {
            quiz: [],
            quizIdForQuiz: "",
            studentNumberForQuiz: ""
        }
    }

    refreshList() {
        axios.get('http://localhost:8080/api/quiz/student/' + sessionStorage.getItem("SessionNumber"))
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].startDate = moment(response.data[i].startDate).format("DD/MM/yyyy HH:mm");
                }
                this.setState({ quiz: response.data });
            })
    }

    componentDidMount() {
        if(sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if(sessionStorage.getItem("SessionType") == "teacher") {
            this.props.history.push("question")
        }
        this.refreshList();
    }

    addRequest(td) {
        let cookie = new Cookies();
        let studentNumber = sessionStorage.getItem("SessionNumber");
        let quizId = td.quizId
        axios.get('http://localhost:8080/api/quizResult/' + quizId + "/" + studentNumber)
            .then(response => {
                if (response.data.quizResultId == 0) {
                    if (td.startDate <= moment().format("DD/MM/yyyy HH:mm") && td.startDate >= moment().subtract(td.quizTime, 'm').format("DD/MM/yyyy HH:mm")) {
                        cookie.set("QuizIdForExam", td.quizId)
                        cookie.set("LessonNameForExam", td.lessonName)
                        cookie.set("IsQuizStart", "true")
                        alert("You are being redirected to the exam page");
                        this.props.history.push("/exam")
                    } else {
                        alert("not currently available")
                    }
                } else {
                    alert("You have already taken the exam, go to the result");
                    this.props.history.push("result-student");
                }
            })
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
                            lessonName
                        </th>
                        <th>
                            questionCount
                        </th>
                        <th>
                            Time Minute
                        </th>
                        <th>
                            Start Date
                        </th>
                        <th>
                            Start Quiz
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {quiz.map(td =>
                        <tr key={td.quizId}>
                            <td>{td.lessonName}</td>
                            <td>{td.questionCount}</td>
                            <td>{td.quizTime}</td>
                            <td>{td.startDate}</td>
                            <td>
                                <button type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => this.addRequest(td)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-start" viewBox="0 0 16 16">
                                        <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4zm7.5.633L5.696 8l5.804 3.367V4.633z" />
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
