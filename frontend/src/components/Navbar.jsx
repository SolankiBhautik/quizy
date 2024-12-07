import React from "react";
import { NavLink } from "react-router";
import { useTheme } from "../utils/ThemeContext";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function Navbar() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme == 'dark') {
            setTheme('light');
        } else {
            setTheme('dark')
        }
    }


    return (
        <nav className="bg-primary shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <NavLink to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Quiz App
                    </NavLink>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <NavLink to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/quizzes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Quizzes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Register</NavLink>
                        </li>
                        <li>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full ring-1 ring-gray-700"
                            >
                                {theme === 'light' ? (
                                    <MoonIcon className="h-5 w-5 text-gray-800" />
                                ) : (
                                    <SunIcon className="h-5 w-5 text-yellow-400" />
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

