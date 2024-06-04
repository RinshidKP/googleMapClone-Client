import React, { useEffect, useState } from 'react';
import { useUserAxios } from '../hooks/useUserAxios';
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/user';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const Axios = useUserAxios();
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await Axios.get('/dashboard');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [Axios]);

    const handleLogout = () => {
        dispatch(userLogout());
    };



    return (
        <div className="bg-transparent min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">Welcome Admin</h1>
                <div>
                    <Link
                        to='/'
                        className="mr-4 text-yellow-500 hover:text-yellow-700"
                    >
                        Home
                    </Link>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                        Logout
                    </button>
                </div>
            </header>
            <main className="flex-grow p-6">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Username</th>
                            <th className="border border-gray-300 px-4 py-2">Verified</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.verified ? 'Yes' : 'No'}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="text-red-500 hover:text-red-700">Block</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Dashboard;
