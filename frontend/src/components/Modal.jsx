import React from "react";

const Modal = ({ isOpen, title, message, onCancel, onConfirm, confirmText = "Yes", cancelText = "Cancel" }) => {
    if (!isOpen) return null; // Do not render the modal if not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm">
                {/* Title */}
                <h2 className="text-lg font-bold mb-4">{title}</h2>

                {/* Message */}
                <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
