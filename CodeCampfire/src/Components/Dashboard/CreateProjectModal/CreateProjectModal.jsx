// CreateProjectModal.jsx
import React, { useState } from "react";

export default function CreateProjectModal({ isOpen, onClose, onSuccess, author }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    technologies: "",
    coAuthors: "",
    gitHub: "",
    author: author,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
      coAuthors: formData.coAuthors.split(",").map((c) => c.trim()),
      gitHub: formData.gitHub,
      author: author,
    };

    try {
      const response = await fetch("http://localhost:8080/createProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to create project");

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-xl shadow-lg border-2 border-blue-500">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Adaugă Proiect</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Titlu" onChange={handleChange} required className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="description" placeholder="Descriere" onChange={handleChange} required className="w-full border border-blue-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="category" placeholder="Categorie" onChange={handleChange} required className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="technologies" placeholder="Tehnologii (ex: React, Node)" onChange={handleChange} className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="coAuthors" placeholder="Co-autori (ex: John, Maria)" onChange={handleChange} className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input name="gitHub" placeholder="GitHub URL" onChange={handleChange} className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 transition">
              Anulează
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Salvează
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
