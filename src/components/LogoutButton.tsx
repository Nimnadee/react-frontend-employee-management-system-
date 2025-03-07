import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return (
        <button onClick={handleLogout} className="btn-logout">
            Logout
        </button>
    );
};

export default LogoutButton;