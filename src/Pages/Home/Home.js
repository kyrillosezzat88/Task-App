import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Apis/Firebase-Config";
import { FilterBar } from "../../Components/FilterBar/FilterBar";
import Navbar from "../../Components/Navbar/Navbar";
import TaskCard from "../../Components/TaskCard/TaskCard";
import { loadData } from "../../Context/Actions/Auth-Actions";
import { GetAllUserTasks } from "../../Context/Actions/Task-Actions";
import { useTask } from "../../Context/TaskContext";
import Spinner from '../../Assets/Images/spinner.gif'
import "./Home.scss";
function Home() {
  const TasksCollection = collection(db, "tasks");
  const { TaskApp, dispatch } = useTask();
  useEffect(() => {
    if(!TaskApp.Tasks.length){
      dispatch(loadData(true));
      (async () => {
        if(TaskApp.user.uid){
          let q = query(TasksCollection,where('userID','==',TaskApp.user.uid));
          let userTasks = await getDocs(q).then(res => res.docs.map(doc => ({...doc.data() , id:doc.id})))
          dispatch(GetAllUserTasks(userTasks));
          dispatch(loadData(false));
        }
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TaskApp.user.uid]);
  return (
    <>
      <Navbar logedin={true} justLogo={false} />
      {TaskApp.isLoading ? (
        <div className="loading">
          <img src={Spinner} alt="Loading..." />
        </div>
      ) : (
        <section className="Home">
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {TaskApp.Tasks && TaskApp.Tasks.length > 0 && (
            TaskApp.Tasks.map(
              ({
                title,
                description,
                status,
                dueDate,
                createdAt,
                priority,
                id
              }) => (
                <TaskCard
                  key={id}
                  title={title}
                  description={description}
                  status={status}
                  dueDate={ dueDate.seconds ? new Date(dueDate.seconds * 1000).toDateString() : new Date(dueDate).toDateString()  }
                  createdAt={new Date(createdAt.seconds * 1000).toDateString()}
                  priority={priority}
                  id={id}
                />
              )
            )
          )}
        </div>
        {!TaskApp.Tasks.length&&<h2 className="text-secondary font-bold text-center mt-10 text-3xl ">No Tasks Created!! </h2>}
      </section>
      )}

    </>
  );
}

export default Home;
