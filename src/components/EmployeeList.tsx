import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee, Employee } from "../service/employee.service";

const EditEmployee: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee>({ employeeName: "", salary: 0, dob: "" });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(Number(id));
                setEmployee({ ...data, dob: data.dob.split("T")[0] });
            } catch (error) {
                console.error("Error fetching employee:", error);
                setError("Failed to load employee data");
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateEmployee(Number(id), { ...employee, salary: parseFloat(employee.salary.toString()) });
            navigate("/");
        } catch (error) {
            console.error("Error updating employee:", error);
            setError("Failed to update employee. Please try again.");
        }
    };

    return (
        <div className="employee-form">
            <h2>Edit Employee</h2>
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

export default EditEmployee;