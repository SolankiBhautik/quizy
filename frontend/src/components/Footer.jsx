import React from "react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
                    </div>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                            <li><Link href="/quizzes" className="hover:text-gray-300">Quizzes</Link></li>
                            <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

