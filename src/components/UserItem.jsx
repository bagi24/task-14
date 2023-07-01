import React, { useCallback } from "react";

export const UserItem = React.memo(({ user, actionRemove, actionProgress }) => {
  const { id, name } = user;

  const handleRemove = useCallback(() => {
    actionRemove(id);
  }, [actionRemove, id]);

  const handleProgress = useCallback(() => {
    actionProgress(user);
  }, [actionProgress, user]);

  return (
    <div className="user-item">
      <p>name: {name}</p>
      <p>id: {id}</p>
      <button className="btn-delete" onClick={handleRemove}>
        Delete
      </button>
      <button className="btn-complete" onClick={handleProgress}>
        Progress
      </button>
    </div>
  );
});
