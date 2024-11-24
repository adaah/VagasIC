import React, { useState } from 'react';

const EditJobForm = ({ job, onSave, onCancel }) => {
  const [editedJob, setEditedJob] = useState(job);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob(prevJob => ({
      ...prevJob,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(editedJob);
    }}>
      <input
        type="text"
        name="title"
        value={editedJob.title}
        onChange={handleChange}
        placeholder="Título da Vaga"
      />
      <input
        type="text"
        name="company"
        value={editedJob.company}
        onChange={handleChange}
        placeholder="Nome da Empresa"
      />
      <input
        type="text"
        name="location"
        value={editedJob.location}
        onChange={handleChange}
        placeholder="Localização"
      />
      <input
        type="text"
        name="type"
        value={editedJob.type}
        onChange={handleChange}
        placeholder="Tipo de Vaga"
      />
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditJobForm;