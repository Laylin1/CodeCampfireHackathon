import React from "react";
import { useForm } from "react-hook-form";
import cl from "./LoginForm.module.css";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error to login");
    }

    const result = await response.text();  
    localStorage.setItem("user_id", result);
    location.reload();
  } catch (e) {
    console.log("Error occurred: " + e.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-lg p-8">
        <h2
          className={`${cl.formHeaderText} text-3xl font-semibold text-center mb-8`}
        >
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-3 rounded-xl border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Please choose a password.",
              })}
              className={`w-full px-4 py-3 rounded-xl border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-4xl shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              Sign In
            </button>
            <Link
              to={"/register"}
              className="text-sm font-medium text-indigo-500 hover:text-blue-800"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
