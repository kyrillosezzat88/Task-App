import { useEffect, useState } from "react";
import "./FilterBar.scss";
import "react-datepicker/dist/react-datepicker.css";
import AddTask from "../AddTask/AddTask";
import DatePicker from "react-datepicker";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Apis/Firebase-Config";
import { useTask } from "../../Context/TaskContext";
import { GetAllUserTasks } from "../../Context/Actions/Task-Actions";
export const FilterBar = () => {
  const { TaskApp, dispatch } = useTask();
  const [openTask, setOpenTask] = useState(false);
  const [Filter, setFilter] = useState({
    status: "",
    priority: "",
    search: "",
    dueDate: null,
  });

  const TasksCollections = collection(db, "tasks");
  const HandleTaskPopup = (e) => {
    e.stopPropagation();
    setOpenTask(true);
  };
  useEffect(() => {
    window.addEventListener("click", () => {
      setOpenTask(false);
    });
    return window.removeEventListener("click", () => setOpenTask(false));
  });

  //Filter TAsks by search , priority , status , dueDate
  const FilterData = async (filterBy, filterValue) => {
    Filter[filterBy] = filterValue;
    setFilter({ ...Filter, [filterBy]: filterValue });
    //default query to get all users tasks
    let q = query(TasksCollections, where("userID", "==", TaskApp.user.uid));
    // query to get user tasks filtrated by priority
    if (!Filter.status.length && Filter.priority.length) {
      q = query(
        TasksCollections,
        where("userID", "==", TaskApp.user.uid),
        where("priority", "==", Filter.priority)
      );
    }
    // query to filter user tasks by status
    if (Filter.status.length && !Filter.priority.length) {
      q = query(
        TasksCollections,
        where("userID", "==", TaskApp.user.uid),
        where("status", "==", Filter.status)
      );
    } 
        // query to filter user tasks by status and priority 
    if (Filter.status.length && Filter.priority.length) {
      q = query(
        TasksCollections,
        where("userID", "==", TaskApp.user.uid),
        where("status", "==", Filter.status),
        where("priority", "==", Filter.priority)
      );
    } 

    let userTasks = await getDocs(q).then((res) => {
      if (Filter.search.length) {
        return res.docs
          .filter((doc) => doc.data().title.toLowerCase().includes(Filter.search.toLowerCase()))
          .map((doc) => ({ ...doc.data(), id: doc.id }));
      }
      return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
    // filter tasks by DueDate
    if (Filter.dueDate) {
      let DateTimeStamp = Filter.dueDate.getDate();
      userTasks = userTasks.filter(
        (task) =>
          // eslint-disable-next-line eqeqeq
          new Date(task.dueDate.seconds * 1000).getDate() == DateTimeStamp
      );
    }
    dispatch(GetAllUserTasks(userTasks));
  };
  return (
    <>
      {openTask && <AddTask setOpenTask={setOpenTask} />}
      <div className="FilterBar">
        <input
          type="text"
          placeholder="Search"
          className="FilterBar_Search"
          onChange={(e) => FilterData("search", e.target.value)}
        />
        <select
          name="priority"
          id="priority"
          onChange={(e) => FilterData("priority", e.target.value)}
        >
          <option value="priority" selected disabled hidden>
            Priority
          </option>
          <option value="heigh">Heigh</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          name="Status"
          id="Status"
          onChange={(e) => FilterData("status", e.target.value)}
        >
          <option value="Status" selected disabled hidden>
            Status
          </option>
          <option value="done">Done</option>
          <option value="todo">To Do</option>
        </select>
        <div className="DatePicker">
          <DatePicker
            selected={Filter.dueDate}
            minDate={new Date()}
            placeholderText="Due Date"
            onChange={(date) => {
              FilterData("dueDate", date);
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={HandleTaskPopup}>
          Add Task
        </button>
      </div>
    </>
  );
};
