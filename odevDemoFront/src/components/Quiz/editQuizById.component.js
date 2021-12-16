import React, { Component } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import DatePicker from "react-datepicker";
import DatePickerCss from "react-datepicker/dist/react-datepicker.css";

export default class EditQuizById extends Component {
    constructor(props) {
        super(props);


        this.state = {
            startDate: new Date(),
            quizId: "",
            lessonId: "",
            lessonName: "",
            questionCount: 0,
            addedTeachersNumber: "",
            quizTimeByMinute: 20
        }
    }
    addRequest() {
        if (this.state.questionCount < 10) {
            alert("There should be at least 10 questions.")
        }
        else {
            const body = {
                lessonId: this.state.lessonId,
                lessonName: this.state.lessonName,
                questionCount: this.state.questionCount,
                addedTeacher: this.state.addedTeachersNumber,
                quizTime: this.state.quizTimeByMinute,
                startDate: this.state.startDate,
            };

            axios.put('http://localhost:8080/api/quiz/' + this.state.quizId, body)
                .then(response => {
                    if (response.data.quizId == -1) {
                        alert("There are not enough questions for the selected lesson.")
                    } else if (response.data.quizId > -1) {
                        alert("successfully updated.")
                        this.props.history.push("quiz")
                    }
                })
        }
    }
    refreshList() {
        let cookie = new Cookies();
        axios.get('http://localhost:8080/api/quiz/get/' + cookie.get("QuizIdForEdit"))
            .then(response => {
                console.log(response.data);
                this.setState({ quizId: response.data.quizId });
                this.setState({ lessonId: response.data.lessonId });
                this.setState({ lessonName: response.data.lessonName });
                this.setState({ questionCount: response.data.questionCount });
                this.setState({ addedTeachersNumber: sessionStorage.getItem("SessionNumber") });
                this.setState({ quizTimeByMinute: response.data.quizTime });
            })
    }
    changeQuestionCount = (e) => {
        this.setState({ questionCount: e.target.value });
    }

    ChangeQuizTime = (e) => {
        this.setState({ quizTimeByMinute: e.target.value });
    }

    changeStartTime(e) {
        console.log(this.state.startDate);
        this.setState({ startDate: e })
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
            startDate,
            questionCount,
            quizTimeByMinute
        } = this.state;
        return (
            <div>
                <div className="form-group">
                    <label>You are editing {new Cookies().get("QuizNameForEdit")} quiz</label>
                </div>
                <div className="form-group">
                    <label>Question Count</label>
                    <input type="number" className="form-control" placeholder="Enter question count" onChange={this.changeQuestionCount} value={questionCount} />
                </div>
                <div className="form-group">
                    <label>Quiz Time By Minute</label>
                    <select className="timeSection" onChange={this.ChangeQuizTime} value={quizTimeByMinute} style={{marginLeft:10}}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Quiz Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => this.changeStartTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="dd/MM/yyyy h:mm aa"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={() => this.addRequest()}>Submit</button>
            </div>
        )

    }
}
