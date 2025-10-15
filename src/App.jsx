import React, { useState, useMemo } from 'react';
import './App.css';

const initialStudents = [
  { id: 1, name: 'Alice Johnson', isPresent: false },
  { id: 2, name: 'Bob Smith', isPresent: true },
  { id: 3, name: 'Charlie Brown', isPresent: false },
  { id: 4, name: 'Diana Prince', isPresent: true },
  { id: 5, name: 'Ethan Hunt', isPresent: false },
  { id: 6, name: 'Fiona Glenn', isPresent: false },
  { id: 7, name: 'George Harrison', isPresent: true },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);

  const handleToggleAttendance = (studentId) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  };

  const presentCount = useMemo(() => {
    return students.filter(student => student.isPresent).length;
  }, [students]);

  const totalStudents = students.length;

  const handleSubmit = () => {
    const dataToSubmit = students.map(({ id, name, isPresent }) => ({ id, name, isPresent }));
    console.log("Attendance Data Submitted:", dataToSubmit);
    alert(`Attendance submitted! Total Present: ${presentCount}`);
  };

  return (
    <div className="fullscreen-container">
      <div className="tracker-card">

        <header className="header">
          <h1>Class Attendance Tracker</h1>
          <p>Mark students as Present using the checkboxes.</p>
        </header>

        <div className="summary">
          <span className="summary-text">Total Students Present:</span>
          <span className="summary-count">
            {presentCount} / {totalStudents}
          </span>
        </div>

        <div className="student-list">
          {students.map((student) => (
            <div
              key={student.id}
              className={`student-item ${student.isPresent ? 'present' : ''}`}
            >
              <div className="name-section">
                <span className="student-name">{student.name}</span>
                <span className={`status-badge ${student.isPresent ? 'present' : 'absent'}`}>
                  {student.isPresent ? 'PRESENT' : 'ABSENT'}
                </span>
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={student.isPresent}
                  onChange={() => handleToggleAttendance(student.id)}
                  className="custom-checkbox"
                />
                {student.isPresent && (
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </label>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit} className="submit-btn">
          Submit Attendance
        </button>

        <footer className="footer">
          Attendance logging system | Powered by React Hooks
        </footer>
      </div>
    </div>
  );
};

export default App;
