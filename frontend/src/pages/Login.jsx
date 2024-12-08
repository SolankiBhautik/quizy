import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [mainError, setMainError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);

            if (value.length < 5 || /\s/.test(value)) {
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

            if (value.length < 8) {
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
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (Object.values(error).some((err) => err !== false)) {
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("authToken", token);

            navigate("/");
        } catch (err) {
            if (err.response && err.response.data.message) {
                setMainError(err.response.data.message)
            } else {
                setMainError("Server error, please try again later.")
            }
        }
    };

    const isValidForm = username && password && !Object.values(error).some((err) => err !== false);

    return (
        <div className="login-page max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
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
                        <p className="text-red-500 text-xs italic">{error.username}</p>
                    )}
                </div>
                <div className="mb-6">
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
                        <p className="text-red-500 text-xs italic">{error.password}</p>
                    )}
                </div>

                {/* Server Error Message */}
                {mainError && (
                    <div className="text-red-500 text-xs italic mb-4">
                        {mainError}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                        type="submit"
                        disabled={!isValidForm}
                    >
                        Sign In
                    </button>
                    <Link
                        to="/register"
                        className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
