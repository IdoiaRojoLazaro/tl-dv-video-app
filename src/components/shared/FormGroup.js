import React from 'react';

export const FormGroup = ({ val, handleInputChange, name }) => {
  return (
    <div className="form-group">
      <label>{name}</label>
      <input name={name} type="text" value={val} onChange={handleInputChange} />
    </div>
  );
};
