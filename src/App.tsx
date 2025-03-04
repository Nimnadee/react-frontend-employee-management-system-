import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import "./App.css";

const App: React.FC = () => {
    return (
        <div className="container">
            <Router>
                <div className="app-header">
                    <h1>Employee Management System</h1>
                </div>
                <Routes>
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/edit-employee/:id" element={<EditEmployee />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
