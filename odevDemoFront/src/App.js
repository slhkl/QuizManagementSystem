import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Session/login.component';
import SignUp from './components/Session/signup.component';
import LogOut from './components/Session/logOut.component';
import Question from './components/Question/question.component';
import AddQuestion from './components/Question/addQuestion.component';
import EditQuestion from './components/Question/editQuestion.component';
import EditQuestionById from './components/Question/editQuestionById.component';
import Quiz from './components/Quiz/quiz.components';
import EditQuizById from './components/Quiz/editQuizById.component';
import AddQuiz from './components/Quiz/addQuiz.component';
import Home from './components/Home/home.component';
import Exam from './components/Exam/exam.component';
import StudentResult from './components/Result/resultForStudent.component';
import TeacherResult from './components/Result/resultForTeacher.component';
import Student from './components/Student/student.component';
import EditStudentById from './components/Student/editStudentById.component';
import AddStudent from './components/Student/addStudent.component';


function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          {
            sessionStorage.getItem("IsLoggedIn") != "true" ? (
              <div>
                <Link className="navbar-brand" to={"/sign-in"}>Login</Link>
                <Link className="navbar-brand" to={"/sign-up"}>SignUp</Link>
              </div>
            ) : (
              sessionStorage.getItem("SessionType") == "teacher" ? ((
                <div>
                  <Link className="navbar-brand" to={"/log-out"}>LogOut</Link>
                  <Link className="navbar-brand" to={"/quiz"}>Quiz</Link>
                  <Link className="navbar-brand" to={"/question"}>Questions</Link>
                  {sessionStorage.getItem("SessionNumber") == 0 ? (
                    
                    <Link className="navbar-brand" to={"/student"}>Student</Link>
                    ) : (console.log("Isn't admin"))
                  }
                  <Link className="navbar-brand" to={"/result-teacher"}>Results</Link>
                </div>
              )) : (
                <div>
                  <Link className="navbar-brand" to={"/log-out"}>LogOut</Link>
                  <Link className="navbar-brand" to={"/home"}>Home</Link>
                  <Link className="navbar-brand" to={"/result-student"}>Results</Link>
                </div>
              )
            )
          }
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/log-out" component={LogOut} />
            <Route path="/question" component={Question} />
            <Route path="/add-question" component={AddQuestion} />
            <Route path="/edit-question" component={EditQuestion} />
            <Route path="/edit-question-by-id" component={EditQuestionById} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/edit-quiz-by-id" component={EditQuizById} />
            <Route path="/add-quiz" component={AddQuiz} />
            <Route path="/home" component={Home} />
            <Route path="/exam" component={Exam} />
            <Route path="/result-student" component={StudentResult} />
            <Route path="/result-teacher" component={TeacherResult} />
            <Route path="/student" component={Student} />
            <Route path="/edit-student-by-id" component={EditStudentById} />
            <Route path="/add-student" component={AddStudent} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
