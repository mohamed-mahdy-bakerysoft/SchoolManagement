import React, { useState } from 'react';
import InputField from '../Shared/InputField';

const StudentForm = ({ onSubmit, student = {} }) => {
  const [formData, setFormData] = useState({
    name: student.name || '',
    class: student.class || '',
    age: student.age || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <InputField
        label="Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter student name"
      />
      <InputField
        label="Class"
        type="text"
        value={formData.class}
        onChange={handleChange}
        placeholder="Enter student class"
      />
      <InputField
        label="Age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Enter student age"
      />
      <button type="submit" className="btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};

export default StudentForm;
