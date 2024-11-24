import React from 'react';
import JobBoard from './components/JobBoard/JobBoard';
import JobSubmission from './components/JobSubmission/JobSubmission';
import AdminPanel from './components/AdminPanel/AdminPanel';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <JobSubmission />
      <JobBoard />
      <AdminPanel />
    </div>
  );
}

export default App;