import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Register() {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [error, setError] = useState({});
    const [mainError, setMainError] = useState(null);
    const navigate = useNavigate();

    const isFormValid = !Object.values(error).some((err) => err);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);

            // Validate username (example: minimum 5 characters, no spaces)
            if (value && (value.length < 5 || /\s/.test(value))) {
                setError((prev) => ({
                    ...prev,
                    username: "Username must be at least 5 characters long and cannot contain spaces.",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    username: false,
                }));
            }
        }

        if (name === "password") {
            setPassword(value);

            // Validate password (at least 8 characters)
            if (value && value.length < 8) {
                setError((prev) => ({
                    ...prev,
                    password: "Password must be at least 8 characters long.",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    password: false,
                }));
            }
        }

        if (name === "conformPassword") {
            setConformPassword(value);

            // Validate confirm password (must match password)
            if (value && value !== password) {
                setError((prev) => ({
                    ...prev,
                    conformPassword: "Passwords do not match.",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    conformPassword: false,
                }));
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/register`, {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("authToken", token);

            setMainError(null);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.message) {
                setMainError(err.response.message);
            } else {
                console.error("Registration failed:", err);
                setMainError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="register-page max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
            <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
                <div className="mb-4 relative">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                    {error.username && (
                        <span className="absolute text-xs text-red-500 bg-gray-100 rounded-md px-2 py-1 mt-1 -bottom-4 right-0 shadow-md transition-opacity duration-300">
                            {error.username}
                        </span>
                    )}
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                    {error.password && (
                        <span className="absolute text-xs text-red-500 bg-gray-100 rounded-md px-2 py-1 mt-1 -bottom-4 right-0 shadow-md transition-opacity duration-300">
                            {error.password}
                        </span>
                    )}
                </div>
                <div className="mb-6 relative">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="conformPassword">
                        Confirm Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        id="conformPassword"
                        name="conformPassword"
                        type="password"
                        placeholder="******************"
                        value={conformPassword}
                        onChange={handleInputChange}
                        required
                    />
                    {error.conformPassword && (
                        <span className="absolute text-xs text-red-500 bg-gray-100 rounded-md px-2 py-1 mt-1 -bottom-4 right-0 shadow-md transition-opacity duration-300">
                            {error.conformPassword}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className={`${isFormValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200`}
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Register
                    </button>
                    <Link
                        to="/login"
                        className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Already have an account?
                    </Link>
                </div>
                {mainError && (
                    <div className="mt-4 text-center text-red-500 text-sm">
                        {mainError}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Register;
