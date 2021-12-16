import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default class EditQuestion extends Component {
    constructor(props) {
        super(props);


        this.state = {
            questions: []
        }
    }

    refreshList() {
        var cookie = new Cookies();

        axios.get('http://localhost:8080/api/lessons/' + cookie.get("lessonForEdit"))
            .then(response => {
                this.setState({ questions: response.data });
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

    deleteClick(td) {
        var cookie = new Cookies();
        axios.delete('http://localhost:8080/api/lessons/' + cookie.get("lessonForEdit") + "/" + td.questionId)
            .then(response => {
                this.refreshList()
            })
    }

    editClick(td) {
        var cookie = new Cookies();
        cookie.set("QuestionIdForEdit", td.questionId);
        this.props.history.push("/edit-question-by-id");
    }

    render() {

        const {
            questions
        } = this.state;
        return (
            <table className="table table-striped" id="editQuestion">
                <tbody>
                    {questions.map(td =>
                        <div key={td.questionId}>
                            <tr>
                                <td><span>Question {td.questionId} : </span> {td.question} </td>
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
                                        onClick={() => this.deleteClick(td)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}><span>A)</span> {td.optionA}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><span>B)</span> {td.optionB}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><span>C)</span> {td.optionC}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><span>D)</span> {td.optionD}</td>
                            </tr>
                            <tr >
                                <td colSpan={3}><span>Correct Option For {td.questionId})</span> {td.correctOption}</td>
                            </tr>
                        </div>
                    )}
                </tbody>
            </table>
        )

    }
}
