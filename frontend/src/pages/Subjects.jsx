import { useEffect, useState } from "react";
import axios from "axios";
import SubjectCard from "../components/SubjectCard";

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/subjects", {
        withCredentials: true,
      });
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const addSubject = async () => {
    const subjectName = prompt("Enter subject name:");
    if (!subjectName) return;
    await axios.post(
      "http://localhost:3001/api/subjects",
      { name: subjectName },
      { withCredentials: true }
    );
    fetchSubjects();
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>
        My Subjects
      </h2>
      <button className="btn-blue" onClick={addSubject} style={{ marginBottom: "16px" }}>
        Add Subject
      </button>
      {subjects.length === 0 ? (
        <p>No subjects yet. Try adding one!</p>
      ) : (
        subjects.map((s) => (
          <SubjectCard key={s._id} subject={s} refresh={fetchSubjects} />
        ))
      )}
    </div>
  );
}

export default Subjects;
