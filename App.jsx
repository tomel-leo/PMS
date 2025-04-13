import React, { useState } from "react";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import PatientModal from "./components/PatientModal";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addPatient = (patient) => {
    setPatients([patient, ...patients]);
  };

  const updatePatient = (updated) => {
    setPatients(
      patients.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingPatient(null);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Patient Management System</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <PatientForm
        onSubmit={addPatient}
        editingPatient={editingPatient}
        onUpdate={updatePatient}
      />

      <PatientList
        patients={filteredPatients}
        onView={setSelectedPatient}
        onEdit={setEditingPatient}
        onDelete={deletePatient}
      />

      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}
