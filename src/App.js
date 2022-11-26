import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ObjectList from "./ObjectList";
const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskslists, setTasksList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [activeTask, setActiveTask] = useState();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasksLists"))) {
      setTasksList(JSON.parse(localStorage.getItem("tasksLists")));
    }
  }, []);

  const [errors, setErrors] = useState({});
  const validate = (props) => {
    let errors = {};

    if (!props.title) {
      errors.title = "Title is Required";
    }
    if (!props.description) {
      errors.description = "Description is Required";
    }
    if (new Date(Date.now()) > new Date(startDate)) {
      errors.startDate = "Start Date cannot be less than current Date";
    }
    // console.log("errors", errors);
    return errors;
  };
  useEffect(() => {
    if (taskslists.length) {
      console.log("this ran");
      localStorage.setItem("tasksLists", JSON.stringify(taskslists));
    } else {
      localStorage.removeItem("tasksLists");
    }
  }, [taskslists]);

  const formHandler = (e) => {
    e.preventDefault();
    let task = {
      title,
      description,
      startDate,
      completed: false,
    };
    if (Object.keys(validate(task)).length) {
      setErrors(validate(task));
      return;
    }
    if (editMode) {
      const updatedTodos = taskslists.map((todo, id) => {
        if (id === activeTask) {
          return { ...todo, title, description, startDate };
        }
        return todo;
      });
      setTasksList(updatedTodos);
      setEditMode(false);
      setActiveTask();
      toast.success("Successfully Updated.");
    } else {
      setTasksList((prev) => [...prev, task]);
      toast.success("Successfully Added.");
    }

    setTitle("");
    setErrors({});
    setDescription("");
    setStartDate(new Date());
  };
  return (
    <div className="container">
      {console.log("Task", taskslists)}
      <h1 className="top-title">Crud Apk</h1>
      {console.log("final", taskslists)}

      <form onSubmit={formHandler}>
        <div className="task-container">
          <div className="form-control">
            <div className="label-field">
              <label htmlFor="">Title</label>
              <span className="isrequired">*</span>
            </div>
            <input
              type="text"
              placeholder="Enter a task"
              className="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {errors.title ? (
              <div className="error-msg">{errors.title}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-control">
            <div className="label-field">
              <label htmlFor="">Description</label>
              <span className="isrequired">*</span>
            </div>
            <textarea
              type="text"
              placeholder="Enter a task"
              className="title"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
            />
            {errors.description ? (
              <div className="error-msg">{errors.description}</div>
            ) : (
              ""
            )}
          </div>{" "}
          <div className="form-control">
            <div className="label-field">
              <label htmlFor="">Start Date</label>
              <span className="isrequired">*</span>
            </div>
            <DatePicker
              // timeFormat="hh:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            {errors.startDate ? (
              <div className="error-msg">{errors.startDate}</div>
            ) : (
              ""
            )}
          </div>
          <button type="submit"> {!editMode ? "Add" : "Update"} </button>
        </div>
      </form>
      <ObjectList
        taskslists={taskslists}
        setTasksList={setTasksList}
        setTitle={setTitle}
        setDescription={setDescription}
        setStartDate={setStartDate}
        setEditMode={setEditMode}
        setActiveTask={setActiveTask}
      />

      
    </div>
  );
};

export default App;
