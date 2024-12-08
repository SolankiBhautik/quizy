import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const LogoutButton = ({ className = '' }) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className={className}
            >
                Logout
            </button>

            {/* Modal for Logout Confirmation */}
            <Modal
                isOpen={isModalOpen}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
                onCancel={() => setModalOpen(false)}
                onConfirm={() => {
                    handleLogout();
                    setModalOpen(false);
                }}
                confirmText="Logout"
            />
        </>
    );
};

export default LogoutButton;
