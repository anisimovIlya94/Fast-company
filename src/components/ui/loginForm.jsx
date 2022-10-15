import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState("");
    const { signIn } = useAuth();
    const history = useHistory();
    useEffect(() => {
        validate();
    }, [data]);
    const validatorConfig = {
        email: {
            isRequired: {
                message: `Электронная почта обязательна для заполнения`
            }
        },
        password: {
            isRequired: {
                message: `Пароль обязателен для заполнения`
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
        try {
            await signIn(data);
            history.push(history.location.state ? history.location.state.from.pathname : "/");
        } catch (error) {
            setEnterError(error.message);
        }
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
            <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
                Оставаться в системе
            </CheckBoxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <button className="btn btn-primary w-100 mx-auto mb-2" disabled={!isValid || enterError}>Отправить</button>
        </form>
    );
};

export default LoginForm;
