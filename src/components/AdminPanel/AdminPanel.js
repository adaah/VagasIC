import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import EditJobForm from './EditJobForm';
import './AdminPanel.css';

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection('jobs').onSnapshot(snapshot => {
      const jobsData = [];
      snapshot.forEach(doc => jobsData.push({ ...doc.data(), id: doc.id }));
      setJobs(jobsData);
    });
    return unsubscribe;
  }, []);

  const handleEditJob = (job) => {
    setIsEditing(true);
    setCurrentJob(job);
  };

  const handleSaveJob = async (job) => {
    try {
      await db.collection('jobs').doc(job.id).update(job);
      setIsEditing(false);
      setCurrentJob(null);
    } catch (error) {
      console.error("Error updating job: ", error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await db.collection('jobs').doc(id).delete();
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <EditJobForm
          job={currentJob}
          onSave={handleSaveJob}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          {jobs.map(job => (
            <div key={job.id} className="job-container">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <button onClick={() => handleEditJob(job)}>Editar</button>
              <button onClick={() => handleDeleteJob(job.id)}>Apagar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;