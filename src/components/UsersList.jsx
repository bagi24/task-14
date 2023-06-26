import React, { useState, useCallback } from "react";
import { UserItem } from "./UserItem";

const UsersList = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
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
  }, []);

  const handleComplete = useCallback((user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
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
          <p> შესასრულებელი დავალება </p>
          {users.map((user, index) => (
            <UserItem
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
          <p> შესრულებული დავალება</p>
          {completed.map((user) => {
            return (
              <div key={user.id} className="copmleted-element">
                {user.name}
                <button
                  className="btn-delete"
                  onClick={() => {
                    const updateDelete = completed.filter(
                      (u) => u.id !== user.id
                    );

                    setCompleted(updateDelete);
                  }}
                >
                  delete
                </button>
                <button
                  className="btn-uncompleted"
                  onClick={() => handleUncompleted(user)}
                >
                  unCompleted
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
