import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import moment from "moment";
import CountdownTimer from "react-component-countdown-timer";
import Countdown from 'react-countdown';

export default class Exam extends Component {
    constructor(props) {
        super(props);


        this.state = {
            counter: parseInt(new Cookies().get("Counter")),
            questionId: "",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            chosedOption: "Empty",
            correctOption: "",
            quizTime: "",
            lessonName: "",
            questionCount: "",
            startDate: ""
        }
    }

    refreshList() {
        let cookie = new Cookies();
        axios.get('http://localhost:8080/api/quiz/get/' + cookie.get("QuizIdForExam"))
            .then(response => {
                this.setState({ lessonName: response.data.lessonName });
                this.setState({ questionCount: response.data.questionCount });
                this.setState({ quizTime: response.data.quizTime });
                cookie.set("EndDate", moment(response.data.startDate).add(response.data.quizTime, 'm').format("DD/MM/yyyy HH:mm"))
                cookie.set("StartDate", moment(response.data.startDate).format("DD/MM/yyyy HH:mm"))
                this.setState({ startDate: response.data.startDate })
            })

    }

    nextQuestion() {
        let cookie = new Cookies();

        axios.get('http://localhost:8080/api/lessons/' + cookie.get("LessonNameForExam") + "/get/" + this.state.counter)
            .then(response => {
                this.setState({ question: response.data.question });
                this.setState({ optionA: response.data.optionA });
                this.setState({ optionB: response.data.optionB });
                this.setState({ optionC: response.data.optionC });
                this.setState({ optionD: response.data.optionD });
                this.setState({ questionId: response.data.questionId });
                this.setState({ correctOption: response.data.correctOption });
            })
    }

    componentDidMount() {
        let cookie = new Cookies();
        if (sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if (sessionStorage.getItem("SessionType") == "teacher") {
            this.props.history.push("question")
        }
        this.refreshList();
        if (cookie.get("IsQuizStart") == "true") {

        } else {
            if (cookie.get("StartDate") > moment().format("DD/MM/yyyy HH:mm") || cookie.get("EndDate") <= moment().format("DD/MM/yyyy HH:mm")) {
                alert("You cannot access this page right now");
                this.props.history.push("home")
            }
        }
        this.nextQuestion();

    }

    changeAnswer = (e) => {
        this.setState({ chosedOption: e.target.value });
    }

    addRequestForQuestion() {
        let cookie = new Cookies();
        const body = {
            studentNumber: sessionStorage.getItem("SessionNumber"),
            quizId: cookie.get("QuizIdForExam"),
            questionId: this.state.questionId,
            chosenOption: this.state.chosedOption,
            correctOption: this.state.correctOption
        };
        axios.post('http://localhost:8080/api/result/', body)
            .then(response => {
                this.nextQuestion();
                if (this.state.questionCount == cookie.get("Counter")) {
                    axios.post('http://localhost:8080/api/quizResult/' + cookie.get("QuizIdForExam") + "/" + sessionStorage.getItem("SessionNumber"))
                        .then(response => {
                        })
                    cookie.set("Counter", 0)
                    alert("end")
                    this.props.history.push("home");
                }
            })
        this.setState({ chosedOption: "Empty" })
        if (this.state.questionCount > this.state.counter + 1) {
            this.setState({ counter: this.state.counter + 1 })
            cookie.set("Counter", this.state.counter + 1)
        } else {
            cookie.set("Counter", this.state.counter + 1)
        }
    }

    render() {
        const Completionist = () => {
            new Cookies().set("IsQuizStart", "false")
            window.location.reload()
        };

        const renderer = ({ minutes, seconds, completed }) => {
            if (completed) {
                return <Completionist />;
            } else {
                return <span> Kalan süreniz : {minutes}:{seconds}</span>;
            }
        };


        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            counter,
            chosedOption,
            startDate,
            quizTime
        } = this.state;

        return (
            <div>
                <table className="table table-striped">
                    <tr>
                        <td>
                            <Countdown
                                date={moment(startDate).add(quizTime, 'm')}
                                renderer={renderer}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <span>Question {counter + 1}</span> : {question}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <span>A)</span> {optionA}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>B)</span> {optionB}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>C)</span> {optionC}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>D)</span> {optionD}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Chose your option</label>
                            <select className="examSection" onChange={this.changeAnswer} value={chosedOption} style={{ marginLeft: 10 }}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="Empty">Empty</option>
                            </select>
                            <button type="button"
                                style={{ marginLeft: 600 }}
                                className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => this.addRequestForQuestion()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-forward-fill" viewBox="0 0 16 16">
                                    <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z" />
                                </svg>
                            </button>
                        </td>
                    </tr>

                </table>
            </div >
        )

    }
}
