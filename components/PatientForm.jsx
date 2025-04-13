import React, { useState, useEffect } from "react";

const defaultState = {
  name: "",
  age: "",
  diagnosis: "",
  ward: "General",
  notes: "",
};

export default function PatientForm({ onSubmit, editingPatient, onUpdate }) {
  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient);
    } else {
      setFormData(defaultState);
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.diagnosis) return;

    const newPatient = {
      ...formData,
      id: formData.id || Date.now(),
      createdAt: formData.createdAt || new Date().toISOString(),
    };

    editingPatient ? onUpdate(newPatient) : onSubmit(newPatient);
    setFormData(defaultState);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />
      <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="p-2 border rounded" />
      <input name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="Diagnosis" className="p-2 border rounded" />
      <select name="ward" value={formData.ward} onChange={handleChange} className="p-2 border rounded">
        <option>General</option>
        <option>Surgery</option>
        <option>Gynecology</option>
        <option>Pediatrics</option>
      </select>
      <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="p-2 border rounded md:col-span-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
        {editingPatient ? "Update Patient" : "Add Patient"}
      </button>
    </form>
  );
}
