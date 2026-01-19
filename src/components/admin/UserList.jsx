import React, { useEffect, useState } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../services/userService';
import { Search, Trash2, Shield, User, UserCheck } from 'lucide-react';
import { TableRowSkeleton } from '../common/Skeletons';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await updateUserRole(userId, newRole);
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      } catch (error) {
        alert("Failed to update role");
      }
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user profile? Note: This does not delete their login credentials (requires Admin SDK).')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Users</h2>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none w-full sm:w-64 text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* List */}
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-400 font-semibold text-sm">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {loading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <TableRowSkeleton key={i} />
              ))
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 font-bold">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          user.fullName?.charAt(0).toUpperCase() || 'U'
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{user.fullName || 'Unknown'}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex w-fit items-center gap-1 ${user.role === 'admin'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'
                      }`}>
                      {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRoleChange(user.id, user.role)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                      >
                        <UserCheck size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {loading ? (
          [1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-xl" />)
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">No users found.</div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 font-bold flex-shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.fullName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    user.fullName?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{user.fullName || 'Unknown'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full flex w-fit items-center gap-1 ${user.role === 'admin'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'
                  }`}>
                  {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                  {user.role || 'user'}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleRoleChange(user.id, user.role)}
                    className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 rounded-lg transition-colors"
                    title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                  >
                    <UserCheck size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
