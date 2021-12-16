import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default class AddQuestion extends Component {
    constructor(props) {
        super(props);


        this.state = {
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctOption: "A"
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("IsLoggedIn") != "true") {
            this.props.history.push("/")
        }
        if (sessionStorage.getItem("SessionType") == "student") {
            this.props.history.push("home")
        }
    }

    addRequest() {
        var cookie = new Cookies();

        const body = {
            question: this.state.question,
            optionA: this.state.optionA,
            optionB: this.state.optionB,
            optionC: this.state.optionC,
            optionD: this.state.optionD,
            correctOption: this.state.correctOption,
        };


        axios.post('http://localhost:8080/api/lessons/' + cookie.get("lessonForAdd"), body)
            .then(response => {
                alert("question added for " + cookie.get("lessonForAdd"))
                this.props.history.push("/question");
            })
    }

    changeQuestion = (e) => {
        this.setState({ question: e.target.value });
    }

    changeOptionA = (e) => {
        this.setState({ optionA: e.target.value });
    }

    changeOptionB = (e) => {
        this.setState({ optionB: e.target.value });
    }

    changeOptionC = (e) => {
        this.setState({ optionC: e.target.value });
    }

    changeOptionD = (e) => {
        this.setState({ optionD: e.target.value });
    }

    changeCorrectOption = (e) => {
        this.setState({ correctOption: e.target.value });
    }

    render() {

        const {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctOption
        } = this.state;
        return (
            <div>
                <div className="form-group">
                    <label>Question</label>
                    <input type="text" className="form-control" placeholder="Enter question" onChange={this.changeQuestion} value={question} />
                </div>
                <div className="form-group">
                    <label>A</label>
                    <input type="text" className="form-control" placeholder="Enter option A" onChange={this.changeOptionA} value={optionA} />
                </div>
                <div className="form-group">
                    <label>B</label>
                    <input type="text" className="form-control" placeholder="Enter option B" onChange={this.changeOptionB} value={optionB} />
                </div>
                <div className="form-group">
                    <label>C</label>
                    <input type="text" className="form-control" placeholder="Enter option C" onChange={this.changeOptionC} value={optionC} />
                </div>
                <div className="form-group">
                    <label>D</label>
                    <input type="text" className="form-control" placeholder="Enter option D" onChange={this.changeOptionD} value={optionD} />
                </div>
                <div className="form-group">
                    <label>Pick the correct option</label>
                    <select className="loginSection" onChange={this.changeCorrectOption} value={correctOption} style={{marginLeft:10}}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={() => this.addRequest()}>Submit</button>
            </div>

        )

    }
}
