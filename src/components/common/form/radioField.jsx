import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ name, options, label, onChange, value }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <div>
                <label className="form-label">{label}</label>
            </div>
            {options.map((option) => {
                return (<div className="form-check form-check-inline" key={ option.name + "_" + option.value }>
                    <input className="form-check-input"
                        checked={option.value === value}
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        value={option.value}
                        onChange={handleChange}/>
                    <label className="form-check-label" htmlFor={option.name + "_" + option.value}>{ option.name }</label>
                </div>);
            })}
        </div>
    );
};
RadioField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};
export default RadioField;
