import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth/user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/subjects", {
          withCredentials: true,
        });
        setSubjects(res.data);
      } catch {
        setSubjects([]);
      }
    };

    fetchUser();
    fetchSubjects();
  }, []);

  const completedTopics = subjects.reduce(
    (acc, subj) => acc + subj.topics.filter((t) => t.done).length,
    0
  );

  return (
    <div>
      {/* Welcome banner at the top */}
      {user && (
        <div style={{
          background: "#2563eb",
          color: "white",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "16px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          Welcome, {user.name}
        </div>
      )}

      <div className="card" style={{ maxWidth: "500px", margin: "auto" }}>
        {user ? (
          <>
            <img
              src={user.photo}
              alt="profile"
              style={{
                width: "80px", height: "80px", borderRadius: "50%",
                margin: "auto", display: "block"
              }}
            />
            <h2 style={{ textAlign: "center", marginTop: "8px" }}>
              {user.name}
            </h2>
            <p style={{ textAlign: "center", color: "#6b7280" }}>{user.email}</p>

            <h3 style={{ marginTop: "16px" }}>Quick Stats</h3>
            <p>Subjects: {subjects.length}</p>
            <p>Completed Topics: {completedTopics}</p>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>Please log in with Google:</p>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                axios.post("http://localhost:3001/auth/google", {
                  token: credentialResponse.credential,
                }, { withCredentials: true })
                .then(() => {
                  setLoginMessage("Login successful!");
                  window.location.reload();
                });
              }}
              onError={() => alert("Login Failed")}
            />
            {loginMessage && (
              <p style={{ color: "green", marginTop: "8px" }}>{loginMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
