import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistory from "../../common/table/backHistory";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesStatus } from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [errors, setErrors] = useState({});
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsStatus());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesStatus());
    const transformData = (data) => {
        return data.map((item) => ({
            label: item.name,
            value: item._id
        }));
    };
    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && !data && currentUser) {
            setData({ ...currentUser, qualities: currentUser.qualities });
        }
    }, [professions, qualities, data, currentUser]);
    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);
    const getDefaulQualities = () => {
        return transformData(
            qualities.filter((qual) => {
                return data.qualities.includes(qual._id);
            })
        );
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser({ ...currentUser, ...data }));
    };
    return (
        data && (
            <div className="container mt-5">
                <BackHistory />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={transformData(professions)}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={transformData(qualities)}
                                    onChange={handleChange}
                                    defaultValue={getDefaulQualities()}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            </div>
        )
    );
};
export default EditUserPage;
