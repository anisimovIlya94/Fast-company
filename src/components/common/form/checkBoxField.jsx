import React from 'react'
import PropTypes from "prop-types";

const CheckBoxField = ({ name, onChange, children, value, error }) => {
   const handleChange = () => {
      onChange({ name: name, value: !value })
   };
   const getInputClasses = () => {
      return "form-check-input " + (error ? "is-invalid" : "");
  };
  return (
   <div className="form-check mb-4">
        <input className={getInputClasses()} type="checkbox" value="" id={name} onChange={handleChange}/>
      <label className="form-check-label" htmlFor={name}>
      {children}
        </label>
      {error && <div className='invalid-feedback'>{error}</div>}
   </div>
  )
}
CheckBoxField.propTypes = {
   name: PropTypes.string,
   onChange: PropTypes.func,
   value: PropTypes.bool,
   error: PropTypes.string,
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node),PropTypes.node])
};
export default CheckBoxField