import React, { useState } from 'react';
import { db } from '../../services/firebase';
import extractJobInfo from '../../services/extractJobInfo';
import './JobSubmission.css';

const JobSubmission = () => {
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobInfo = await extractJobInfo(link);
      await db.collection('jobs').add({
        ...jobInfo,
        flags: 0, // Inicializa o campo de sinalizações
      });
      setLink('');
    } catch (error) {
      console.error("Error adding job: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-submission-form">
      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Cole o link da vaga"
        required
      />
      <button type="submit">Enviar Vaga</button>
    </form>
  );
};

export default JobSubmission;