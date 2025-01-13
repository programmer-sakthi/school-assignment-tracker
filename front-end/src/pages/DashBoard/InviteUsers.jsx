// InviteUsers.jsx
import React, { useState } from 'react';

const InviteUsers = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Invite Sent to:', email);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4">Invite Users</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="User  Email"
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-500