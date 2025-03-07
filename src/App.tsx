import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Landing} from "./components/Landing.tsx";
const CLIENT_ID = "1051071557636-js3s29e19p6dmo1fnbonlgae1lbsfn5q.apps.googleusercontent.com";

const App: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className="container">
                <Router>
                    <div className="app-header">
                        <h1>Employee Management System</h1>
                    </div>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/employee-list" element={<EmployeeList />} />
                        <Route path="/add-employee" element={<AddEmployee />} />
                        <Route path="/edit-employee/:id" element={<EditEmployee />} />
                    </Routes>
                </Router>
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;