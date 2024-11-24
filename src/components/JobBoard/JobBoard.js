import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import './JobBoard.css';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('jobs').onSnapshot(snapshot => {
      const jobsData = [];
      snapshot.forEach(doc => jobsData.push({ ...doc.data(), id: doc.id }));
      setJobs(jobsData);
    });
    return unsubscribe;
  }, []);

  const handleFlagJob = async (id, currentFlags) => {
    try {
      // Incrementa o número de sinalizações e verifica se deve ser removido
      await db.collection('jobs').doc(id).update({
        flags: currentFlags + 1
      });

      // Remove a vaga se o número de sinalizações for 5 ou mais
      if (currentFlags + 1 >= 5) {
        await db.collection('jobs').doc(id).delete();
      }
    } catch (error) {
      console.error("Error flagging job: ", error);
    }
  };

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id} className="job-container">
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.type}</p>
          <a href={job.link}>Link</a>
          <button onClick={() => handleFlagJob(job.id, job.flags || 0)}>
            Sinalizar Vaga Encerrada
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobBoard;