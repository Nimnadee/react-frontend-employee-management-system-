import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";


export function Landing() {
    const navigate = useNavigate();

    return (
        <>
            <h2>Welcome to Employee Management System</h2>
            <GoogleLogin
                size="large"
                shape="circle"
                useOneTap={true}
                onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                        const token = credentialResponse.credential; // Get token
                        localStorage.setItem("authToken", token); // Store token
                        console.log("Login success", jwtDecode(token)); // Decode token
                        navigate("/employee-list");
                    } else {
                        console.log("No credential received");
                    }
                }}
                onError={() => console.log("Login failed")}
            />
        </>
    );
}