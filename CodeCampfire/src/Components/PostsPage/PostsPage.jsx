import React, { useEffect, useState } from "react";
import Container from "../Container";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function PostsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState();
  const colaborators = [
    { photo: "https://randomuser.me/api/portraits/men/3.jpg" },
    { photo: "https://randomuser.me/api/portraits/men/4.jpg" },
    { photo: "https://randomuser.me/api/portraits/men/5.jpg" },
    { photo: "https://randomuser.me/api/portraits/men/6.jpg" },
    { photo: "https://randomuser.me/api/portraits/men/7.jpg" },
  ];

  const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/projects");
      if (!response.ok) {
        throw new Error("Error projects");
      }
      const result = await response.json();
      console.log(result);
      setProjects(result);
    } catch (e) {
      console.log("Error" + e);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <Container>
        {projects ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 ">
            {projects.map((project, index) => {
              project.authorImage = `https://randomuser.me/api/portraits/men/${
                Math.floor(Math.random() * 100) + 1
              }.jpg`;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer"
                >
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </div>
        ) : (
          "No projects"
        )}
      </Container>
      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="flex p-20 bg-white w-[70%] h-[70%] max-w-5xl rounded-xl shadow-2xl relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-1/2 ">
              <h1 className="text-xl font-bold mb-2">
                {selectedProject.title}
              </h1>
              <p className="text-md text-gray-700 mb-4">
                {selectedProject.description}
              </p>
              <p className="text-sm text-gray-500">
                Author: {selectedProject.author}
              </p>
              <p className="text-sm text-gray-500">Posted date: 18 iun. 2025</p>
              <div className="mt-4 flex gap-2">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div>
                <div className="mt-4 text-xs text-indigo-700 rounded-full">
                  Colaborators:
                </div>
                <div className="flex -space-x-2.5 mt-4 ">
                  {colaborators.map((item, key) => {
                    return (
                      <img
                        key={key}
                        src={item.photo}
                        alt={`Colaborators`}
                        className="w-10 h-10 rounded-full mb-4 object-cover shadow-sm"
                      />
                    );
                  })}
                </div>
              </div>
              <button
                type="submit"
                className=" mt-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-4xl shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all"
              >
                Colaborate
              </button>
            </div>
            <div className="flex w-1/2 justify-center">
              <img
                src={selectedProject.authorImage}
                alt={`Poza autorului ${selectedProject.author}`}
                className="w-40 h-40 rounded-full mb-4 object-cover shadow-sm"
              />
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
