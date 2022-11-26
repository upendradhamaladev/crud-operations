import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ObjectList from "./ObjectList";
import CSVReader from "react-csv-reader";

const App = () => {
  const [startdate, setStartDate] = useState(new Date());
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
    if (new Date(Date.now()) > new Date(startdate)) {
      errors.startdate = "Start Date cannot be less than current Date";
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
      startdate,
      completed: false,
    };
    if (Object.keys(validate(task)).length) {
      setErrors(validate(task));
      return;
    }
    if (editMode) {
      const updatedTodos = taskslists.map((todo, id) => {
        if (id === activeTask) {
          return { ...todo, title, description, startdate };
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
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };
  const handleForce = (data, fileInfo) => {
    data.map((data, index) => {
      console.log("apun", data.startdate);
    });
    setTasksList((prevTask) => [...prevTask, ...data]);
  };
  return (
    <div className="container">
      {console.log("Task", taskslists)}
      <h1 className="top-title">Crud Apk</h1>
      <CSVReader
        cssClass="react-csv-input"
        label="Import Csv"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
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
              selected={startdate}
              onChange={(date) => setStartDate(date)}
            />
            {errors.startdate ? (
              <div className="error-msg">{errors.startdate}</div>
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
