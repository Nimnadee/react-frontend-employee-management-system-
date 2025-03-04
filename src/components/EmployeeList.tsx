import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Employee {
    employeeId: number;
    employeeName: string;
    salary: number;
    dob: string;
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get<Employee[]>("http://localhost:8080/api/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`http://localhost:8080/api/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-list">
            <div className="list-header">
                <h2>Employees</h2>
                <Link to="/add-employee" className="btn-add">
                    Add New Employee
                </Link>
            </div>

            <table className="employee-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Date of Birth</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.employeeName}</td>
                            <td>${employee.salary.toFixed(2)}</td>
                            <td>{formatDate(employee.dob)}</td>
                            <td className="actions">
                                <Link to={`/edit-employee/${employee.employeeId}`} className="btn-edit">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(employee.employeeId)} className="btn-delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="no-data">
                            No employees found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
