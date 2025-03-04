import axios from "axios";

export interface Employee {
    employeeId?: number;
    employeeName: string;
    salary: number;
    dob: string;
}

const API_URL = "http://localhost:8080/api/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get<Employee[]>(API_URL);
    return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
    const response = await axios.get<Employee>(`${API_URL}/${id}`);
    return response.data;
};

export const addEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await axios.post<Employee>(API_URL, employee);
    return response.data;
};

export const updateEmployee = async (id: number, employee: Employee): Promise<Employee> => {
    const response = await axios.put<Employee>(`${API_URL}/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};