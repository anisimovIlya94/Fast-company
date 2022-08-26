import React, { useState, useEffect } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const validatorConfig = {
        email: {
            isRequired: {
                message: `Электронная почта обязательна для заполнения`
            },
            isEmail: {
                message: "Электронная почта введена некорректно"
            }
        },
        password: {
            isRequired: {
                message: `Пароль обязателен для заполнения`
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigital: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            minSymbols: {
                message: "Пароль должен состоять из не менее 8 символов",
                value: 8
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        console.log(data);
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
                        <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                        <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
