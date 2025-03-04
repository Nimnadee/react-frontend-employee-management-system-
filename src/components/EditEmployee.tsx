import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddEmployee from "./AddEmployee.tsx";

interface Employee {
    employeeName: string;
    salary: string;
    dob: string;
}

const EditEmployee: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee>({ employeeName: "", salary: "", dob: "" });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get<Employee>(`http://localhost:8080/api/employees/${id}`);
                setEmployee({ ...response.data, dob: response.data.dob.split("T")[0] });
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
            await axios.put(`http://localhost:8080/api/employees/${id}`, { ...employee, salary: parseFloat(employee.salary) });
            navigate("/");
        } catch (error) {
            console.error("Error updating employee:", error);
            setError("Failed to update employee. Please try again.");
        }
    };

    return <AddEmployee />;
};

export default EditEmployee;
