import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../ui/loginForm";
import RegisterForm from "../ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? "register" : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "login"
                        ? <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>Do not has account?
                                {" "}
                                <a role={"button"} onClick={toggleFormType}>Sign Up</a>
                            </p>
                        </>
                        : <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>Already has account?
                                {" "}
                                <a role={"button"} onClick={toggleFormType}>Sign In</a>
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};
export default Login;
