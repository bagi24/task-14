import React, { useCallback } from "react";

export const UserItemCompleted = React.memo(
  ({ user, actionRemove, handleUncompleted }) => {
    const { id, name } = user;

    const handleRemove = useCallback(() => {
      actionRemove(id);
    }, [actionRemove, id]);

    const handleUncomple = useCallback(() => {
      handleUncompleted(user);
    }, [handleUncompleted, user]);

    return (
      <div className="user-item">
        <p>name: {name}</p>
        <p>id: {id}</p>
        <button className="btn-delete" onClick={handleRemove}>
          Delete
        </button>
        <button className="btn-complete" onClick={handleUncomple}>
          Uncompleted
        </button>
      </div>
    );
  }
);
