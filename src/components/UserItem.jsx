import React, { useCallback } from "react";

export const UserItem = React.memo(({ user, actionRemove, actionComplete }) => {
  const { id, name } = user;

  const handleRemove = useCallback(() => {
    actionRemove(id);
  }, [actionRemove, id]);

  const handleComplete = useCallback(() => {
    actionComplete(user);
  }, [actionComplete, user]);

  return (
    <div className="user-item">
      <p>name: {name}</p>
      <p>id: {id}</p>
      <button className="btn-delete" onClick={handleRemove}>
        Delete
      </button>
      <button className="btn-complete" onClick={handleComplete}>
        Complete
      </button>
    </div>
  );
});
