import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const verifyToken = async (token: string): Promise<void> => {
    await axios.post(`${API_URL}/verify`, { token });
};