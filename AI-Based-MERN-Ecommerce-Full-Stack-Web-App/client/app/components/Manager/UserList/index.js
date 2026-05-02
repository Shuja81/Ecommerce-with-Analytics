/**
 *
 * UserList
 *
 */

import React from "react";

import { formatDate } from "../../../utils/date";
import UserRole from "../UserRole";
import Button from "../../Common/Button";

const UserList = (props) => {
    const { users, user, blockUser, unblockUser, fetchUsers } = props;

    const handleBlock = async (userId) => {
        await blockUser(userId);
        fetchUsers(); // Refresh the list
    };

    const handleUnblock = async (userId) => {
        await unblockUser(userId);
        fetchUsers(); // Refresh the list
    };

    return (
        <div className="u-list">
            {users.map((u, index) => (
                <div key={index} className="mt-3 px-4 py-3 user-box">
                    <label className="text-black">Name</label>
                    <p className="fw-medium">
                        {u?.firstName
                            ? `${u?.firstName} ${u?.lastName}`
                            : "N/A"}
                    </p>
                    <label className="text-black">Email</label>
                    <p>{u?.email ?? "-"}</p>
                    <label className="text-black">Provider</label>
                    <p>{u?.provider}</p>
                    <label className="text-black">Account Created</label>
                    <p>{formatDate(u?.created)}</p>
                    <label className="text-black">Role</label>
                    <p className="mb-0">
                        <UserRole user={u} className="d-inline-block mt-2" />
                    </p>
                    <label className="text-black">Status</label>
                    <p className={u.isActive ? "text-success" : "text-danger"}>
                        {u.isActive ? "Active" : "Blocked"}
                    </p>
                    {user.role === "ROLE SUPERADMIN" &&
                        u.role === "ROLE ADMIN" && (
                            <div className="mt-3">
                                {u.isActive ? (
                                    <Button
                                        variant="danger"
                                        text="Block"
                                        onClick={() => handleBlock(u._id)}
                                    />
                                ) : (
                                    <Button
                                        variant="success"
                                        text="Unblock"
                                        onClick={() => handleUnblock(u._id)}
                                    />
                                )}
                            </div>
                        )}
                </div>
            ))}
        </div>
    );
};

export default UserList;
