import "./TaskCard.scss";
import {deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {db} from '../../Apis/Firebase-Config'
import {toast} from 'react-toastify'
import Delete from "../../Assets/Icons/delete.svg";
import Edit from "../../Assets/Icons/edit.png";
import { SwitchBtn } from "../SwitchBtn/SwitchBtn";
import { useTask } from "../../Context/TaskContext";
import { RemoveTask, UpdateTask } from "../../Context/Actions/Task-Actions";
import { Link } from "react-router-dom";
const TaskCard = ({title , description , status , priority , dueDate , createdAt , id}) => {
  const {dispatch} = useTask();
  // delete Task 
  const DeleteTask = async () => {
    let taskDoc = await doc(db,'tasks',id);
    // eslint-disable-next-line no-restricted-globals
    let confirmDelete = confirm('Are You Sure ?');
    if(confirmDelete){
      await deleteDoc(taskDoc).then( () => {
        dispatch(RemoveTask(id)); // dispatch an remove action to delete task from global state 
        toast('Task Deleted' , {type:'success'});
      }).catch(error => toast(error.message , {type:'error'}))
    }
  }
  // update Task status 
  const ChangeStataus = async (TaskStatus) => {
    let TaskDoc = await doc(db,'tasks' , id); // TaskRef
    await updateDoc(TaskDoc,{status:TaskStatus ? "done" : "todo"}); // update task in firesotre 
    dispatch(UpdateTask({id,status:TaskStatus ? "done" : "todo"})); // update task in global state 
  } 
  return (
    <div className="TaskCard">
      <div className="TaskCard_Head">
        <h2 className="TaskCard_Head_Title">{title}</h2>
        <div className="TaskCard_Head_status">
          <span className={`TaskCard_Head_status_${status}`}>{status}</span>
          <span className={`TaskCard_Head_status_${priority}`}>{priority}</span>
        </div>
      </div>
      <p className="TaskCard_Desc">
        {description}
      </p>
      <p className="TaskCard_Date">{createdAt}</p>
      <div className="TaskCard_Actions">
        <SwitchBtn id={Math.random()} ChangeStataus={ChangeStataus} status={status} />
        <div className="flex">
          <Link to={`/edit/${id}`}><img src={Edit} alt="edit_task" width="20px" /></Link>
          <span onClick={DeleteTask}><img src={Delete} alt="delete_task" /></span>
        </div>
      </div>
      <p className="TaskCard_DueDate">Due Date: {dueDate}</p>
    </div>
  );
};

export default TaskCard;