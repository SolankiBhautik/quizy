import React, { useEffect, useState } from "react";
import axios from "../utils/AxiosInterceptor";

function Profile() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (token) {
            axios.get("/user", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, [token]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.username}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default Profile;
