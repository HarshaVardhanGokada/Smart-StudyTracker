import axios from "axios";

function SubjectCard({ subject, refresh }) {
  const toggleTopic = async (topicId, currentStatus) => {
    await axios.put(
      `http://localhost:3001/api/subjects/${subject._id}/topics/${topicId}`,
      { done: !currentStatus },
      { withCredentials: true }
    );
    refresh();
  };

  const deleteTopic = async (topicId) => {
    await axios.delete(
      `http://localhost:3001/api/subjects/${subject._id}/topics/${topicId}`,
      { withCredentials: true }
    );
    refresh();
  };

  const addTopic = async () => {
    const topicName = prompt("Enter topic name:");
    if (!topicName) return;
    await axios.post(
      `http://localhost:3001/api/subjects/${subject._id}/topics`,
      { name: topicName },
      { withCredentials: true }
    );
    refresh();
  };

  const deleteSubject = async () => {
    await axios.delete(`http://localhost:3001/api/subjects/${subject._id}`, {
      withCredentials: true,
    });
    refresh();
  };

  const doneCount = subject.topics.filter((t) => t.done).length;
  const progress = subject.topics.length
    ? Math.round((doneCount / subject.topics.length) * 100)
    : 0;

  return (
    <div className="card">
      <h3 style={{ marginBottom: "8px" }}>{subject.name}</h3>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "4px" }}>
        Progress: {progress}%
      </p>

      {/* Buttons */}
      <div style={{ marginTop: "12px", marginBottom: "12px" }}>
        <button className="btn-blue" onClick={addTopic}>
          Add Topic
        </button>
        <button
          className="btn-red"
          onClick={deleteSubject}
          style={{ marginLeft: "8px" }}
        >
          Delete Subject
        </button>
      </div>

      {/* Topics list */}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {subject.topics.map((t) => (
          <li
            key={t._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
              padding: "6px 0",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTopic(t._id, t.done)}
                style={{ marginRight: "8px" }}
              />
              <span
                style={
                  t.done
                    ? { textDecoration: "line-through", color: "#6b7280" }
                    : {}
                }
              >
                {t.name}
              </span>
            </div>
            <button
              className="btn-red"
              onClick={() => deleteTopic(t._id)}
              style={{ fontSize: "0.8rem", padding: "4px 8px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectCard;
