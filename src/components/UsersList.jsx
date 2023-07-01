import React, { useState, useCallback } from "react";
import { UserItem } from "./UserItem";
import { UserItemInProgress } from "./UserItemInProgress";
import { UserItemCompleted } from "./UserItemCompleted";

const UsersList = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleAddUser = useCallback(
    (e) => {
      e.preventDefault();
      const newUser = {
        id: users.length + 1,
        name: inputValue,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setInputValue("");
    },
    [inputValue, users]
  );

  const handleRemoveUser = useCallback((id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setInProgress((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setCompleted((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }, []);

  const handleProgress = useCallback((user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

    setInProgress((prevInProgress) => [...prevInProgress, user]);
  }, []);

  const handleComplete = useCallback((user) => {
    setInProgress((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    setCompleted((prevCompleted) => [...prevCompleted, user]);
  }, []);

  const handleUncompleted = useCallback((user) => {
    setCompleted((prevCompleted) =>
      prevCompleted.filter((u) => u.id !== user.id)
    );
    setUsers((prevUsers) => [...prevUsers, user]);
  }, []);
  return (
    <div className="users">
      <form onSubmit={handleAddUser} className="user-form">
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={inputValue}
        />
        <button className="btn-addUser" type="submit">
          დავალების დამატება
        </button>
      </form>

      <div className="conteiner">
        <div className="toBeperformed">
          <p className="todoTitle"> შესასრულებელი დავალება </p>
          {users.map((user) => (
            <UserItem
              key={user.id}
              name={user.name}
              id={user.id}
              actionRemove={handleRemoveUser}
              actionProgress={handleProgress}
              completed={completed}
              user={user}
            />
          ))}
        </div>

        <div className="inProgress">
          <p className="inProgressTitle">დავალება შესრულების პროცესში</p>
          {inProgress.map((user) => (
            <UserItemInProgress
              key={user.id}
              name={user.name}
              id={user.id}
              actionRemove={handleRemoveUser}
              actionComplete={handleComplete}
              completed={completed}
              user={user}
            />
          ))}
        </div>

        <div className="done ">
          <p className="completedTitle"> შესრულებული დავალება</p>
          {completed.map((user) => (
            <UserItemCompleted
              key={user.id}
              name={user.name}
              id={user.id}
              actionRemove={handleRemoveUser}
              completed={completed}
              user={user}
              handleUncompleted={handleUncompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
