import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ObjectList = ({
  taskslists,
  setTasksList,
  setTitle,
  setDescription,
  setStartDate,
  setEditMode,
  setActiveTask,
}) => {
  console.log("Tasks", taskslists);
  const checkboxHandler = (id) => {
    let found = taskslists.find((item, index) => index === id);
    found.completed = !found.completed;

    taskslists.splice(id, 1, found);

    setTasksList([...taskslists]);
    // localStorage.setItem("tasksLists", JSON.stringify(taskslists));
  };
  const updateHandler = (task, id) => {
    setActiveTask(id);
    setEditMode(true);
    setTitle(task.title);
    setDescription(task.description);
    setStartDate(new Date(task.startDate));
  };
  const deleteHandler = (id) => {
    taskslists.splice(id, 1);

    setTasksList([...taskslists]);
    console.log("it is this", taskslists);
  };
  return (
    <>
      {taskslists.length ? (
        <div className="todo-list">
          <table>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>

            {taskslists.length &&
              taskslists.map((task, id) => {
                return (
                  <tr
                    key={id}
                    className={`task-item ${
                      task.completed ? "cross-this" : ""
                    }`}
                  >
                    <td>
                      <input
                        onChange={() => checkboxHandler(id)}
                        type="checkbox"
                        checked={task.completed}
                      />
                    </td>
                    {/* <div className="indexNumber">{id + 1}</div> */}
                    <td className="title">{task?.title}</td>
                    <td className="title">{task?.description}</td>
                    <td className="title">
                      {new Date(task?.startDate).toLocaleString()}
                    </td>
                    <td className="action-icons">
                      <span className="edit">
                        <BiEdit onClick={() => updateHandler(task, id)} />
                      </span>
                      <span className="delete">
                        <AiFillDelete onClick={() => deleteHandler(id)} />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ObjectList;
