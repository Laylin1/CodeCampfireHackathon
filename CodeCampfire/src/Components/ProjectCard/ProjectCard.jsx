import React from "react";

export default function ProjectCard({project}) {

    const createdDate = new Date(project.createdAt).toLocaleDateString("ro-RO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full max-w-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center min-h-[380px]">
            <img
                src={project.authorImage}
                alt={`Poza autorului ${project.author}`}
                className="w-20 h-20 rounded-full mb-4 object-cover shadow-sm"
            />

            <h3 className="text-2xl font-semibold mb-3 text-center text-blue-700">
                {project.title}
            </h3>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed text-center">
                {project.description}
            </p>

            <div className="inline-block text-blue-600 font-semibold text-sm px-4 py-1 border border-blue-600 rounded-full select-none mb-6">
                {project.category}
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 italic">
                <span>Creat de: <strong>{project.author}</strong></span>
                <span>{createdDate}</span>
            </div>
        </div>
    );
}