import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Employee {
    employeeName: string;
    salary: string;
    dob: string;
}

const AddEmployee: React.FC = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee>({ employeeName: "", salary: "", dob: "" });
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!employee.employeeName || !employee.salary || !employee.dob) {
            setError("All fields are required");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/employees", { ...employee, salary: parseFloat(employee.salary) });
            navigate("/");
        } catch (error) {
            console.error("Error adding employee:", error);
            setError("Failed to add employee. Please try again.");
        }
    };

    return (
        <div className="employee-form">
            <h2>Add New Employee</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Employee Name</label>
                    <input type="text" name="employeeName" value={employee.employeeName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Salary</label>
                    <input type="number" name="salary" value={employee.salary} onChange={handleChange} min="0" step="0.01" required />
                </div>

                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={employee.dob} onChange={handleChange} required />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">Save Employee</button>
                    <button type="button" className="btn-cancel" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
