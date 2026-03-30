import { useState } from "react";
import axios from "axios";

function CreateSubject() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/subjects",
        { name },
        { withCredentials: true }
      );
      alert("Subject created: " + res.data.name);
      setName("");
    } catch (err) {
      alert("Error creating subject");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a New Subject</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Subject</button>
      </form>
    </div>
  );
}

export default CreateSubject;
