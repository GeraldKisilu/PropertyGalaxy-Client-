// src/components/SingleUser.js
import React from 'react';

const SingleUser = ({ user, onDeactivate, onReactivate }) => {
    console.log(user)
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.FullName}</td>
      <td>{user.Email}</td>
      <td>{user.role}</td>
      <td>{user.active ? 'Active' : 'Inactive'}</td>
      <td>{user.confirmed ? 'Confirmed': 'Not Confirmed'}</td>
      <td>
        {user.active ? (
          <button onClick={() => onDeactivate(user.id)}>Deactivate</button>
        ) : (
          <button onClick={() => onReactivate(user.id)}>Reactivate</button>
        )}
      </td>
    </tr>
  );
};

export default SingleUser;
