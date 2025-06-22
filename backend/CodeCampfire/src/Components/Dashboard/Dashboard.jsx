import React, { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal/CreateProjectModal";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUser = async () => {
    try {
      const id = localStorage.getItem("user_id");

      if (!id) {
        console.warn("No user_id in localStorage");
        return;
      }

      const response = await fetch(`http://localhost:8080/getUser/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getProjects = async () => {
    try {
      const id = localStorage.getItem("user_id");

      if (!id) {
        console.warn("No user_id in localStorage");
        return;
      }

      const response = await fetch(`http://localhost:8080/getUserProjects/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const result = await response.json();
      setProjects(result);
      console.log("Projects fetched:", result);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getUser();
    getProjects();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleProjectCreated = () => {
    getProjects(); // Reload list after creation
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-600 text-lg">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Profil Container */}
      <div className="flex gap-20 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user.username} 👋
          </h1>
          <p className="text-gray-600 mb-6">{user.email}</p>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Bio</h2>
            <p className="mt-1 text-gray-600">
              {user.bio ? user.bio : "No bio provided yet."}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Skills</h2>
            {user.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-1">No skills added.</p>
            )}
          </div>
        </div>
        <div>
          <img
            src={`https://randomuser.me/api/portraits/men/${
              Math.floor(Math.random() * 100) + 1
            }.jpg`}
            alt={"Photo"}
            className="w-40 h-40 rounded-full mb-4 object-cover shadow-sm"
          />
        </div>
      </div>

      {/* Proiecte Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Projects</h2>
          <button
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Adaugă anunț
          </button>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, index) => (
              <div
                key={proj.id || index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {proj.title || "Untitled Project"}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {proj.description || "No description available."}
                </p>

                <div className="mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {proj.gitHub && proj.gitHub !== "string" && (
                  <a
                    href={proj.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                  >
                    View on GitHub →
                  </a>
                )}

                {/* ✅ Butoane Editează / Șterge */}
                <div className="flex justify-end gap-3 mt-4">
                  <button className="text-sm px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition">
                    Editează
                  </button>
                  <button className="text-sm px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50 transition">
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>

      {/* Modal pentru adăugare proiect */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={handleProjectCreated}
        author={user.username}
      />
    </div>
  );
}
